import { CityModel } from "@app/models";
import { ICityRepository } from "@app/repositories";

class CityService implements ICityRepository {
  async getCitiesBytProvinceId(provinceId: string): Promise<CityModel[]> {
    const query = await CityModel.query()
      .where("provinceId", provinceId)
      .orderBy("name");
    return query;
  }
}
export default CityService;
