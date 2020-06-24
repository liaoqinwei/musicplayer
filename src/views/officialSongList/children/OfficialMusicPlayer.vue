<template>
  <div class="music-player">
    <!-- 上面的描述 -->
    <div class="official-desc-box">
      <div class="logo-desc">
        <div class="logo-box">
          <img :src="logo" alt="">
        </div>
        <p>QQ音乐官方歌单</p>
      </div>
      <p class="author-desc">{{desc}}</p>
    </div>
    <!-- 播放器 -->
    <div class="player-box" :class="{'fixed':isFixed}" ref="playerBox">
      <div class="player-btn" :class="{mark:isPlayer}" @click="playerClick(false)">
        <svg class="progress">
          <circle cx="17" cy="17" r="15.2" stroke="#31c27c" stroke-width="1.5" fill="none"
                  stroke-dasharray="0.29 95.29"/>
        </svg>
        <i class="iconfont icon-bofang my-bofang" ref="switchIcon"></i>
      </div>
      <div class="player-text" v-if="!curSong">播放全部</div>
      <div class="player-lyric" v-if="curSong">
        <h2 class="song-name">{{curSong.songname}}</h2>
        <p class="lyric-box" v-if="isHaveLyric">
          <span class="lyric" v-for="item in lyric">{{item.lyric}}</span>
        </p>
      </div>
      <a class="lick-music">
        <i class="iconfont icon-aixin my-aixin"></i>
        收藏歌单
      </a>
    </div>

    <audio ref="myAudio"/>
  </div>
</template>

<script>
  import {getTopDistance} from "assets/utils";
  import parseLyric from "mixins/parseLyric";

  import {getLyric} from 'network/song'

  export default {
    name: "OfficialMusicPlayer",
    props: {
      desc: {
        type: String,
        default: ''
      },
      logo: {
        type: String,
        default: ''
      },
      songList: {
        type: Array,
        default() {
          return []
        }
      },
      songsId: {
        type: Array,
        default() {
          return [];
        }
      }
    },
    data() {
      return {
        isFixed: false,
        playerTop: 0,
        isPlayer: false,
        playing: false,
        curSong: null,
      }
    },
    mixins: [parseLyric],
    mounted() {
      window.addEventListener("touchmove", this.listenScroll, false)
      window.addEventListener("scroll", this.listenScroll, false)
      this.$bus.$on('bannerDown', () => {
        this.playerTop = getTopDistance(this.$refs.playerBox)
      })
      this.$bus.$on('songClick', this.playSong)
    },
    methods: {
      listenScroll(ev) {
        let top = document.documentElement.scrollTop || window.pageYOffset;
        if (top >= this.playerTop) {
          this.isFixed = true
        } else {
          this.isFixed = false
        }
      },
      /* 点击播放按钮的逻辑 */
      playerClick(switchMusic) {// 参数来判断是否是切歌
        // 第一次点击播放  播放全部
        if (!this.isPlayer) {

        }
        this.isPlayer = true
        this.playing = !this.playing
        // 音乐在播放
        if (this.playing || switchMusic) {
          this.$refs.switchIcon.className = 'iconfont icon-bofang1 my-bofang'
          this.$refs.switchIcon.style.color = '#31c27c'
          this.$refs.switchIcon.style.fontSize = '15px'
        } else {
          /* 没有播放 */
          this.$refs.switchIcon.className = 'iconfont icon-bofang my-bofang'
          this.$refs.switchIcon.style.fontSize = '22px'
        }


      },
      /* 播放歌曲的逻辑 */
      playSong(curSong) {
        /* 如果歌曲选中 控制暂停播放 */
        if (curSong === this.curSong) {
          if (this.$refs.myAudio.paused) {
            // 暂停就播放
            this.$refs.myAudio.play()
          } else {
            this.$refs.myAudio.pause()
          }
          this.playerClick(false)
          return
        }
        this.curSong = curSong

        // 获取歌词
        this.getLyric(this.curSong.songmid)
        // 请求音乐 并播放 改变图标
        let url = `http://152.136.147.123:9090/song?id=${this.curSong.songmid}`
        this.$refs.myAudio.src = url
        this.$refs.myAudio.play()
        this.playerClick(true) // 开启播放 切歌模式播放

      },
      /*歌词追踪*/
      lyricTrack() {
      },
      /* 获取歌词 */
      getLyric(id) {
        /* 对歌词进行解析 */
        getLyric(id).then(result => {
          this.isHaveLyric = this.parseLyric(result.lyric)
        })
      }
    }
  }
</script>

<style scoped>
  .music-player {
    position: relative;
    top: -10px;
    margin: 5px 16px 12px;
    border-radius: 3px;
    background: #fff;
    z-index: 111;
    box-shadow: 0 0 15px rgba(100, 100, 100, .15);
  }

  .official-desc-box {
    padding: 10px 16px;
    border-bottom: .01rem solid rgba(0, 0, 0, .04);
  }

  .logo-desc {
    display: flex;
    align-items: center;
    color: #777;
  }

  .logo-box {
    width: 20px;
    height: 20px;
  }

  .logo-box > img {
    height: 100%;
    width: 100%;
  }

  .logo-desc > p {
    padding-left: 10px;
    font-size: 12px;
  }

  .author-desc {
    padding-top: 10px;
    font-size: 12px;
    color: #777;
  }

  /* 播放器 */
  .player-box {
    display: flex;
    align-items: center;
    padding: 0 16px;
    height: 55px;
    background: #fff;
  }

  .player-box.fixed {
    position: fixed;
    top: 0;
    box-sizing: border-box;
    margin-left: -16px;
    width: 100%;
    z-index: 999;

  }

  .player-btn {
    position: relative;
    width: 32px;
    height: 32px;
    border-radius: 34px;
    border: 1px solid #31c27c;
    background: #31c27c;
  }

  .player-text {
    font-size: 14px;
    margin-left: 8px;
  }

  .lick-music {
    position: absolute;
    right: 16px;
    display: block;
    text-align: center;
    line-height: 18px;
    font-size: 12px;
  }

  .my-bofang {
    position: absolute;
    display: block;
    width: 100%;
    height: 100%;
    text-align: center;
    line-height: 33px;
    font-size: 22px;
    color: #fff;
    z-index: 5;
  }

  .player-btn.mark {
    background: #fff;
    border: 1px solid #31c27c;
  }

  .progress {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: rotate(-86deg);
    width: 34px;
    height: 34px;
    margin-top: -17px;
    margin-left: -17px;
    z-index: 4;
  }

  .my-aixin {
    display: block;
    text-align: center;
    font-size: 25px;
  }

  .lyric-box {
    overflow: hidden;
    width: 100%;
    height: 17px;
    line-height: 17px;
  }
  .lyric{
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%;
  }
  .player-lyric{
    width: 65%;
    padding-left: 5px;
    padding-right: 40px;
  }

</style>