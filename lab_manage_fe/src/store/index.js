import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);


const store = new Vuex.Store({
    state: {
      count: 0,
      capacity:[],
    },
    mutations: {
      increment (state) {
        state.count++
      },
      capacityInit(state,data){
        // state.capacity.push(data)
        state.capacity = data
        // console.log(state.capacity)
      }
    },
    getters:{
        getCount:state=>{
            // console.log( state.count)
            return state.count
        },
        getCapacity:state=>{
            return state.capacity
        }
    }
  })

export default store;