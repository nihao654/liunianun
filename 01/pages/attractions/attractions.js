// 01/pages/attractions/attractions.js
const attrLib = require('../../data/attractions.js');

Page({
  data: {
    currentCountry: "",
    list: [],
    tags: ["全部", "自然", "人文", "探险"]
  },

  onLoad: function() {
    const selected = wx.getStorageSync('selectedDestination') || { zhName: "刚果金" };
    const countryData = attrLib.attractions[selected.zhName] || [];

    this.setData({
      currentCountry: selected.zhName,
      list: countryData
    });
  },

  onBackTap: function() {
    wx.navigateBack();
  },

  onAttrTap: function(e) {
    const name = e.currentTarget.dataset.name;
    // 以后可以跳转到详情页
    wx.showToast({ title: '查看' + name + '详情', icon: 'none' });
  }
});