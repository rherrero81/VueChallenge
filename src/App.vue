<template>
  <div id="app">
    <div class="page-container">
      <md-app md-mode="reveal">
        <md-app-toolbar class="md-primary">
          <md-button
            class="md-icon-button"
            v-on:click="menuVisible = !menuVisible"
          >
            <md-icon>menu</md-icon>
          </md-button>
          <span class="md-title">{{
            compIndex == 0
              ? "Calculator"
              : compIndex == 1
              ? "Tic-tac-toe"
              : "Memory Game"
          }}</span>
        </md-app-toolbar>

        <md-app-drawer :md-active.sync="menuVisible">
          <md-toolbar class="md-transparent" md-elevation="0">
            Challenges</md-toolbar
          >
          <md-list>
            <md-list-item v-on:click="compIndex = 0">
              <md-icon>calculate</md-icon>
              <span class="md-list-item-text">Calculator</span>
            </md-list-item>

            <md-list-item v-on:click="compIndex = 1">
              <md-icon>query_builder</md-icon>
              <span class="md-list-item-text">Tic-tac-toe</span>
            </md-list-item>

            <md-list-item v-on:click="compIndex = 2">
              <md-icon>psychology</md-icon>
              <span class="md-list-item-text">Memory Game</span>
            </md-list-item>
            <md-list-item>
              <md-icon>cake</md-icon>

              <span class="md-list-item-text">Maria Lunarillos</span>
            </md-list-item>
          </md-list>
        </md-app-drawer>

        <md-app-content>
          <calc v-if="compIndex == 0" />
          <ttt v-if="compIndex == 1" />
          <mg v-if="compIndex == 2" />
        </md-app-content>
      </md-app>
    </div>
  </div>
</template>

<script>
import Calc from "@/components/Calc.vue";
import {
  MdButton,
  MdContent,
  MdTabs,
  mdCard,
  MdToolbar,
  MdListItem,
} from "vue-material/dist/components";
export default {
  publicPath: process.env.BASE_URL,
  template: "<app/>",
  name: "app",
  data() {},
  components: {
    Calc,
  },
  methods: {
    openUrl(url) {
      window.open("/html/marialunarillos/marialunarillos.html", "_blank");
    },
  },
};
</script>

<style scoped>
@import "../node_modules/vue-material/dist/vue-material.min.css";
@import "../node_modules/vue-material/dist/theme/default.css";
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  color: #2c3e50;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: stretch;
  height: 85vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.md-app {
  height: 100vh;
  width: 100vw;
  border: 1px solid rgba(#000, 0.12);
}

// Demo purposes only
.md-drawer {
  height: 100vh;

  max-width: calc(100vw - 125px);
}
</style>

<script>
export default {
  name: "Normal",
  data: () => ({
    menuVisible: false,
    compIndex: 0,
  }),
  methods: {
    clickmenu(l) {
      console.log(l);
    },
  },
};
</script>
