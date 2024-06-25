import { RegionModel } from "@app/models";
import { IRegionRepository } from "@app/repositories";

class RegionService implements IRegionRepository {
  async get(): Promise<RegionModel[]> {
    const query = await RegionModel.query();
    return query;
  }
  async getById(id: string): Promise<RegionModel> {
    const query = await RegionModel.query()
      .findById(id)
      .withGraphFetched("provinces");
    return query;
  }
}

export default RegionService;
