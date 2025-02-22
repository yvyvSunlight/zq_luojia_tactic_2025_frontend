import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import SignUpPage from '../views/SignUpPage.vue'
import PreparePage from '@/views/PreparePage.vue'
import PlayingPage from '../views/PlayingPage.vue'
import EndPage from '../views/EndPage.vue'

const routes = [
    {
        path: '/',
        name: 'HomePage',
        component: HomePage
    },
    {
        path: '/signup',
        name: 'SignUpPage',
        component: SignUpPage
    },
    {
        path: '/prepare',
        name: 'PreparePage',
        component: PreparePage
    },
    {
        path: '/playing',
        name: 'PlayingPage',
        component: PlayingPage
    },
    {
        path: '/end',
        name: 'EndPage',
        component: EndPage
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
