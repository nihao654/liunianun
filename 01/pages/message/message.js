Page({
    data: {
        notices: [
            {
                id: 1,
                type: "安全预警",
                tagBg: "#ffeeee",
                title: "内罗毕集会提醒",
                content: "近期市中心区域可能有规模性活动，建议华人同胞减少不必要出行，注意人身安全。",
                time: "10:25",
                unread: true
            },
            {
                id: 2,
                type: "系统更新",
                tagBg: "#eef9f2",
                title: "斯瓦希里语库更新",
                content: "我们新增了50条关于“当地集市贸易”的实用口语，快去实用词句板块看看吧！",
                time: "昨天",
                unread: true
            },
            {
                id: 3,
                type: "办事指南",
                tagBg: "#eef2ff",
                title: "签证续签政策变动",
                content: "当地移民局发布最新通告，关于劳务签证续签流程有所简化，详情请查阅劳务合规模块。",
                time: "3天前",
                unread: false
            }
        ]
    },

    // Removed onBackTap as this is a tab bar page

    // Click to mark message as read
    readNotice(e) {
        const id = e.currentTarget.dataset.id;
        let list = this.data.notices;
        list.forEach(item => {
            if (item.id === id) item.unread = false;
        });
        this.setData({ notices: list });

        wx.showToast({
            title: '已标记为已读',
            icon: 'none'
        });
    },

    // Tab bar navigation logic
    onTabTap: function(e) {
        const tab = e.currentTarget.dataset.tab;
        if (tab === 'message') {
            return; // Already on this tab
        }

        let url = '';
        switch (tab) {
            case 'home':
                url = '/pages/home/home';
                break;
            case 'community':
                url = '/pages/community/community';
                break;
            case 'publish':
                url = '/pages/publish/publish';
                break;
            case 'message':
                url = '/pages/message/message';
                break;
            case 'profile':
                url = '/pages/profile/profile';
                break;
            default:
                break;
        }

        if (url) {
            wx.switchTab({
                url: url,
                fail: (res) => {
                    console.error(`Failed to switch tab to ${url}:`, res);
                    wx.navigateTo({
                        url: url,
                        fail: (navRes) => {
                            console.error(`Failed to navigate to ${url}:`, navRes);
                        }
                    });
                }
            });
        }
    }
});