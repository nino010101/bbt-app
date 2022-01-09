import { PrismaClient, Arts, Prisma, Stock } from '@prisma/client';
import dayjs from 'dayjs';

interface FilterReq {
  blood: string[];
  type: string[];
  timing: string[];
  judge: string[];
  range: string[];
  cost: string[];
  text: string;
}

interface postParam {
  name: string | null;
  author: string | null;
  style: string | null;
  rootsP: string | null;
  rootsS: string | null;
  rootsT: string | null;
  list: string | null;
  memo: string | null;
  code: string | null;
  created_at: string | null;
}

// db access
class DBClient {
  private client: PrismaClient;
  constructor() {
    this.client = new PrismaClient();
    console.log('db connect.');
  }
  // arts取得テスト
  async getArts(filterReq: FilterReq): Promise<Arts[]> {
    const filter: Prisma.ArtsFindManyArgs = { where: { AND: [] } };

    // 検索条件
    const and: Prisma.Enumerable<Prisma.ArtsWhereInput> = [];
    if (filterReq.blood.length > 0)
      and.push({ blood: { in: filterReq.blood } });
    // 種別の検索クエリ
    if (filterReq.type.length > 0) {
      const typeOR: Prisma.Enumerable<Prisma.ArtsWhereInput> = [];
      filterReq.type.forEach((val) => {
        typeOR.push({ arts_type: { contains: val } });
      });
      and.push({ OR: typeOR });
    }

    if (filterReq.timing.length > 0)
      and.push({ timing: { in: filterReq.timing } });

    // 判定の検索クエリ
    if (filterReq.judge.length > 0) {
      const judgeOR: Prisma.Enumerable<Prisma.ArtsWhereInput> = [];
      filterReq.judge.forEach((val) => {
        judgeOR.push({ judge: { contains: val } });
      });
      and.push({ OR: judgeOR });
    }

    if (filterReq.range.length > 0)
      and.push({ arts_range: { in: filterReq.range } });
    if (filterReq.cost.length > 0) and.push({ cost: { in: filterReq.cost } });

    const andText: Prisma.Enumerable<Prisma.ArtsWhereInput> = [];
    if (filterReq.text !== '') {
      const splited = filterReq.text.split(' ');
      splited.forEach((val) => {
        // or.push({ name: { contains: val } });
        andText.push({ description: { contains: val } });
      });
    }
    and.push({ AND: andText });
    const result = await this.client.arts.findMany({
      where: {
        AND: and,
      },
    });
    return result;
  }

  async getArtsById(idList: string[]): Promise<Arts[]> {
    const filter = idList.map((val) => {
      return parseInt(val);
    });
    const result = await this.client.arts.findMany({
      where: { id: { in: filter } },
    });

    return result;
  }

  async getArtsTest(): Promise<Arts[]> {
    const filter = {};

    const result = await this.client.arts.findMany({
      where: {
        AND: [
          {
            blood: { in: ['イレギュラー', 'セレスチャル'] },
          },
          {
            OR: [
              { description: { contains: '感情' } },
              { name: { contains: 'DR' } },
            ],
          },
        ],
      },
    });
    return result;
  }

  private randGen(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  async setStockList(param: postParam): Promise<Stock> {
    const stockData: Prisma.StockCreateInput = { ...param };
    const now = dayjs().format('YYYY-MM-DD-HH-mm-ss');
    stockData.created_at = now;
    stockData.code = `${param.code ? param.code : ''}#${this.randGen(0, 9999)}`;
    const result = await this.client.stock.create({ data: stockData });
    return result;
  }

  async getStockList(): Promise<Stock[]> {
    const result = await this.client.stock.findMany();
    return result;
  }

  async getStockByCode(code: string): Promise<Stock | null> {
    const result = await this.client.stock.findFirst({ where: { code: code } });
    return result;
  }
}

export default DBClient;
