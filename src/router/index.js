import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import AddStock from "../views/AddStock.vue";
import Tables from "../views/Tables.vue";
import Billing from "../views/Billing.vue";
import VirtualReality from "../views/VirtualReality.vue";
import RTL from "../views/Rtl.vue";
import Profile from "../views/Profile.vue";
import Signup from "../views/Signup.vue";
import Signin from "../views/Signin.vue";
import store from "../store";
import { Auth } from "@/services/Auth";

const routes = [
  {
    path: "/",
    name: "/",
    redirect: "/dashboard",
  },

  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    meta: {
      requiresAuth: true, 
    },
  },
  {
    path: "/add-stock",
    name: "Add Stock",
    component: AddStock,
    meta: {
      requiresAuth: true, 
    },
  },
  {
    path: "/tables",
    name: "Tables",
    component: Tables,
  },
  {
    path: "/billing",
    name: "Billing",
    component: Billing,
  },
  {
    path: "/virtual-reality",
    name: "Virtual Reality",
    component: VirtualReality,
  },
  {
    path: "/rtl-page",
    name: "RTL",
    component: RTL,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
  },
  {
    path: "/signin",
    name: "Signin",
    component: Signin,
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
  },
  {
    path: "/logout",
    name: "Logout",
    beforeEnter: (to, from, next) => {
      Auth.logout(); 
      next(false);
    },
  },

  
];


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
});


router.beforeEach(async (to, from, next) => {

  if ((to.path === "/signin" || to.path === "/signup") && store.state.token) {
    next("/dashboard");
  } else if (to.matched.some(record => record.meta.requiresAuth)) {
    // console.log(store.state.token)
    if (store.state.token) {
      next();
    } else {
      next("/signin");
    }
  } else {
    next();
  }
});


export default router;
