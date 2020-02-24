// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axiosController from './axiosController.js'

import store from './store/index.js'
import Vuex from 'vuex'
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)
Vue.use(Vuex);

Vue.use(axiosController);

Vue.config.productionTip = false


Vue.directive('has', {
  inserted: function (el, binding) {
    if (!permissionJudge(binding.value)) {
      el.parentNode.removeChild(el);
    }

    function permissionJudge(value) {
      let capacityList = store.getters.getCapacity
      for(let item of capacityList){
        if(item === value){
          return true;
        }
      }
      return false;

    }
  }
});



Vue.use(ElementUI);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

