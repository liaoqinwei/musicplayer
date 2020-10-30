<template>
  <section class="song-detail-banner">
    <!-- 背景图 -->
    <div class="banner-bg" ref="bannerBg"></div>
    <!-- 内容 -->
    <div class="banner-main">
      <h2 class="song-name">{{songDesc.track_info.title}}</h2>
      <p class="singer-name">{{singerName(songDesc.track_info.singer)}}</p>
      <img :src="getRealPath(300,songDesc.track_info.album.mid)" alt="" class="song-logo"
           v-show="!isHaveLyric || !checkLyric" @click="checkLyric=true">
      <!-- 歌词 -->
      <div class="lyric-wrapper" v-show="isHaveLyric && checkLyric" @click="checkLyric = false">
        <div class="lyric-box">
          <ul class="lyric-list" ref="lyricList">
            <li class="lyric-item" v-for="(item,index) in lyric" :class="{mark:index===curIndex}">{{item.lyric}}</li>
          </ul>
        </div>
        <div class="icon-box">
          <span class="look-lyric">
            <i class="iconfont icon-guanjiancisousuo my-guanjian"></i>
            查看完整歌词
          </span>
          <span class="set-ring">
            <i class="iconfont icon-dianhua my-dianhua"></i>
            设置彩铃
          </span>
        </div>
      </div>

      <!-- 按钮 -->
      <div class="icon-mark">
        <a href="javascript:;" class="mv" v-if="songDesc.track_info.mv.id!==0">
          <i class="iconfont icon-ttpodicon"></i>
        </a>
        <!-- 播放音乐 -->
        <a href="javascript:;" class="player" @click="playClick">
          <i class="iconfont icon-bofang11" ref="playMark"></i>
        </a>

        <a href="javascript:;" class="collect">
          <i class="iconfont icon-aixin"></i>
        </a>
      </div>
      <div class="btn-download">
        {{computedIsFree}}
      </div>
    </div>

    <audio ref="myVideo" preload="none"/>
  </section>
</template>

<script>
  import singerAanPath from "mixins/singerAanPath";
  import parseLyric from "mixins/parseLyric";

  import {getLyric} from "network/song"

  import {getPreviousHeight} from 'common/utils'

  export default {
    name: "SongDetailBanner",
    data() {
      return {
        playing: false,
        curIndex: 0,// 移动的索引
        translateSize: 0,// 移动的位置
        curEl: null,// 存放当前的 歌词选中元素,
        checkLyric: false
      }
    },
    props: {
      songDesc: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    mixins: [singerAanPath, parseLyric],
    computed: {
      computedIsFree() {
        return !!this.songDesc.track_info.pay.pay_down ? '下载歌曲' : '免费下载歌曲'
      }
    },
    mounted() {
      this.$refs.bannerBg.style.background = `url(${this.getRealPath(300, this.songDesc.track_info.album.mid)}) center center no-repeat`
      this.$refs.bannerBg.style.backgroundSize = '3.2rem 85%  '
    },
    methods: {
      playClick() {
        this.playing = !this.playing
        if (this.playing) {
          // 如果是lyric为空那么就发送请求
          if (Object.keys(this.lyric).length === 0) {
            // 请求歌词
            getLyric(this.songDesc.track_info.mid).then(result => {
              this.lyric = result
              /* 有歌词 */
              this.isHaveLyric = this.parseLyric(this.lyric.lyric);
            })
            // 播放音乐
            let url = `http://152.136.147.123:9090/song?id=${this.songDesc.track_info.mid}`;
            this.$refs.myVideo.src = url
          }

          this.$refs.myVideo.play()

          // 改变图标
          this.$refs.playMark.className = 'iconfont icon-bofang1'
        } else {
          // 改变图标
          this.$refs.playMark.className = 'iconfont icon-bofang11'
          // 停止音乐的播放
          this.$refs.myVideo.pause()
          /* 音乐播放完成 */
          this.$refs.myVideo.addEventListener('ended',this.playDown)
          // 停止定时器
          clearInterval(this.autoTimer)
        }
      },
      playDown(){
        this.playing = false
      },
      /* 歌词追踪 */
      lyricTrack() {
        if (this.lyric) {
          // 获取已经播放了的时间
          let curTime = this.$refs.myVideo.currentTime.toFixed(0);
          for (let item of this.lyric.entries()) {
            let index = item[0],
                {time} = item[1];
            time = this.parseTime(time)
            if (time === Number(curTime)) {
              this.curIndex = index
              break
            }
            /* 如果已经循环到大的了 就退出循环 节省性能 且不进行歌词的切换*/
            if (time > Number(curTime)) return;
          }
          /* 如果是歌名 不做处理 */
          if (this.curIndex === 0) return;

          let curEl = this.$refs.lyricList.children[this.curIndex],
              top = getPreviousHeight(curEl);
          /* 防止相同的el */
          if (this.curEl === curEl) return;
          this.$refs.lyricList.style.transform = `translateY(${-top + Number(curEl.offsetHeight) / 2}px)`
          this.curEl = curEl
        }
      },
    },
    //  页面销毁关闭定时器
    destroyed() {
      clearTimeout(this.autoTimer)
    },
  }
</script>

<style scoped>
  i {
    color: #000;
  }

  .song-detail-banner {
    overflow: hidden;
    position: relative;
    padding-top: .15rem;
    background-size: cover;
  }

  .banner-bg {
    position: absolute;
    overflow: hidden;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: .05;
    z-index: 1;
  }

  .banner-main {
    position: relative;
    left: 0;
    top: 0;
    z-index: 22;
  }

  .song-name, .singer-name {
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    box-sizing: border-box;
    padding: 0 .17rem;
    font-family: -apple-system, sans-serif;
    font-weight: 400;
    font-size: .15rem;
  }

  .singer-name {
    margin-top: .02rem;
    margin-bottom: .14rem;
    font-size: .12rem;
    text-align: center;
    color: rgba(150, 150, 150, 1);
  }

  .song-logo {
    margin: 0 auto;
    display: block;
    height: 1.4rem;
    width: 1.4rem;
    border-radius: .08rem;
    box-shadow: 0 0 20px rgba(0, 0, 0, .2);
  }

  .icon-mark {
    height: .9rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .icon-mark > a {
    font-weight: 600;
    margin: 0 .13rem;
    text-align: center;
    line-height: .34rem;
    height: .34rem;
    width: .34rem;
    border: 1px solid rgba(0, 0, 0, .2);
    border-radius: 100%;
  }

  .icon-mark > a > i {
    font-size: .15rem;
  }

  .mv > i {
    font-size: .2rem !important;
  }

  .btn-download {
    margin: 0 auto;
    text-align: center;
    width: 2rem;
    height: .34rem;
    line-height: .34rem;
    font-size: .15rem;
    border-radius: .34rem;
    background: #22d59c;
    color: #fff;
  }

  .lyric-wrapper {
    box-sizing: border-box;
    padding-top: .1rem;
    height: 1.4rem;
  }

  .lyric-box {
    text-align: center;
    overflow: hidden;
    height: .76rem;
  }

  .lyric-list {
    transition: all .2s;
  }

  .lyric-item {
    margin: 0 .17rem;
    font-size: .12rem;
    line-height: .23rem;
    color: rgba(0, 0, 0, 0.9);
  }

  .lyric-item.mark {
    margin: .09rem .17rem;
    font-size: .156rem;
    font-weight: normal;
    color: rgb(34, 213, 156);

  }

  .icon-box {
    margin-top: .25rem;
    text-align: center;
  }

  .look-lyric, .set-ring {
    margin: 0 .1rem;
    font-size: .11rem;
  }

  .my-guanjian, .my-dianhua {
    position: relative;
    top: .02rem;
    font-size: .17rem;
  }

  .my-guanjian {
    font-size: .2rem;
  }

</style>