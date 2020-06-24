export default {
  data(){
    return{
      lyric: {},
      isHaveLyric: false,
      autoTimer: null
    }
  },
  methods:{
    parseLyric(lyric) {
      let reg = /(纯音乐，请您欣赏)$/
      // 纯音乐返回false
      if (reg.test(lyric)) return false;
      // 解析歌词
      let index = lyric.indexOf('[00:0')
      lyric = lyric.substring(index).split('\n')
      // 替换中括号
      lyric = lyric.map(item => item.replace(/^\[(.*?)\]/g, (_, g) => `{"time":"${g}",`)
      )
      // 给歌词添加
      lyric = lyric.map(item => item.replace(/,(.*)/g, (_, g) => `,"lyric":"${g}"}`))
      lyric = '{"data":[' + lyric.join(',') + ']}'
      lyric = JSON.parse(lyric).data.filter(item => item.lyric != '')
      this.lyric = lyric.map(item => {
        let ly = item.lyric
        item.lyric = ly.replace(/&apos;/g, "'")
        return item
      })
      // 选中歌词显示
      this.checkLyric = true
      return true;
    },
    parseTime(time) {
      time = time.split(':')
      let minutes = Number(time[0]),
          seconds = Number(time[1]).toFixed(0);
      return (minutes * 60 + seconds * 1)
    },
  },
  watch: {
    isHaveLyric: function () {
      if (this.isHaveLyric) {
        this.autoTimer = setInterval(this.lyricTrack, 500)
      }
    }
  }
}