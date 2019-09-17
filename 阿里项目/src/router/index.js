import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'entry',
      component: () => import(/* webpackChunkName: "entry" */ 'views/Loading.vue'),
      children: [
        {
          path: '/start',
          name: 'start',
          component: () => import(/* webpackChunkName: "start" */ 'views/Start.vue'),
        },
        {
          path: '/list',
          name: 'list',
          component: () => import(/* webpackChunkName: "list" */ 'views/List.vue'),
          meta: {
            keepAlive: true
          }
        },
        {
          path: '/listpp',
          name: 'listpp',
          component: () => import(/* webpackChunkName: "listpp" */ 'views/List2pp.vue'),
          meta: {
            keepAlive: true
          }
        },
        {
          path: '/info',
          name: 'info',
          component: () => import(/* webpackChunkName: "infor" */ 'views/Info.vue'),
          meta: {
            keepAlive: true
          }
        },
        {
          path: '/infopp',
          name: 'info2pp',
          component: () => import(/* webpackChunkName: "infopp" */ 'views/Info2pp.vue'),
          meta: {
            keepAlive: true
          }
        },
        {
          path: '/appointment',
          name: 'appointment',
          component: () => import(/* webpackChunkName: "appointment" */ 'views/Appointment.vue'),
        },
        {
          path: '/appointmentpp',
          name: 'appointment2pp',
          component: () => import(/* webpackChunkName: "appointmentpp" */ 'views/Appointment2pp.vue'),
        }
      ]
    },
  ],
});
