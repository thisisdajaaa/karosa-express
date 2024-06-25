export interface IMaintenanceRepository {
  checkDB(): Promise<boolean>;
}
