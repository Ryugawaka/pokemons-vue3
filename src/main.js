import { createApp } from 'vue'
import App from './App.vue'
import MainPage from './components/MainPage.vue'
import PokemonPage from './components/PokemonPage.vue'    
import * as VueRouter from 'vue-router'


const routes = [
{ path: '/', name: 'main', component: MainPage }, 
{path: '/:name', name: 'card', component: PokemonPage}];


const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes,
});



createApp(App).use(router).mount('#app')

