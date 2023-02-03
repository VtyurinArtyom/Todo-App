import Vue from "vue";
import VueRouter from "vue-router";
import MainPage from "@/view/MainPage.vue";
import EditNote from "@/view/EditNote.vue";

Vue.use(VueRouter);

const routes = [
  {
    name: "Main",
    path: "/",
    component: MainPage,
  },
  {
    name: "EditPage",
    path: "/edit",
    component: EditNote,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
