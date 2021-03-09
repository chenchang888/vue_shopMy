import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);
const routes = [
  {
    path: "/",
    redirect: "/login"
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/Login.vue")
  },
  {
    path: "/home",
    name: "Home",
    redirect: "/users",
    component: () => import("@/views/Home.vue"),
    children: [
      {
        path: "/users",
        name: "Users",
        component: () => import("@/views/Users/Users.vue")
      },
      {
        path: "/roles",
        name: "Roles",
        component: () => import("@/views/Rights/Roles.vue")
      },
      {
        path: "/rights",
        name: "Rights",
        component: () => import("@/views/Rights/Rights.vue")
      },
      {
        path: "/goods",
        name: "Goods",
        component: () => import("@/views/Goods/Goods.vue")
      },
      {
        path: "/params",
        name: "Params",
        component: () => import("@/views/Goods/Params.vue")
      },
      {
        path: "/categories",
        name: "Categories",
        component: () => import("@/views/Goods/Categories.vue")
      },
      {
        path: "/orders",
        name: "Orders",
        component: () => import("@/views/Orders/Orders.vue")
      },
      {
        path: "/reports",
        name: "Reports",
        component: () => import("@/views/Reports/Reports.vue")
      },
    ]
  },
];
const router = new VueRouter({
  routes
});
// 添加路由导航守卫
router.beforeEach((to, from, next) => {
  console.log(to);
  console.log(from);
  console.log(next);
  if (to.path === "/login") return next()
  const token = window.sessionStorage.getItem("token")
  if (!token) return next({ name: 'Login' })
  next()
})
export default router;
