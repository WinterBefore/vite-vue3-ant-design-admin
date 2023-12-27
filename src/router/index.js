import { createRouter, createWebHistory } from "vue-router";
import NProgress from "nprogress";
const routes = [
  // 首页的重定向
  { path: "/", redirect: "/index", meta: { auth: false } },
  {
    path: "/login",
    name: "login",
    meta: { auth: true },
    component: () => import("@/views/login.vue"),
  },
  {
    path: "/index",
    name: "index",
    meta: { auth: false },
    component: () => import("@/views/index.vue"),
    redirect: "/index/dashboard",
    children: [
      {
        path: "dashboard",
        name: "工作台",
        icon: "PieChartOutlined",
        key: "dashboard",
        label: "工作台",
        meta: {
          auth: false,
        },
        component: () => import("@/views/dashboard.vue"),
      },
      {
        path: "basic",
        name: "基础管理",
        icon: "PieChartOutlined",
        key: "basic",
        label: "基础管理",
        meta: {
          auth: false,
        },
        children: [
          {
            path: "user",
            name: "用户管理",
            icon: "PieChartOutlined",
            key: "user",
            label: "用户管理",
            meta: {
              auth: false,
            },
            component: () => import("@/views/user.vue"),
          },
          {
            path: "image",
            name: "图片管理",
            icon: "PieChartOutlined",
            key: "image",
            label: "图片管理",
            meta: {
              auth: false,
            },
            component: () => import("@/views/image.vue"),
          },
          {
            path: "file",
            name: "文件管理",
            icon: "PieChartOutlined",
            key: "file",
            label: "文件管理",
            meta: {
              auth: false,
            },
            component: () => import("@/views/file.vue"),
          },
          {
            path: "good",
            name: "商品管理",
            icon: "PieChartOutlined",
            key: "good",
            label: "订单管理",
            meta: {
              auth: false,
            },
            component: () => import("@/views/good.vue"),
          },
          {
            path: "notice",
            name: "公告管理",
            icon: "PieChartOutlined",
            key: "notice",
            label: "公告管理",
            meta: {
              auth: false,
            },
            component: () => import("@/views/notice.vue"),
          },
          {
            path: "order",
            name: "订单管理",
            icon: "PieChartOutlined",
            key: "order",
            label: "订单管理",
            meta: {
              auth: false,
            },
            component: () => import("@/views/order.vue"),
          },
          {
            path: "activity",
            name: "订单管理",
            icon: "PieChartOutlined",
            key: "activity",
            label: "活动管理",
            meta: {
              auth: false,
            },
            component: () => import("@/views/activity.vue"),
          },
        ],
      },
      {
        path: "system",
        name: "系统管理",
        icon: "PieChartOutlined",
        key: "system",
        label: "系统管理",
        meta: {
          auth: false,
        },
        children: [
          {
            path: "android",
            name: "安卓管理",
            icon: "PieChartOutlined",
            key: "android",
            label: "安卓管理",
            meta: {
              auth: false,
            },
          },
          {
            path: "web",
            name: "Web(网站端)",
            icon: "PieChartOutlined",
            key: "android",
            label: "web端管理",
            meta: {
              auth: false,
            },
          },
        ],
      },
    ],
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

//前局前置路由守卫
router.beforeEach((to, from, next) => {
  NProgress.start();
  if (to.meta.auth) {
    //判断当前路由是否需要进行权限控制
    if (localStorage.getItem("token")) {
      //权限控制的具体规则
      next();
    } else {
      alert("未登录,没有访问权限");
      next("/index");
    }
  } else {
    next(); // 放行
  }
});

router.afterEach((to, from) => {
  NProgress.done();
});
export default router;
