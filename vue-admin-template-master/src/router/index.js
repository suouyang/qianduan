import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true },

  { path: '/404',
    component: () => import('@/views/404'),
    hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '智慧城市后台首页', icon: 'dashboard' }
    }]
  },

  {
    path: '/news',
    component: Layout,
    redirect: '/news/list',
    name: '新闻管理',
    meta: { title: '新闻管理', icon: '新闻管理' },
    children: [
      {
        path: 'list',
        name: '新闻列表',
        component: () => import('@/views/news/list'),
        meta: { title: '新闻列表', icon: '列表' }
      },
      {
        path: 'save',
        name: '添加新闻',
        component: () => import('@/views/news/save'),
        meta: { title: '添加新闻', icon: '添加' }
      },
      {
        path: 'first',
        name: '新闻首页',
        component: () => import('@/views/news/first'),
        meta: { title: '新闻首页', icon: '首页' }
      },
      {
        path: 'categorylist',
        name: '新闻类别',
        component: () => import('@/views/news/categorylist'),
        meta: { title: '新闻类别', icon: '类别' }
      },
      {
        path: 'categorysave',
        name: '添加新闻类别',
        component: () => import('@/views/news/categorysave'),
        meta: { title: '添加新闻类别', icon: '添加' },
        hidden: true
      },
      {
        path: 'categoryedit/:id',
        name: '修改招聘类别',
        component: () => import('@/views/news/categorysave'),
        meta: { title: '修改招聘类别', icon: '修改' },
        hidden: true
      },
      {
        path: 'edit/:id',
        name: '修改新闻',
        component: () => import('@/views/news/save'),
        meta: { title: '修改新闻', icon: '修改' },
        hidden: true
      }
    ]
  },
  {
    path: '/product',
    component: Layout,
    redirect: '/product/list',
    name: '产品管理',
    meta: { title: '产品管理', icon: '产品管理' },
    children: [
      {
        path: 'list',
        name: '产品列表',
        component: () => import('@/views/product/list'),
        meta: { title: '产品列表', icon: '列表' }
      },
      {
        path: 'save',
        name: '添加产品',
        component: () => import('@/views/product/save'),
        meta: { title: '添加产品', icon: '添加' }
      },
      {
        path: 'categoryedit/:id',
        name: '修改产品类别',
        component: () => import('@/views/product/categorysave'),
        meta: { title: '修改产品类别', icon: '修改' },
        hidden: true
      },
      {
        path: 'categorylist',
        name: '产品类别',
        component: () => import('@/views/product/categorylist'),
        meta: { title: '产品类别', icon: '类别' }
      },
      {
        path: 'categorysave',
        name: '添加产品类别',
        component: () => import('@/views/product/categorysave'),
        meta: { title: '添加新闻类别', icon: '添加' },
        hidden: true
      },
      {
        path: 'edit/:id',
        name: '修改产品',
        component: () => import('@/views/product/edit'),
        meta: { title: '修改产品', icon: '修改' },
        hidden: true
      }
    ]
  },
  {
    path: '/structure',
    component: Layout,
    redirect: '/structure/list',
    name: '组织结构',
    meta: { title: '组织结构', icon: '组织结构' },
    children: [
      {
        path: 'list',
        name: '组织结构',
        component: () => import('@/views/structure/list'),
        meta: { title: '组织结构', icon: '列表' }
      },
      {
        path: 'first',
        name: '组织首页',
        component: () => import('@/views/structure/first'),
        meta: { title: '组织首页', icon: '首页' }
      },

      {
        path: 'save',
        name: '添加组织',
        component: () => import('@/views/structure/save'),
        meta: { title: '添加组织', icon: '添加' },
      },

      {
        path: 'edit/:id',
        name: '修改',
        component: () => import('@/views/structure/save'),
        meta: { title: '修改', icon: '修改' },
        hidden: true
      },
    ]
  },
  {
    path: '/recruitment',
    component: Layout,
    redirect: '/recruitment/list',
    name: '招聘管理',
    meta: { title: '招聘管理', icon: '招聘管理' },
    children: [
      {
        path: 'list',
        name: '招聘列表',
        component: () => import('@/views/recruitment/list'),
        meta: { title: '招聘列表', icon: '列表' }
      },
      {
        path: 'save',
        name: '添加招聘',
        component: () => import('@/views/recruitment/save'),
        meta: { title: '添加招聘', icon: '添加' }
      },
      {
        path: 'categorylist',
        name: '招聘类别',
        component: () => import('@/views/recruitment/categorylist'),
        meta: { title: '招聘类别', icon: '类别' }
      },
      {
        path: 'categorysave',
        name: '添加招聘类别',
        component: () => import('@/views/recruitment/categorysave'),
        meta: { title: '添加招聘类别', icon: '添加' },
        hidden: true
      },
      {
        path: 'categoryedit/:id',
        name: '修改招聘类别',
        component: () => import('@/views/recruitment/categorysave'),
        meta: { title: '修改招聘类别', icon: '修改' },
        hidden: true
      },

      {
        path: 'edit/:id',
        name: '修改招聘',
        component: () => import('@/views/recruitment/save'),
        meta: { title: '修改招聘', icon: '修改' },
        hidden: true
      }
    ]
  },
  {
    path: '/company',
    component: Layout,
    redirect: '/company/list',
    name: '公司信息',
    meta: { title: '公司信息', icon:'公司' },
    children: [
      {
        path: 'list',
        name: '公司信息',
        component: () => import('@/views/company/list'),
        meta: { title: '公司信息', icon: '公司' }
      },
      {
        path: 'edit/:id',
        name: '修改',
        component: () => import('@/views/company/save'),
        meta: { title: '修改', icon: '公司' },
        hidden: true
      }
    ]
  },
  {
    path: '/join',
    component: Layout,
    redirect: '/join/list',
    name: '加入我们',
    meta: { title: '加入我们', icon:'加入我们' },
    children: [
      {
        path: 'list',
        name: '加入我们',
        component: () => import('@/views/join/list'),
        meta: { title: '加入我们', icon: '加入我们' }
      },
      {
        path: 'save',
        name: '修改',
        component: () => import('@/views/join/save'),
        meta: { title: '修改', icon: '加入我们' },
        hidden: true
      },
      {
        path: 'edit/:id',
        name: '修改招聘',
        component: () => import('@/views/join/edit'),
        meta: { title: '修改招聘', icon: '加入我们' },
        hidden: true
      },
    ]
  },

]


export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
