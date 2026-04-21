// 01/pages/recommend/recommend.js
const recLib = require('../../data/recommend.js');

Page({
  data: {
    currentCountry: "",
    categories: ["全部", "美食", "住宿", "交通", "购物"],
    activeCategory: "全部",
    displayList: []
  },

  onLoad: function() {
    const selected = wx.getStorageSync('selectedDestination') || { zhName: "刚果金" };
    const list = recLib.recommend[selected.zhName] || [];

    this.setData({
      currentCountry: selected.zhName,
      displayList: list,
      fullList: list
    });
  },

  onTagTap: function(e) {
    const category = e.currentTarget.dataset.tag;
    let filtered = this.data.fullList;
    if (category !== "全部") {
      filtered = this.data.fullList.filter(item => item.category === category);
    }
    this.setData({ activeCategory: category, displayList: filtered });
  },

  onBackTap: function() {
    wx.navigateBack();
  }
});