<template>
  <v-row>
    <v-col>
      <v-card class="result-table">
        <v-data-table
          :headers="headers"
          :items="stockArtsList"
          :items-per-page="stockArtsList.length"
          hide-default-footer
        >
          <template #body="{ items }">
            <tbody
              is="draggable"
              v-model="stockArtsList"
              class="result-table"
              tag="tbody"
            >
              <tr v-for="(item, i) in items" :key="i">
                <td>{{ item.name }}</td>
                <td>{{ item.roots }}</td>
                <td>{{ item.arts_type }}</td>
                <td>{{ item.maxLv }}</td>
                <td>{{ item.timing }}</td>
                <td>{{ item.judge }}</td>
                <td>{{ item.target }}</td>
                <td>{{ item.arts_range }}</td>
                <td>{{ item.cost }}</td>
                <td>{{ item.description }}</td>
                <td>
                  <v-icon small @click="doRemove(item)"> mdi-bucket </v-icon>
                </td>
              </tr>
            </tbody>
          </template>
        </v-data-table>
      </v-card>
      <!-- controller -->
      <v-container class="grey lighten-5" style="width: 80%">
        <v-row no-gutters>
          <v-col>
            <v-card v-show="stock.name !== ''" class="cart-text pt-4 pl-4">
              構成名: {{ stock.name }}<br />
              作成者: {{ stock.author }}<br />
              スタイル: {{ stock.style }} <br />
              プライマリ: {{ stock.rootsP }} <br />
              プライマリ: {{ stock.rootsS }} <br />
              メモ: {{ stock.memo }}<br />
            </v-card>
            <v-card class="text-center">
              <v-btn class="pl-8 pr-8" @click="doSave"> 構成を保存する </v-btn>
              <v-btn class="pl-8 pr-8" @click="doCopy">
                キャラシ用にリストをコピー
              </v-btn>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-col>
    <v-dialog v-model="dialog.visible" width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5">アーツ構成を保存</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="postParam.name"
                  label="保存名*"
                  hide-details
                  required
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="postParam.author"
                  label="作者*"
                  hide-details
                  required
                />
              </v-col>
              <v-col cols="12">
                <v-select
                  v-model="postParam.style"
                  :items="styles"
                  label="スタイル*"
                  required
                  hide-details
                />
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  v-model="pblood"
                  :items="bloods"
                  label="Pブラッド*"
                  required
                  hide-details
                  @change="setRootsList('p')"
                />
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  v-model="postParam.rootsP"
                  :items="prootsList"
                  label="Pルーツ*"
                  required
                  hide-details
                />
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  v-model="sblood"
                  :items="bloods"
                  label="Sブラッド*"
                  required
                  hide-details
                  @change="setRootsList('s')"
                />
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  v-model="postParam.rootsS"
                  :items="srootsList"
                  label="Sルーツ*"
                  required
                  hide-details
                />
              </v-col>
              <v-col cols="12">
                <v-textarea
                  v-model="postParam.memo"
                  label="メモ*"
                  hide-details
                  required
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="postParam.code"
                  label="コード*"
                  hide-details
                  required
                />
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog.visible = false">
            キャンセル
          </v-btn>
          <v-btn color="green darken-1" text @click="doPostStock()">
            保存実行
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-overlay :value="isLoading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </v-row>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import draggable from 'vuedraggable'
import { API } from '../utils/api'
import { useArtsStore } from '../store/arts'
import { bloodAndRoots, styles, blood } from '../utils/const'

export default defineComponent({
  name: 'CartPage',
  components: {
    draggable,
  },
  setup(_props) {
    const artsStore = useArtsStore()
    const bbtapi = new API()
    return { artsStore, bbtapi }
  },
  data() {
    return {
      stockArtsList: [],
      bloodAndRoots: [...bloodAndRoots],
      styles: [...styles],
      bloods: [...blood],
      pblood: '',
      sblood: '',
      prootsList: [],
      srootsList: [],
      stock: {
        id: '',
        name: '',
        author: '',
        style: '',
        rootsP: '',
        rootsS: '',
        rootsT: '',
        list: '',
        memo: '',
        code: '',
        created_at: '',
      },
      postParam: {
        name: '',
        author: '',
        style: '',
        rootsP: '',
        rootsS: '',
        rootsT: '',
        list: '',
        memo: '',
        code: '',
        created_at: '',
      },
      dialog: {
        visible: false,
      },
      isLoading: false,
      headers: [
        {
          text: 'アーツ名',
          sortable: false,
          value: 'name',
        },
        { text: 'ルーツ', sortable: false, value: 'roots' },
        { text: '種別', sortable: false, value: 'arts_type' },
        { text: '最大レベル', sortable: false, value: 'maxLv' },
        { text: 'タイミング', sortable: false, value: 'timing' },
        { text: '判定', sortable: false, value: 'judge' },
        { text: '対象', sortable: false, value: 'target' },
        { text: '射程', sortable: false, value: 'arts_range' },
        { text: 'コスト', sortable: false, value: 'cost' },
        { text: '効果', sortable: false, value: 'description', width: '25%' },
      ],
    }
  },
  mounted() {
    if (this.$route.query.code) {
      this.bbtapi.getStockByCode(this.$route.query.code).then((val) => {
        this.stock = val
        const artsList = val.list.split(',')
        this.bbtapi.getArtsById(artsList).then((val) => {
          this.stockArtsList = val
        })
      })
    } else {
      this.bbtapi.getArtsById(this.artsStore.stockArts).then((val) => {
        this.stockArtsList = val
      })
    }
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
    doSave() {
      this.dialog.visible = true
    },
    doPostStock() {
      console.log(this.postParam)
      this.isLoading = true
      const ids = this.stockArtsList.map((val) => {
        return val.id
      })
      const idList = ids.join(',')
      this.postParam.list = idList
      this.bbtapi
        .postStockList(this.postParam)
        .then((val) => {
          this.isLoading = false
          this.dialog.visible = false
          console.log(val)
        })
        .catch((err) => {
          console.err(err)
          this.isLoading = false
          this.dialog.visible = false
        })
    },
    doRemove(item) {
      this.stockArtsList.forEach((val, index) => {
        if (val.id === item.id) {
          this.stockArtsList.splice(index, 1)
        }
      })
      const stock = this.stockArtsList.map((val) => {
        return val.id
      })
      this.artsStore.setStockArts(stock)
    },
    setRootsList(type) {
      if (type === 'p') {
        this.bloodAndRoots.forEach((val) => {
          if (val.name === this.pblood) {
            this.prootsList = val.roots
          }
        })
      }
      if (type === 's') {
        this.bloodAndRoots.forEach((val) => {
          if (val.name === this.sblood) {
            this.srootsList = val.roots
          }
        })
      }
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
