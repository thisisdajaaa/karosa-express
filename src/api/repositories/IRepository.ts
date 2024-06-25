import { ICreate, IDelete, IRead, IUpdate } from "./ICrud";

export interface IRepository<T>
  extends ICreate<T>,
    IRead<T>,
    IDelete,
    IUpdate<T> {}
