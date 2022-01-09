import axios from 'axios'

export type Arts = {
  id: number
  fav: number
  house_flag: number
  disable_flag: number
  auto: number
  book: string | null
  blood: string | null
  roots: string | null
  name: string | null
  arts_type: string | null
  maxLv: string | null
  timing: string | null
  judge: string | null
  target: string | null
  arts_range: string | null
  cost: string | null
  description: string | null
  memo: string | null
  img: string | null
  update_at: string | null
}

export type SearchQuery = {
  blood: string[]
  type: string[]
  timing: string[]
  judge: string[]
  range: string[]
  cost: string[]
  text: string
}

export type PostStock = {
  name: string | null
  author: string | null
  style: string | null
  rootsP: string | null
  rootsS: string | null
  rootsT: string | null
  list: string | null
  memo: string | null
  created_at: string | null
}

export type Stock = {
  id: number
  name: string | null
  author: string | null
  style: string | null
  rootsP: string | null
  rootsS: string | null
  rootsT: string | null
  list: string | null
  memo: string | null
  created_at: string | null
}

export class API {
  private url: string = 'http://localhost:5000'

  public async getArtsList(): Promise<Arts[]> {
    const reqUrl = `${this.url}/data`
    const res = await axios.get(reqUrl)
    const arts: Arts[] = res.data

    return arts
  }

  public async searchArts(searchQuery: SearchQuery): Promise<Arts[]> {
    const reqUrl = `${this.url}/search`
    const res = await axios.post(reqUrl, { data: searchQuery })
    const arts: Arts[] = res.data

    return arts
  }

  public async getArtsById(idList: string[]): Promise<Arts[]> {
    const reqUrl = `${this.url}/searchById`

    const res = await axios.post(reqUrl, { data: idList })
    const arts: Arts[] = res.data

    return arts
  }

  public async postStockList(postStock: PostStock): Promise<void> {
    const reqUrl = `${this.url}/stock`
    const res = await axios.post(reqUrl, { data: postStock })
    console.log(res)
  }

  public async getStockList(): Promise<Stock[]> {
    const reqUrl = `${this.url}/stock`
    const res = await axios.get(reqUrl)
    const stock: Stock[] = res.data
    return stock
  }

  public async getStockByCode(code: string): Promise<Stock> {
    const reqUrl = `${this.url}/stockByCode?code=${encodeURIComponent(code)}`
    console.log(reqUrl)
    const res = await axios.get(reqUrl)
    const stock: Stock = res.data
    console.log(res)
    return stock
  }
}
