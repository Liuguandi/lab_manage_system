import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login'
import Main from '@/components/main'
import Users from '@/components/MainFunction/Users'
import Devices from '@/components/MainFunction/Devices'
import DeviceType from '@/components/MainFunction/DeviceType'
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)
Vue.use(Router)

var router = new Router({
  routes: [
    { path: '/', name: 'Login', component: Login},
    {
      //login
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      //首页
      path: '/main',
      name: 'Main',
      component: Main,
      children: [
        { path: '/users', name: 'users', component: Users },
        { path: '/devices', name: 'devices', component: Devices },
        { path: '/deviceType', name: 'deviceType', component: DeviceType },
      ]
    }
  ]
})

router.beforeEach((to,from,next)=>{
  if(to.name == 'Login'){
      next();
  }else{
      // var token = $cookies.get("lab_key")
      var token = window.localStorage.getItem('lab_key') 
      if(!token){
          next({name:'Login'});
      }else{
        next();
      }
  }
})

export default router;