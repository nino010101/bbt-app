import { defineStore } from 'pinia'
import { Arts } from '../utils/api'

export const useArtsStore = defineStore('arts', {
  state: () => ({
    stockArts: [] as Arts[],
    searchedArts: [] as Arts[],
  }),
  actions: {
    setStockArts(stock: Arts[]) {
      this.stockArts = stock
    },
    setSearchedArts(list: Arts[]) {
      this.searchedArts = list
    },
  },
})
