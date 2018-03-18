MedicalDevice
======

> Wechat Mini-Program for controlling devices, through [Gizwits](http://www.gizwits.com/)

## Overview

### 1. 主要功能
- 设备管理  
查看附近设备、扫码开机、查看运行状态  
- 其他内容管理  
理疗记录、积分记录、提成、 ...  
- 用户角色  
系统管理员、平台管理员、维修工程师、设备管理员、普通会员  

### 2. 技术内容
微信小程序 ( wxml / wxss / js )  
#### 2.1 UI开发
- 界面实现基于Flexbox的布局

#### 2.2 机智云设备控制
通过[机智云Open API](http://docs.gizwits.com/zh-cn/Cloud/openapi_apps.html)实现设备控制和获取数据
  
##### 2.2.1 流程
匿名登录 -> 绑定设备 -> 控制设备/获取数据

##### 2.2.2 匿名登录
[http://docs.gizwits.com/zh-cn/Cloud/openapi_apps.html#创建用户](http://docs.gizwits.com/zh-cn/Cloud/openapi_apps.html#创建用户)  
```
http://api.gizwits.com/app/users
```  
根据``userid``生成``phone_id``，通过``phone_id``调用此接口获取token和uid

##### 2.2.3 绑定设备
[http://docs.gizwits.com/zh-cn/Cloud/openapi_apps.html#通过-MAC-地址绑定设备](http://docs.gizwits.com/zh-cn/Cloud/openapi_apps.html#通过-MAC-地址绑定设备)  
设备已入网，通过mac地址绑定设备  
```  
http://api.gizwits.com/app/bind_mac
```
  
##### 2.2.4 控制设备
[http://docs.gizwits.com/zh-cn/Cloud/openapi_apps.html#远程控制设备](http://docs.gizwits.com/zh-cn/Cloud/openapi_apps.html#远程控制设备)  
通过云端写入数据点的方式对设备进行控制
```
https://api.gizwits.com/app/control/{did}
```
- 扫码开机  
数据点：``dev_power``  
扫码开机后开始定时获取获取数据的接口

##### 2.2.5 获取数据
通过获取设备最新状态的接口实现获取数据  
```  
https://api.gizwits.com/app/devdata/{did}/latest
```  
[http://docs.gizwits.com/zh-cn/Cloud/openapi_apps.html#获取设备最新状态](http://docs.gizwits.com/zh-cn/Cloud/openapi_apps.html#获取设备最新状态)  
该接口获取的是24小时内，设备最近一次上报的数据点值。  
因此设备端每次更新状态时必须将所有的数据点值上报到云端，以便小程序能及时获取数据。  
- 获取的数据点  
``dev_power``: 电源状态， 获取的值为0，认为设备已关机，停止获取数据而回到首页  
``dev_energy``: 能级  
``dev_work_time``: 剩余时间  

\* 如果使用websocket, 获取数据点值更灵活，不需要设备端上报的过程，不过小程序一律不能使用带端口的网址，因此没法使用websocket

## Need to Improve  
- 添加支付等完善功能
