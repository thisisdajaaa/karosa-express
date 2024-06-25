export interface ICreate<T> {
  create(t: T): Promise<T>;
}

export interface IRead<T> {
  get(): Promise<T[]>;
  getById(id: string): Promise<T>;
}
export interface IUpdate<T> {
  update(id: string, t: T): Promise<T>;
}

export interface IDelete {
  delete(id: string): Promise<boolean>;
}

export interface IExists {
  exists(id: string): Promise<boolean>;
}
