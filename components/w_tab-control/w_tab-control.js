// components/w_tab-control/w_tab-control.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    titles: {
      type: Array,
      value: []
    }

  },

  /**
   * 组件的初始数据
   */
  data: {
    currentIndex: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleitemclick(event) {
      // 1.设置最新的index
      this.setData({
        currentIndex: event.currentTarget.dataset.index
      })
      const data = {
        index: this.data.currentIndex
      }
      this.triggerEvent('tabClick', data, {})
    }
  }
})