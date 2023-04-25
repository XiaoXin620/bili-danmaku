import { RouteRecordRaw } from "vue-router";


const routes: RouteRecordRaw[] = [
    {
        path: '/transparent',
        name: 'Transparent',
        meta: {
            title: '通知中心'
        },
        component: () => import('@/pages/transparent/index.vue')
    },
    {
        path: '/danmaku',
        name: 'Danmaku',
        meta: {
            title: '弹幕'
        },
        component: () => import('@/pages/danmaku/index.vue')
    }
]

export default routes;