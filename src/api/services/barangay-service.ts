import { BarangayModel } from "@app/models";
import { IBarangayRepository } from "@app/repositories";

class BarangayService implements IBarangayRepository {
  async getBarangaysByCityId(cityId: string): Promise<BarangayModel[]> {
    const query = await BarangayModel.query()
      .where("cityId", cityId)
      .orderBy("name");
    return query;
  }
}
export default BarangayService;
