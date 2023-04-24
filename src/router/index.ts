import { createRouter, createWebHashHistory } from "vue-router";
import routes from './routes'

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

router.beforeEach((to, from, next) =>{
    document.title = (to.meta.title as string)
        ? `${to.meta.title as string} - Meow`
        : "Meow";
    next();
})

export default router;