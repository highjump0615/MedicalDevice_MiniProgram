// pages/profile/experience/experiences.js
const app = getApp();
var api = require('../../../utils/api.js');

// 加载参数
var gnPageNumber = 1;
var gnPageSize = 10;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    blogs: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getBlogs(true);
  },

  getBlogs: function(isRefresh) {
    var that = this;
    var nPageNumber = gnPageNumber + 1;

    if (isRefresh) {
      nPageNumber = 1;
    }

    // 显示正在加载
    wx.showNavigationBarLoading();
    
    //
    // 提取使用感受
    //
    var paramData = {
      action: 'getExperience',
      '3rd_session': app.globalData.thirdSession,
      pageNumber: nPageNumber,
      pageSize: gnPageSize
    };

    api.postRequest(paramData, 
      function success(res) {
        if (res.data.result < 0) {
          // 失败
          return;
        }

        gnPageNumber = nPageNumber;

        var records = that.data.blogs;
        if (isRefresh) {
          records = [];
        }
        
        for (var i = 0; i < res.data.records.length; i++) {
          records.push(res.data.records[i]);
        }

        // 更新数据
        that.setData({
          blogs: records
        });
      },
      function fail(err) {
      },
      function complete() {
        wx.stopPullDownRefresh();
        // 隐藏正在加载
        wx.hideNavigationBarLoading();
      }
    );
  },

  /**
   * 删除
   */
  onDelete: function (e) {
    var that = this;
    
    wx.showModal({
      title: '删除',
      content: '确认要删除该体验感受吗？',
      confirmColor: '#1AAD19',
      success: function(res) {
        if (res.confirm) {
          that.deleteBlog(e.currentTarget.dataset.index);
        }
      }
    });
  },

  /**
   * 删除指定留言
   */
  deleteBlog: function(index) {
    var that = this;
    var blog = this.data.blogs[index];
  
    var paramData = {
      action: 'deleteExperience',
      '3rd_session': app.globalData.thirdSession,
      experienceid: blog.experienceid
    };

    api.postRequest(paramData, 
      function success(res) {
        if (res.data.result <= 0) {
          // 失败
          return;
        }
        
        // 删除该留言
        that.data.blogs.splice(index, 1);

        // 更新数据
        that.setData({
          blogs: that.data.blogs
        });
      },
      function fail(err) {
      },
      function complete() {
      }
    );
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