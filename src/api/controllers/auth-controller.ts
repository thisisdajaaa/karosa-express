import httpStatus from "http-status";
import { Request, Response, NextFunction } from "express";
import { UserModel } from "@app/models";
import { APIError, bcryptUtil } from "@app/utils";
import { IUserRepository } from "@app/repositories";
import jsonwebtoken from "jsonwebtoken";
import { env } from "@app/config/environment";
import { convertUserEntity, UserDTO } from "@app/dto";

export class AuthController {
  private userService: IUserRepository;

  constructor(userService: IUserRepository) {
    this.userService = userService;
  }

  private issueJwt(user: UserModel): string {
    const sub = user.id;
    const payload = {
      sub: sub,
      iat: Date.now(),
    };

    const token = jsonwebtoken.sign(payload, env.jwtSecret, {
      expiresIn: "1d",
    });

    return token;
  }

  private validateEmail = (email: string): boolean => {
    const emailRegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegExp.test(email);
  };

  private validatePhone = (phone: string): boolean => {
    const re = /^(09|\+639)\d{9}$/;
    return re.test(phone);
  };

  private makeUsername = (length: number) => {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result.toLowerCase();
  };

  private normalizePhoneNumber = (phoneNumber: string) => {
    if (phoneNumber.substring(0, 2) === "09") {
      return phoneNumber.replace("09", "+639");
    }

    return phoneNumber;
  };

  private setCookie = (user: UserModel, res: Response) => {
    const jwt = this.issueJwt(user);
    return res.cookie("jwt", jwt, {
      signed: true,
      httpOnly: false,
      secure: false,
      sameSite: "strict",
    });
  };

  changePassword = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(
        new APIError({
          message: "User is unauthorized",
          status: httpStatus.UNAUTHORIZED,
        })
      );
    }
    try {
      const { oldPassword, password } = req.body;

      // check if the user password matches the old
      const isValidPassword = await bcryptUtil.verify(
        oldPassword,
        req.user.hash,
        req.user.salt
      );

      if (isValidPassword) {
        // update the password
        const form = new UserModel();
        form.salt = await bcryptUtil.generateSalt();
        form.hash = await bcryptUtil.generateHash(password, form.salt);

        await this.userService.update(req.user.id, form);
        return res.send("true");
      } else {
        return next(
          new APIError({
            message: "Old password is incorrect",
            status: httpStatus.CONFLICT,
            stack: undefined,
          })
        );
      }
    } catch (error) {
      return next(
        new APIError({
          message: "Error in updating user",
          status: httpStatus.CONFLICT,
          stack: error ? error.stack : undefined,
        })
      );
    }
  };

  login = async (req: Request, res: Response, next: NextFunction) => {
    let { identifier } = req.body;
    const { password } = req.body;

    if (this.validatePhone(identifier)) {
      identifier = this.normalizePhoneNumber(identifier);
    }

    const user = await this.userService.getUserByIdentifier(identifier);

    if (user) {
      const isValidPassword = await bcryptUtil.verify(
        password,
        user.hash,
        user.salt
      );

      if (isValidPassword) {
        res = this.setCookie(user, res);

        const dto: UserDTO = convertUserEntity(user);

        return res.send(dto);
      }
    }

    return next(
      new APIError({
        message: "Invalid username/email or password",
        status: httpStatus.CONFLICT,
        stack: undefined,
      })
    );
  };

  register = async (req: Request, res: Response, next: NextFunction) => {
    // check if valid phone number
    let { identifier } = req.body;
    const { password } = req.body;
    let isEmail = false;
    // check if the user already exists

    if (this.validateEmail(identifier)) {
      isEmail = true;
    } else if (this.validatePhone(identifier)) {
      isEmail = false;
      identifier = this.normalizePhoneNumber(identifier);
    } else {
      return next(
        new APIError({
          message: "Invalid email/phone number",
          status: httpStatus.CONFLICT,
          stack: undefined,
        })
      );
    }

    const user = await this.userService.getUserByIdentifier(identifier);

    if (user) {
      return next(
        new APIError({
          message: "User already exists",
          status: httpStatus.CONFLICT,
          stack: undefined,
        })
      );
    }

    const params: UserModel = new UserModel();

    if (isEmail) {
      params.email = identifier;
    } else {
      params.phoneNo = this.normalizePhoneNumber(identifier);
    }
    const username = this.makeUsername(6);

    // eslint-disable-next-line no-constant-condition
    while (true) {
      const u = await this.userService.isUserNameExists(username);

      if (!u) {
        params.username = username;
        break;
      }
    }

    params.salt = await bcryptUtil.generateSalt();
    params.hash = await bcryptUtil.generateHash(password, params.salt);

    try {
      const result = await this.userService.create(params);
      if (result) {
        const dto: UserDTO = convertUserEntity(result);

        res = this.setCookie(result, res);

        return res.send(dto);
      }

      return next(
        new APIError({
          message: "Error in registering user",
          status: httpStatus.CONFLICT,
          stack: undefined,
        })
      );
    } catch (error) {
      return next(
        new APIError({
          message: "Error in registering user",
          status: httpStatus.CONFLICT,
          stack: error ? error.stack : undefined,
        })
      );
    }
  };
}
