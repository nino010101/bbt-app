<template>
  <v-app>
    <v-app-bar app dense>
      <!--
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      -->

      <v-toolbar-title>BBT Arts Search</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon to="/cart" nuxt>
        <v-icon>mdi-cart</v-icon>
      </v-btn>

      <v-btn icon to="/" nuxt>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <!--
      <v-menu left bottom>
        <template #activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item v-for="n in 5" :key="n" @click="() => {}">
            <v-list-item-title>Option {{ n }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      -->
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {
      title: 'Vuetify.js',
    }
  },
}
</script>
