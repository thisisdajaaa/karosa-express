import { Request, Response } from "express";
import { ICategoryRepository } from "../repositories/ICategoryRepository";

export class CategoryController {
  private categoryService: ICategoryRepository;
  constructor(categoryService: ICategoryRepository) {
    this.categoryService = categoryService;
  }

  retrieve = async (req: Request, res: Response) => {
    const categories = await this.categoryService.get();
    res.send(categories);
  };
}
