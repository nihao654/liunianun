Component({
    properties: {},
    data: {
        activeTab: 'community' // Set initial active tab for this page
    },
    methods: {
        onTabTap: function(e) {
            const tab = e.currentTarget.dataset.tab;
            if (tab === this.data.activeTab) {
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
                    // For publish, we might want to show a modal or navigate to a specific publish page
                    // For now, let's assume it navigates to a publish page
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
                        // If switchTab fails (e.g., not a tab bar page), try navigateTo
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
    }
});
