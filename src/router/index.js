import { createRouter, createWebHistory } from 'vue-router'
import Home from "@/views/Home.vue"
import Game from "@/views/Game.vue"
import Play from "@/views/Play.vue"
import Final from '@/views/Final.vue'
import Historial from '@/views/Historial.vue'


const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/game', name: 'Game', component: Game },
  { path: "/play", name: "Play", component: Play},
  { path: "/final", name: "Final", component: Final},
  {path: "/historial", name:"Historial", component: Historial}
];

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
