import { APIError } from "@app/utils";
import httpStatus from "http-status";
import { VariationModel } from "@app/models";
import { NextFunction, Request, Response } from "express";
import { VariationDTO } from "@app/dto";
import { IVariationRepository } from "@app/repositories";

export class VariationController {
  private variationService: IVariationRepository;
  constructor(variationService: IVariationRepository) {
    this.variationService = variationService;
  }

  add = async (req: Request, res: Response) => {
    const { name, price, stock, photo, weight, shelf_life } = req.body;
    const params: VariationModel = new VariationModel();
    params.name = name;
    params.price = price;
    params.stock = stock;
    params.photo = photo;
    params.weight = weight;
    params.shelf_life = shelf_life;

    return res.send(await this.variationService.create(params));
  };

  getAll = async (req: Request, res: Response) => {
    return res.send(await this.variationService.get());
  };

  getVariation = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<VariationDTO> | void> => {
    const _id = req.params.id;
    const variation = await this.variationService.getById(_id);

    if (!variation) {
      return next(
        new APIError({
          message: "Variation not found!",
          status: httpStatus.NOT_FOUND,
          stack: undefined,
        })
      );
    }

    return res.send(await this.variationService.getById(_id));
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    const _id = req.params.id;
    const variation = await this.variationService.getById(_id);

    if (!variation) {
      return next(
        new APIError({
          message: "Variation not found!",
          status: httpStatus.NOT_FOUND,
          stack: undefined,
        })
      );
    }

    return res.send(await this.variationService.delete(_id));
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    const _id = req.params.id;
    const variation = await this.variationService.getById(_id);

    if (!variation) {
      return next(
        new APIError({
          message: "Variation not found!",
          status: httpStatus.NOT_FOUND,
          stack: undefined,
        })
      );
    }

    return res.send(await this.variationService.update(_id, req.body));
  };
}
