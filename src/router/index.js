import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const Recommend = () => import('views/recommend/Recommend'),
    ToList = () => import('views/tolist/ToList'),
    OfficialSongListDetail = () => import('views/officialSongList/OfficialSongListDetail'),
    NormalSongListDetail = () => import('views/normalSongList/NormalSongListDetail'),
    SongDetail = () => import('views/songDetail/SongDetail');


const routes = [
  {
    path: '/player',
    redirect: '/player/recommend'
  },
  {
    path: '/player/recommend',
    component: Recommend
  },
  {
    path: '/player/tolist',
    component: ToList
  },
  {
    path: '/player/officialDetail/:id',
    component: OfficialSongListDetail
  },
  {
    path: '/player/detail/:id',
    component: NormalSongListDetail
  },
  {
    path: '/player/songdetail/:id',
    component: SongDetail
  },
  {
    path: '/player/rakinglist/:id',
    component: NormalSongListDetail
  }

]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
