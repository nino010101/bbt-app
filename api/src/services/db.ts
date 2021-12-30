import { PrismaClient, Arts } from '@prisma/client';

// db access
class DBClient {
  private client: PrismaClient;
  constructor() {
    this.client = new PrismaClient();
    console.log('db connect.');
  }
  // arts取得テスト
  async getArts(searchList: string[]): Promise<Arts[]> {
    const filter = searchList.map((val) => {
      return { roots: val };
    });
    const result = await this.client.arts.findMany({ where: { OR: filter } });
    return result;
  }
}

export default DBClient;
