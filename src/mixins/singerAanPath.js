export default {
  data() {
    return {
      path: 'https://y.gtimg.cn/music/photo_new/T002R{}x{}M000',
      path1: 'https://y.gtimg.cn/music/photo_new/T001R{}x{}M000'
    }
  },
  methods: {
    getRealPath(size, id, num) {
      let str;
      if (num === 1) {
        str = this.path1.replace(/\{\}/g, (_) => {
          return size
        })
      } else {
        str = this.path.replace(/\{\}/g, (_) => {
          return size
        })
      }

      return str + id + '.jpg';
    },
    singerName(list) {
      let str = ''
      list.forEach(item => {
        str += item.name + '/'
      })
      return str.substring(0, str.length - 1)
    }
  }
}