import {
  getMultiData,
  getGoodsData
} from '../../service/home.js'
const Arrytitles = ['pop', 'new', 'sell']

const POP = "pop";
const SELL = "sell";
const NEW = "new";
const BACK_TOP_POSITION = "1000"
Page({

  data: {
    banners: [],
    recommends: [],
    titles: ['流行', '新款', '精选'],
    currentType: 'pop',
    goods: {
      [POP]: {
        page: 0,
        list: []
      },
      [NEW]: {
        page: 0,
        list: []
      },
      [SELL]: {
        page: 0,
        list: []
      },
    },
    showBackTop: false,
    isTabFixed:false,
    tabScrollTop:0
  },

  onLoad: function(options) {
    this._getMultidata()
    //2.请求商品函数
    this._getGoodsData('pop')
    this._getGoodsData('new')
    this._getGoodsData('sell')
  },
  handletabClick(res) {
    let currentType = ''
    const index = res.detail.index

    this.setData({
      currentType: Arrytitles[index]
    })
   },
  handimageload() {
    wx.createSelectorQuery().select('#tab-control').boundingClientRect(rect => {
      this.data.tabScrollTop=rect.top
    }).exec()
  },
//  ---------------------- 页面滚动请求函数------------------
   onPageScroll(options) {
    const scrollTop = options.scrollTop
    const flag = scrollTop >= BACK_TOP_POSITION
    if (flag != this.data.showBackTop) {
      this.setData({
        showBackTop: scrollTop >= BACK_TOP_POSITION
      })
    }
     const flag2 = scrollTop >=this.data.tabScrollTop
     if(flag2!=this.data.isTabFixed){
       this.setData({
         isTabFixed: scrollTop >= this.data.tabScrollTop
       })
     }
  },
  //------------------------网络请求函数--------------------------
  _getMultidata() {
    //1.请求轮播图
    getMultiData().then(res => {
      //console.log(res)
      this.setData({
        banners: res.data.data.banner.list,
        recommends: res.data.data.recommend.list
      })
    })
  },
  _getGoodsData(type) {
    const page = this.data.goods[type].page + 1
    getGoodsData(type, page).then(res => {
      //取出数据
      const list = res.data.data.list;
      //遍历装入数据
      const oldlist = this.data.goods[type].list
      oldlist.push(...list)
      const typeKey = `goods.${type}.list`;
      const pageKey = `goods.${type}.page`;

      this.setData({
        [typeKey]: oldlist,
        [pageKey]:page
      })
    })
  },
  onReachBottom(){
    //上啦加载更多 调用之前封装的请求数据函数
    this._getGoodsData(this.data.currentType)
  }
})