import { h, resolveComponent } from 'vue'
import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Profile from "../views/Profile.vue";
import Admin from "../views/Admin.vue";
import NotFound from "../views/NotFound.vue";
import Unauthorized from "../views/Unauthorized.vue";
import Role from "../models/role";
import Store from "../store";
import DefaultLayout from '@/layouts/DefaultLayout'
const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: DefaultLayout,
    meta: { roles: [Role.ADMIN] },
    redirect: '/dashboard',
    
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "dashboard" */ '@/views/Dashboard.vue'),
      },
      {
        path: 'products',
        name: 'Products',
        component: () => import('@/views/Admin'),
      },
      {
        path: 'categories',
        name: 'Categories',
        component: () => import('@/views/Categories'),
      },
      {
        path: 'purchases',
        name: 'Purchases',
        component: () => import('@/views/Purchases'),
      },
      {
        path: 'suppliers',
        name: 'Suppliers',
        component: () => import('@/views/Suppliers'),
      },
      {
        path: 'customers',
        name: 'Customers',
        component: () => import('@/views/Customers'),
      },
      {
        path: 'users',
        name: 'Users',
        component: () => import('@/views/Users'),
      },
      {
        path: 'settings',
        name: 'Settings',
        component: () => import('@/views/Settings'),
      },
     
     
     
    ],
  },
  {
    path: '/Home',
    name: 'Home',
    component: () => import('@/views/Home'),
  },

  {
    path: '/404',
    name: 'Page404',
    component: () => import('@/views/NotFound'),
  },
  {
    path: '/500',
    name: 'Page500',
    component: () => import('@/views/Unauthorized'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login'),
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/Register'),
  },
  {
    path: "/profile",
    name: "profile",
    component: () => import('@/views/Profile'),
    meta: { roles: [Role.ADMIN, Role.USER] },
  },
 
  //unknown pages..
 
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    // always scroll to top
    return { top: 0 }
  },
});

router.beforeEach((to, from, next) => {
  const { roles } = to.meta;
  const currentUser = Store.getters["currentUser"];
  if (roles?.length) {
    if (!currentUser) {
      return next({ path: "/login" });
    }
    if (!roles.includes(currentUser.role)) {
      return next({ path: "/500" });
    }
  }
  next();
});
export default router;
