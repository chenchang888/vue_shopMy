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
  }
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
