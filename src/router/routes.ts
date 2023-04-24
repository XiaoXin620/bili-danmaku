import { RouteRecordRaw } from "vue-router";


const routes: RouteRecordRaw[] = [
    {
        path: '/transparent',
        name: 'Transparent',
        meta: {
            title: '通知中心'
        },
        component: () => import('@/pages/transparent/index.vue')
    }
]

export default routes;