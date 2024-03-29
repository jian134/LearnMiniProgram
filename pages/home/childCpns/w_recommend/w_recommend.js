// pages/home/childCpns/w_recommend.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    recommends: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isload: true
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleload() {
      if (this.data.isload) {
        this.triggerEvent('imageload', {}, {})
        this.data.isload = false
      }
    }
  }
})