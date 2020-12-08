// pages/mine/mine.js
const app = getApp();
Page({
    /**
     * 页面的初始数据
     */
    data: {
        avatarUrl:'',
        userName: '',
        cos_cdn: app.globalData.cos_cdn,
        // 我下发且正在进行中的任务数目
        distributedTaskProgressNum: 0,
        // 我参加的学习任务数目
        joinedTaskProgressAndNotPassNum: 0,
        // 未完成考卷数目
        paperUnfinishNum: 0,
        // 总气泡数
        meNum: 0,
        keyIssueList: ['我填写的', '我反馈的', '我评价的', '我关注的'],
        phoneNumber: '18060979515'
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.setData({
            avatarUrl: app.globalData.userInfo.avatarUrl,
            userName: app.globalData.userInfo.nickName,
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        this.getMeNum();
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    // 我关注的课堂
    followCourse() {
        wx.navigateTo({
            url: '/pages/courseList/courseList',
        })

    },
    // 我的试卷
    myExam(e) {
        console.log(e)
        let url = '/pages/myExam/myExam?type=' + e.currentTarget.dataset.type;
        wx.navigateTo({
            url
        })
    },
    // 我的资料
    myJournal() {
        wx.navigateTo({
            url: '/pages/journal/listMyJournal/listMyJournal',
        })
    },
    // 跳转至我原创的学习资料 || 我收藏的学习资料
    myStudyMaterial(e) {
        let name = e.currentTarget.dataset.name;
        wx.navigateTo({
            url: '/pages/myStudyMaterial/myStudyMaterial?name=' + name,
        })
    },
    // 跳转至我的学习任务 || 我下发的学习任务
    myTask(e) {
        let name = e.currentTarget.dataset.name;
        wx.navigateTo({
            url: '/pages/myTask/myTask?name=' + name,
        })
    },
    // 获取气泡数
    getMeNum() {
        let self = this;
        app.newRequest({
            modelData: {},
            url:'mini/user/menumpost',
            isPhpSessid:true,
            fn1(res){
                if (app.compareVersion(app.globalData.version, '1.9.0') >= 0 && res.meNum > 0) {
                    wx.setTabBarBadge({
                        index: 4,
                        text: '' + res.meNum
                    })
                }
                self.setData({
                    // 我下发且正在进行中的任务数目
                    distributedTaskProgressNum: res.distributedTaskProgressNum,
                    // 我参加的学习任务数目
                    joinedTaskProgressAndNotPassNum: res.joinedTaskProgressAndNotPassNum,
                    // 未完成考卷数目
                    paperUnfinishNum: res.paperUnfinishNum,
                }) 
            }
        })       
    },
    stopBubble: function () {}
})