import Vue from "vue";
import Router from "vue-router";
import routes from "./config";
import { getToken } from "../libs/utils";

Vue.use(Router);

const router = new Router({
  routes
  // ,
  // scrollBehavior(to, from, savedPosition) {
  //   console.log("scrollBehavior", to, from, savedPosition);
  // }
});

// router.beforeResolve((to, from, next) => {
//   const toLen = to.fullPath.substr(1).split("/").length;
//   const fromLen = from.fullPath.substr(1).split("/").length;
//   if(toLen === fromLen){
//     next({name: "Home"});
//   }
//   next();
// });

router.beforeEach((to, from, next) => {
  if (to.meta.isUser) {
    const token = getToken();
    if (token && token !== "") {
      next();
    } else {
      next({ name: "Login" });
    }
  } else {
    next();
  }
});

export default router;
