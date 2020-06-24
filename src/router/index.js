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
    path: '/',
    redirect: '/recommend'
  },
  {
    path: '/recommend',
    component: Recommend
  },
  {
    path: '/tolist',
    component: ToList
  },
  {
    path: '/officialDetail/:id',
    component: OfficialSongListDetail
  },
  {
    path: '/detail/:id',
    component: NormalSongListDetail
  },
  {
    path: '/songdetail/:id',
    component: SongDetail
  },
  {
    path: '/rakinglist/:id',
    component: NormalSongListDetail
  }

]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
