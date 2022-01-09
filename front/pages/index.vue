<template>
  <v-row>
    <v-col>
      <!-- controller -->
      <v-container class="grey lighten-5" style="width: 80%">
        <v-expansion-panels v-model="panel" multiple>
          <v-expansion-panel>
            <v-expansion-panel-header> ブラッド選択 </v-expansion-panel-header>
            <v-expansion-panel-content class="panel-content">
              <v-row no-gutters>
                <template v-for="(blood, idx) in bloodList">
                  <v-col :key="blood">
                    <v-card class="pl-2" outlined tile>
                      <v-checkbox
                        v-show="blood !== ''"
                        v-model="searchQuery.blood"
                        class="bloodlist"
                        :label="blood"
                        :value="blood"
                        :ripple="true"
                      />
                    </v-card>
                  </v-col>
                  <v-responsive
                    v-if="(idx + 1) % 4 === 0"
                    :key="`width-${idx}`"
                    width="100%"
                  ></v-responsive>
                </template>
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>
          <v-expansion-panel>
            <v-expansion-panel-header> 絞り込み </v-expansion-panel-header>
            <v-expansion-panel-content class="panel-content">
              <v-row no-gutters>
                <v-select
                  v-model="searchQuery.type"
                  :items="typeList"
                  attach
                  chips
                  label="種別"
                  class="search-select"
                  hide-details
                  multiple
                >
                  <template #append-item>
                    <v-list-item @click="clearType()">
                      <v-list-item-content>
                        <v-list-item-title>
                          選択を全てクリアする
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </template>
                </v-select>
              </v-row>
              <v-row no-gutters>
                <v-select
                  v-model="searchQuery.timing"
                  :items="timingList"
                  attach
                  chips
                  label="タイミング"
                  class="search-select"
                  hide-details
                  multiple
                >
                  <template #append-item>
                    <v-list-item @click="clearType()">
                      <v-list-item-content>
                        <v-list-item-title>
                          選択を全てクリアする
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </template>
                </v-select>
              </v-row>
              <v-row no-gutters>
                <v-select
                  v-model="searchQuery.judge"
                  :items="judgeList"
                  attach
                  chips
                  label="判定"
                  class="search-select"
                  hide-details
                  multiple
                >
                  <template #append-item>
                    <v-list-item @click="clearJudge()">
                      <v-list-item-content>
                        <v-list-item-title>
                          選択を全てクリアする
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </template>
                </v-select>
              </v-row>
              <v-row no-gutters>
                <v-select
                  v-model="searchQuery.target"
                  :items="targetList"
                  attach
                  chips
                  label="対象"
                  class="search-select"
                  hide-details
                  multiple
                >
                  <template #append-item>
                    <v-list-item @click="clearTarget()">
                      <v-list-item-content>
                        <v-list-item-title>
                          選択を全てクリアする
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </template>
                </v-select>
              </v-row>
              <v-row no-gutters>
                <v-select
                  v-model="searchQuery.range"
                  :items="rangeList"
                  attach
                  chips
                  label="射程"
                  class="search-select"
                  hide-details
                  multiple
                >
                  <template #append-item>
                    <v-list-item @click="clearRange()">
                      <v-list-item-content>
                        <v-list-item-title>
                          選択を全てクリアする
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </template>
                </v-select>
              </v-row>
              <v-row no-gutters>
                <v-select
                  v-model="searchQuery.cost"
                  :items="costList"
                  attach
                  chips
                  label="コスト"
                  class="search-select"
                  hide-details
                  multiple
                >
                  <template #append-item>
                    <v-list-item @click="clearCost()">
                      <v-list-item-content>
                        <v-list-item-title>
                          選択を全てクリアする
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </template>
                </v-select>
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
        <v-row no-gutters>
          <v-col>
            <v-card class="search-text">
              <v-text-field
                v-model="searchQuery.text"
                label="効果"
                placeholder="効果文中の文字列を検索"
                hide-details
                outlined
              ></v-text-field></v-card
          ></v-col>
        </v-row>
        <v-btn block class="search-button" @click="doSearch">検索する</v-btn>
      </v-container>
      <v-card class="result-table">
        <v-card-title>
          検索結果
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="更に絞り込む"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table
          class="search-result"
          :headers="headers"
          :items="arts"
          :search="search"
        >
          <template #[`item.actions`]="{ item }">
            <v-icon small @click="doCart(item)"> mdi-cart </v-icon>
          </template>
        </v-data-table>
      </v-card>
    </v-col>
    <v-snackbar v-model="snack.visible" :timeout="snack.timeout">
      {{ snack.text }}

      <template #action="{ attrs }">
        <v-btn color="blue" text v-bind="attrs" @click="snack.visible = false">
          閉じる
        </v-btn>
      </template>
    </v-snackbar>
  </v-row>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import { API } from '../utils/api'
import { useArtsStore } from '../store/arts'

export default defineComponent({
  name: 'MainPage',
  setup(_props) {
    const artsStore = useArtsStore()
    return { artsStore }
  },
  data() {
    return {
      panel: [],
      arts: [],
      search: '',
      cart: [],
      snack: {
        visible: false,
        timeout: 1500,
        text: '',
      },
      headers: [
        {
          text: 'アーツ名',
          align: 'start',
          value: 'name',
        },
        { text: 'ルーツ', value: 'roots' },
        { text: '種別', value: 'arts_type' },
        { text: '最大レベル', value: 'maxLv' },
        { text: 'タイミング', value: 'timing' },
        { text: '判定', value: 'judge' },
        { text: '対象', value: 'target' },
        { text: '射程', value: 'arts_range' },
        { text: 'コスト', value: 'cost' },
        { text: '効果', value: 'description', width: '25%' },
        { text: '', value: 'actions', sortable: false },
      ],
      searchQuery: {
        blood: [],
        type: [],
        timing: [],
        target: [],
        judge: [],
        range: [],
        cost: [],
        text: '',
      },
      bloodList: [
        'アタッカー',
        'ディフェンダー',
        'サポーター',
        '共通',
        'イレギュラー',
        'ヴァンパイア',
        'エトランゼ',
        'スピリット',
        'セレスチャル',
        'デーモン',
        'ネイバー',
        'ハーミット',
        'フルメタル',
        'レジェンド',
        'ヴォイド',
        'ストレンジャー',
        'コズミックホラー',
        'ダークカルテル',
        'ジャイガント',
        '',
      ],
      // 種別
      typeList: [
        '自動',
        '選択',
        '魔獣',
        '攻撃',
        '防御',
        '支援',
        '回復',
        'コピー',
        '純血',
        'ア',
        '0',
        '20',
        '40',
        '代償',
        '血脈',
        '怪獣',
        'なし',
        '効果参照',
      ],
      // タイミング
      timingList: [
        'セットアップ',
        'イニシアチブ',
        'ムーブ',
        'マイナー',
        'メジャー',
        'クリンナップ',
        '常時',
        '判定直前',
        '判定直後',
        'リアクション',
        'DR直前',
        'DR直後',
        '解放状態',
        '効果参照',
      ],
      // 判定
      judgeList: [
        '自動成功',
        '白兵',
        '射撃',
        '行動',
        '回避',
        '肉体',
        '技術',
        '感情',
        '加護',
        '社会',
        '効果参照',
      ],
      // 射程
      rangeList: ['至近', '遠隔', 'シーン', '武器', '効果参照', 'なし'],
      // 対象
      targetList: ['単体', '範囲', 'シーン', '自身', 'Lv体', '効果参照'],
      // コスト
      costList: ['愛', '罪', '効果参照'],
    }
  },
  mounted() {
    this.cart = this.artsStore.stockArts
    this.arts = this.artsStore.searchedArts
  },
  methods: {
    doSearch() {
      const bbtapi = new API()
      bbtapi.searchArts(this.searchQuery).then((val) => {
        this.arts = val
        this.artsStore.setSearchedArts(val)
      })
    },
    doCart(item) {
      // console.log(item)
      this.snack.visible = false
      if (!this.cart.includes(item.id)) {
        this.cart.push(item.id)
      }
      this.artsStore.setStockArts(this.cart)
      this.$nextTick(() => {
        this.snack.visible = true
        this.snack.text = `${item.name}を追加しました`
      })
    },
    clearType() {
      this.$nextTick(() => {
        this.searchQuery.type = []
      })
    },
    clearTiming() {
      this.$nextTick(() => {
        this.searchQuery.timing = []
      })
    },
    clearJudge() {
      this.$nextTick(() => {
        this.searchQuery.judge = []
      })
    },
    clearRange() {
      this.$nextTick(() => {
        this.searchQuery.range = []
      })
    },
    clearTarget() {
      this.$nextTick(() => {
        this.searchQuery.target = []
      })
    },
    clearCost() {
      this.$nextTick(() => {
        this.searchQuery.cost = []
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
  margin-top: 8px;
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
  .search-result {
    .text-start {
      font-size: 11px;
    }
  }
}
</style>
