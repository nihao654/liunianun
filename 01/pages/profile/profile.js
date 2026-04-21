Page({
    data: {
        isLogin: false,
        userInfo: {},
        currentCountry: "",
        bookmarks: [] // Initialize bookmarks array
    },

    onShow() {
        // Check if user is logged in
        const userInfo = wx.getStorageSync('userInfo');
        if (userInfo) {
            this.setData({ isLogin: true, userInfo });
        }

        // Get selected country
        const selected = wx.getStorageSync('selectedDestination');
        this.setData({ currentCountry: selected ? selected.zhName : "肯尼亚" });

        // Load bookmarks
        const storedBookmarks = wx.getStorageSync('bookmarks') || [];
        this.setData({ bookmarks: storedBookmarks });
    },

    // WeChat authorization login
    getUserProfile() {
        wx.getUserProfile({
            desc: '展示用户信息', // Declaration of use, required
            success: (res) => {
                console.log("Login successful", res.userInfo);
                this.setData({
                    userInfo: res.userInfo,
                    isLogin: true
                });
                // Save to cache for next time
                wx.setStorageSync('userInfo', res.userInfo);
                wx.showToast({ title: '欢迎回来', icon: 'success' });
            },
            fail: (err) => {
                console.log("User denied authorization", err);
                wx.showToast({ title: '授权失败', icon: 'error' });
            }
        });
    },

    // Placeholder for adding/removing bookmarks (example)
    addBookmark(item) {
        const bookmarks = this.data.bookmarks;
        bookmarks.push(item);
        this.setData({ bookmarks });
        wx.setStorageSync('bookmarks', bookmarks);
        wx.showToast({ title: '收藏成功', icon: 'success' });
    },

    removeBookmark(id) {
        let bookmarks = this.data.bookmarks;
        bookmarks = bookmarks.filter(bookmark => bookmark.id !== id);
        this.setData({ bookmarks });
        wx.setStorageSync('bookmarks', bookmarks);
        wx.showToast({ title: '取消收藏', icon: 'success' });
    },

    // Tab bar navigation logic
    onTabTap: function(e) {
        const tab = e.currentTarget.dataset.tab;
        if (tab === 'profile') {
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