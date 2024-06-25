import { ProvinceModel } from "@app/models";
import { IProvinceRepository } from "@app/repositories";

class ProvinceService implements IProvinceRepository {
  async getProvincesByRegionId(regionId: string): Promise<ProvinceModel[]> {
    const query = await ProvinceModel.query()
      .where("regionId", regionId)
      .orderBy("name");
    return query;
  }
}
export default ProvinceService;
