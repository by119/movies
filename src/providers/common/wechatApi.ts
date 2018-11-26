import { Injectable } from '@angular/core';
import { CommonProvider } from '../../providers/common/common';

declare var wx: any;
declare var firstUrl: any;

@Injectable()
export class WechatApi {
  constructor(public cp: CommonProvider) { }
  
  register(params){
    params.silent = 1;
    params.message = params.message ? params.message : this.cp.SHARE_TEXT;
    params.link = params.url ? params.url : location.href;
    params.url = this.cp.plt.is('ios') ? firstUrl : location.href; //url 用来签名 必须为当前网址 
    params.DGAPI = 1;
    this.cp.getData("wechat/config", params).then((data:any)=>{
        data.debug = false;
        data.link = params.link;
        data.jsApiList = [  
            "onMenuShareTimeline",  
            "onMenuShareAppMessage",  
            "onMenuShareQQ",  
            "onMenuShareWeibo",
            "onMenuShareQZone"
        ];
        wx.config(data); 
        wx.ready(function () { 
            wx.onMenuShareTimeline(data); 
            wx.onMenuShareAppMessage(data);
            wx.onMenuShareQQ(data);
            wx.onMenuShareWeibo(data);
            wx.onMenuShareQZone(data);     
        });
    })
  }
}
