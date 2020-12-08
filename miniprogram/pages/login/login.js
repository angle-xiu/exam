const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    logged:false,
    takeSession:false,
    requestResult:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getSetting({
      success: res =>{
        // 授权则不再跳出弹窗
        if(res.authSetting['scope.userInfo']){
          wx.getUserInfo({
            success : res => {
              app.globalData.userInfo = res.userInfo;
            }
          })
        }
      }
    })
  },
  //获取用户信息
  onGetUserInfo: function(e) {
    if(!this.data.logged&&this.data.userInfo){
      this.setData({
        logged:true,
        avatarUrl:e.detail.userInfo.avatarUrl,
        userInfo:e.detail.userInfo
      });
      app.globalData.userInfo = e.detail.userInfo;
      wx.reLaunch({
        url: '/pages/taskList/taskList',
      })
    }
  } ,
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})