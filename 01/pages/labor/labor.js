// 01/pages/labor/labor.js
const laborLib = require('../../data/labor.js');

Page({
  data: {
    currentCountry: "",
    policyList: []
  },

  onLoad: function() {
    // 从缓存读取国家，保持全局一致性
    const selected = wx.getStorageSync('selectedDestination') || { zhName: "刚果金" };
    const list = laborLib.labor[selected.zhName] || [];

    this.setData({
      currentCountry: selected.zhName,
      policyList: list
    });
  },

  onBackTap: function() {
    wx.navigateBack();
  },

  // 模拟点击查看详情（以后可以扩展）
  onPolicyTap: function(e) {
    const title = e.currentTarget.dataset.title;
    wx.showModal({
      title: title,
      content: '详细法律条文请咨询当地领事馆或专业律师。',
      showCancel: false
    });
  }
});