<template>
  <v-row>
    <v-col>
      <v-card class="result-table">
        <v-data-iterator :items="stockList">
          <template #header>
            <v-toolbar dark class="mb-1">
              <v-text-field
                v-model="search"
                clearable
                flat
                solo-inverted
                hide-details
                prepend-inner-icon="mdi-magnify"
                label="Search"
              />
            </v-toolbar>
          </template>
        </v-data-iterator>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import { API } from '../utils/api'
import { useArtsStore } from '../store/arts'

export default defineComponent({
  name: 'ListPage',
  setup(_props) {
    const artsStore = useArtsStore()
    const bbtapi = new API()
    return { artsStore, bbtapi }
  },
  data() {
    return {
      stockList: [],
      search: '',
    }
  },
  mounted() {
    this.bbtapi.getStockList().then((val) => {
      this.stockList = val
    })
  },
  methods: {
    doCopy() {
      // クリップボードの保存
      const nameList = this.stockArtsList.map((val) => {
        return val.name
      })
      navigator.clipboard
        .writeText(nameList.join('\n'))
        .then(() => {
          console.log('copied!')
        })
        .catch((e) => {
          console.error(e)
        })
    },
  },
})
</script>

<style lang="scss">
.bloodlist .v-label {
  font-size: 12px;
}

.panel-content .v-expansion-panel-content__wrap {
  padding: 0;
}

.v-expansion-panel--active:not(:first-child),
.v-expansion-panel--active + .v-expansion-panel {
  margin-top: 0px;
}

.search-button {
  margin-top: 16px;
}

.search-select {
  padding-right: 24px;
  padding-left: 24px;
}

.search-text {
  padding: 16px;
}

.result-table {
  margin-top: 16px;
  margin-bottom: 16px;
  td {
    font-size: 11px !important;
  }
}
</style>
