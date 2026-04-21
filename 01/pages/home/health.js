Page({
  data: {
    countryName: '刚果(金)',
    tickerText: '⚠️ 刚果(金)核心疫情预警：霍乱（全境极高风险） | 猴痘（持续上升） | 麻疹（局部爆发）',
    emergencyPhone: '112',
    hospitals: [
      {
        name: '中刚医疗中心（金沙萨）',
        address: '金沙萨市中心大道 21 号',
        phone: '+243818888888'
      },
      {
        name: '瑞辰医院（卢本巴希）',
        address: '卢本巴希矿业新区健康街 9 号',
        phone: '+243816666666'
      }
    ],
    malariaOpen: false,
    malariaTips: ['阿托伐醌（按医嘱行前启动）', '多西环素（注意防晒与胃部反应）', '驱蚊剂（DEET）+ 长袖衣裤 + 蚊帐']
  },

  onGoBack() {
    const pages = getCurrentPages();
    if (pages.length > 1) {
      wx.navigateBack({ delta: 1 });
      return;
    }

    wx.switchTab({ url: '/pages/home/home' });
  },

  onCallEmergency() {
    wx.makePhoneCall({
      phoneNumber: this.data.emergencyPhone,
      fail: () => {
        wx.showToast({
          title: '拨号失败，请稍后重试',
          icon: 'none'
        });
      }
    });
  },

  onCallHospital(e) {
    const { phone } = e.currentTarget.dataset;
    if (!phone) return;

    wx.makePhoneCall({
      phoneNumber: phone,
      fail: () => {
        wx.showToast({
          title: '拨号失败，请稍后重试',
          icon: 'none'
        });
      }
    });
  },

  onToggleMalaria() {
    this.setData({ malariaOpen: !this.data.malariaOpen });
  }
});
