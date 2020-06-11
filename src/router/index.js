import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: () =>
      import(/* webpackChunkName: "restapi" */ "../views/About.vue"),
  },
  {
    path: "/restapi",
    name: "RestApi",
    component: () =>
      import(/* webpackChunkName: "restapi" */ "../views/RestApi.vue"),
  },
  {
    path: "/privacy-policy",
    name: "Privacy",
    component: () =>
      import(/* webpackChunkName: "restapi" */ "../views/Privacy.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
