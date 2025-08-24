import { createRouter, createWebHistory } from 'vue-router'
import Home from "@/views/Home.vue"
import Game from "@/views/Game.vue"
import Play from "@/views/Play.vue"


const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/game', name: 'Game', component: Game },
  { path: "/play", name: "Play", component: Play}
];

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
