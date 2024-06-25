import passport from "passport";
import passportJwt from "passport-jwt";
import { env } from "@app/config/environment";
import { container } from "@app/config/container";
import { UserModel } from "@app/models";
import { Request } from "express";

const cookieExtractor = (req: Request) => {
  let token = null;
  if (req && req.signedCookies && req.signedCookies.jwt)
    token = req.signedCookies["jwt"];
  return token;
};
const JwtStrategy = passportJwt.Strategy;
passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: cookieExtractor,
      secretOrKey: env.jwtSecret,
    },
    async (payload, done) => {
      const user = await container.cradle.userService.getById(payload.sub);
      console.log(payload);

      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    }
  )
);

// We extend the global Express User interface with our User model
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface User extends UserModel {}
  }
}
