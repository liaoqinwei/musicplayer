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
                  stroke-dasharray="0.29 95.29" ref="circle"/>
        </svg>
        <i class="iconfont icon-bofang my-bofang" ref="switchIcon"></i>
      </div>
      <div class="player-text" v-if="!curSong">播放全部</div>
      <div class="player-lyric" v-if="curSong">
        <h2 class="song-name">{{curSong.songname}}</h2>
        <div class="lyric-box" v-if="isHaveLyric">
          <ul class="lyric-wrapper" ref="lyricBox">
            <li class="lyric" v-for="item in lyric">{{item.lyric}}</li>
          </ul>
        </div>
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
  import {getTopDistance} from "common/utils";
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
    },
    data() {
      return {
        isFixed: false,
        playerTop: 0, // 顶端距离
        isPlayer: false,// 是否第一次播放
        playing: false,// 是否处于播放状态
        curSong: null,// 当前播放是哪首歌
        curIndex: 0,// 记录当前展示歌词的索引
        curSongIndex: -1// 记录当前播放音乐在音乐列表的索引( 仅仅记录播放全部时的索引 )
      }
    },
    mixins: [parseLyric],
    mounted() {
      window.addEventListener("touchmove", this.listenScroll, false)
      window.addEventListener("scroll", this.listenScroll, false)
      this.$bus.$on('bannerDown', () => {
        this.playerTop = getTopDistance(this.$refs.playerBox)
      })
      /* 点击歌曲事件 */
      this.$bus.$on('songClick', item => {
        // 如果有自动播放 先停止自动播放
        if (this.curSongIndex !== -1) {
          this.$refs.myAudio.removeEventListener('ended', this.nextPlayer)
        }
        this.playSong(item)
      })
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
      // 参数来判断是否是切歌
      playerClick(switchMusic) {
        // 第一次点击播放  播放全部
        if (!this.isPlayer) {
          // 循环songList 并播放 播放完成自定下一首
          this.playAll()
          this.playing = false
        }
        this.isPlayer = true
        this.playing = !this.playing
        // 音乐在播放
        if (this.playing || switchMusic) {
          this.$refs.switchIcon.className = 'iconfont icon-bofang1 my-bofang'
          this.$refs.switchIcon.style.color = '#31c27c'
          this.$refs.switchIcon.style.fontSize = '15px'
          this.$refs.myAudio.play()
        } else {
          /* 没有播放 */
          this.$refs.switchIcon.className = 'iconfont icon-bofang my-bofang'
          this.$refs.switchIcon.style.fontSize = '22px'
          /* 暂停音乐的播放 */
          this.$refs.myAudio.pause()
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
        // 让选中的歌曲有个标记 (选中的歌曲的名字为绿色)
        let preSong = this.songList.find(item => item !== this.curSong && item.isCheck === true)
        if (preSong) preSong.isCheck = false;
        this.curSong.isCheck = true
        this.isPlayer = true

        // 获取歌词
        this.getLyric(this.curSong.songmid)
        // 请求音乐 并播放 改变图标
        let url = `http://152.136.147.123:9090/song?id=${this.curSong.songmid}`
        this.$refs.myAudio.src = url
        this.$refs.myAudio.play()
        // 设置播放完成然后将 图标改为暂停
        this.$refs.myAudio.addEventListener('ended', this.playDown)
        this.playerClick(true) // 开启播放 切歌模式播放
      },
      playDown() {
        this.playing = false
        this.$refs.switchIcon.className = 'iconfont icon-bofang my-bofang'
        this.$refs.switchIcon.style.fontSize = '22px'
      },
      /*歌词追踪*/
      lyricTrack() {
        // 当前歌曲播放时间
        let curTime = this.$refs.myAudio.currentTime.toFixed(0),
            duration = isNaN(this.$refs.myAudio.duration) ? 0 : this.$refs.myAudio.duration,
            ratio = isNaN(Number(curTime) / duration) ? 0 : Number(curTime) / duration;
        /* 解析歌词中的时间 */
        for (let item of this.lyric.entries()) {
          let [index, {time}] = item;
          time = this.parseTime(time)
          if (time === Number(curTime)) {
            this.curIndex = index
            break
          }
        }
        /* 控制圆圈旋转 */
        this.$refs.circle.setAttribute('stroke-dasharray', `${(ratio * 95.29).toFixed(2)} 95.29`)
        this.$refs.lyricBox.style.transform = `translateY(${-this.curIndex * 16.8}px)`
      },
      /* 获取歌词 */
      getLyric(id) {
        /* 对歌词进行解析 */
        getLyric(id).then(result => {
          this.isHaveLyric = this.parseLyric(result.lyric)
        })
      },
      // 播放全部
      playAll() {
        if (this.curSongIndex === -1) {
          this.curSongIndex++
          this.playSong(this.songList[this.curSongIndex])

          this.$refs.myAudio.addEventListener('ended', this.nextPlayer)
        }
      },
      nextPlayer() {
        // 播放完成 继续播放下一首
        this.curSongIndex++
        this.playSong(this.songList[this.curSongIndex])
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

  .song-name {
    font-weight: lighter;
    font-size: 14px;
  }

  .lyric {
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-weight: lighter;
    width: 100%;
    font-size: 11.5px;
    color: #777;
  }

  .player-lyric {
    width: 65%;
    padding-left: 5px;
    padding-right: 40px;
  }

  .lyric-wrapper {
    transition: all .2s;
  }

</style>