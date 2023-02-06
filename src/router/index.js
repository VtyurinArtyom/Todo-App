import Vue from "vue";
import VueRouter from "vue-router";
import Multiguard from "vue-router-multiguard";
import MainPage from "@/view/MainPage.vue";
import EditNote from "@/view/EditNote.vue";

Vue.use(VueRouter);

const guard = function (to, from, next) {
  if (localStorage.getItem("editedIndex") !== null) {
    next();
  } else {
    next(from);
  }
};

const routes = [
  {
    name: "Main",
    path: "/",
    component: MainPage,
  },
  {
    path: "*",
    redirect: "/",
  },
  {
    name: "EditPage",
    path: "/edit",
    component: EditNote,
    beforeEnter: Multiguard([guard]),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
