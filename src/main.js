import Vue from 'vue'
import App from './App.vue'
import Calc from './components/Calc.vue'
import TTT from './components/TTT.vue'
import MG from './components/MG.vue'
import VueMaterial from 'vue-material'
import { MdButton, MdContent, MdTabs,MdCard } from 'vue-material/dist/components'
Vue.use(VueMaterial);
Vue.component('calc', Calc);
Vue.component('ttt', TTT);
Vue.component('mg', MG);
new Vue({
  components: { App },
  template: '<App/>',
  el: '#app',
  render: h => h(App),
})


 