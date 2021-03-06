import { createRouter, createWebHistory } from "vue-router";
import axios from "axios";
import Home from "./views/home.vue";
import CreatePost from "./views/createPost.vue";
import UseFrom from "./views/useFrom.vue";
import store from "./store";
const routerHistory = createWebHistory();
const router = createRouter({
  history: routerHistory,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/create",
      name: "create",
      component: CreatePost,
      meta: { requiredLogin: true },
    },
    {
      path: "/from",
      name: "from",
      component: UseFrom,
    },
  ],
});
router.beforeEach((to, from, next) => {
  const { user, token } = store.state;
  const { requiredLogin, redirectAlreadyLogin } = to.meta;
  if (!user.isLogin) {
    if (token) {
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      store
        .dispatch("fetchCurrentUser")
        .then(() => {
          if (redirectAlreadyLogin) {
            next("/");
          } else {
            next();
          }
        })
        .catch((e) => {
          console.error(e);
          store.commit("logout");
          next("login");
        });
    } else {
      if (requiredLogin) {
        next("login");
      } else {
        next();
      }
    }
  } else {
    if (redirectAlreadyLogin) {
      next("/");
    } else {
      next();
    }
  }
});

export default router;
