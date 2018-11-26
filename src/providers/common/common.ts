import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';
import { LoadingController, ToastController, AlertController, PopoverController, ModalController, App } from 'ionic-angular';
import { Platform,ActionSheetController } from 'ionic-angular';
import { Toast } from '@ionic-native/toast';
// import * as ClipboardJs from 'clipboard';
// import { Clipboard } from '@ionic-native/clipboard';
import { StatusBar } from '@ionic-native/status-bar';
import { PhotoLibrary } from '@ionic-native/photo-library';
// import { SocialSharing } from '@ionic-native/social-sharing';
import { Storage } from '@ionic/storage';
import { DomSanitizer } from '@angular/platform-browser';
import { AppAvailability } from '@ionic-native/app-availability';

declare var sharesdk: any;
declare var ShareSDK: any;
declare var lyxpay: any;
declare var GetAjaxRequest : any;
declare var JPush: any;

@Injectable()
export class CommonProvider {
  WWW_URL = "http://www.sqbapp.com/";
  SITE_URL = "https://yiren.fengsh.cn/";
  BASE_URL = this.SITE_URL + "api/";
  APP_NAME = "艺人";
  SHARE_TEXT = "分享文字（待编辑）";
  DOWNLOAD_URL="http://a.app.qq.com/o/simple.jsp?pkgname=com.jianshi.shengqianbao";
  DOWNLOAD_ANDROID_URL=this.WWW_URL+"sqb.apk";
  APP_STORE_ID = "1437475742";
  DOWNLOAD_IOS_URL = "https://itunes.apple.com/us/app/" + encodeURIComponent(this.APP_NAME) + "/id" + this.APP_STORE_ID + "?l=zh&ls=1&mt=8";

  // shareOpt;
  // sharePlatform;
  initialized = 0;
  u:any={};
  settings:any={};
  global:any={};

  // statusBarColor 0 黑 1 白
  temp:any={checking_update:1,loadingCount:0,statusBarColor:1,logining:0,loading:null};
  navCtrl;

  // browserButtons: any = {
  //   backButton: {
  //     wwwImage: 'assets/img/back.png',
  //     wwwImagePressed: 'assets/img/back.png',
  //     wwwImageDensity: 3,
  //     align: 'left',
  //   },
  //   closeButton: {
  //     wwwImage: 'assets/img/close.png',
  //     wwwImagePressed: 'assets/img/close.png',
  //     wwwImageDensity: 3,
  //     align: 'left',
  //   },
  //   menu: {
  //     wwwImage: 'assets/img/eclipsis.png',
  //     wwwImagePressed: 'assets/img/eclipsis.png',
  //     wwwImageDensity: 3,
  //     title: '菜单',
  //     cancel: '取消',
  //     align: 'right',
  //     items: [
  //         {
  //             event: 'setAutoLogin',
  //             label: '设置自动登陆'
  //         }
  //     ]
  //   },
  // };
  // browser: ThemeableBrowserObject;
  // browserOptions: any = {
  //    toolbar: {
  //      height: 44,
  //      color: '#ffffffff'
  //    },
  //    title: {
  //      staticText: this.APP_NAME
  //    },
  //    hardwareback : false,
  //    backButtonCanClose : true,
  //    hidden : false,
  //    keyboarddisplayrequiresuseraction: false
  // };

  // options: StreamingVideoOptions = {
  //   successCallback: () => {  },
  //   errorCallback: (e) => { this.toast('播放出错') },
  //   orientation: 'portrait'
  // };

  constructor( public http: Http,public loadingCtrl: LoadingController,public toastCtrl: ToastController,public plt: Platform,public actionsheetCtrl: ActionSheetController,public alertCtrl: AlertController,public popoverCtrl: PopoverController,public modalCtrl:ModalController,public xToast: Toast/*, public themeableBrowser: ThemeableBrowser*/, public statusBar: StatusBar,public photoLibrary: PhotoLibrary,/*public socialSharing: SocialSharing,public clipboard: Clipboard, */public storage: Storage, public appCtrl: App, public appAvailability: AppAvailability ) {
    var t = this.getQueryString("code"), i = this.getQueryString("state");
    if(t)
      this.temp.logining = 1,
      this.getData("user/wechatLogin", {
          code: t,
          state: i
      }).then((i:any) => {
        this.temp.logining = 0, this.load(),
        i.status ?
          ( this.toast(i.msg), localStorage.setItem('uid',i.data.id), this.setU(i.data) ) :
        this.toast(i.msg)
      })
    else
      this.load()

    if(plt.is('cordova')){
      // 删除app.html下的下载元素
      setTimeout(()=>{
        document.getElementById("dl").remove();
      },300);
      // this.sharePlatform={qq:ShareSDK.PlatformType.QQFriend,qzone:ShareSDK.PlatformType.QZone,timeline:ShareSDK.PlatformType.WechatTimeline,wechat:ShareSDK.PlatformType.WechatSession,weibo:ShareSDK.PlatformType.SinaWeibo}
    }else
      setTimeout(()=>{
        document.getElementById("dl") && document.getElementById("dl").addEventListener("click",()=>{
          this.goto({view:'download',no_msg:1})
        })
      },300);
  }

  load(){
    this.storage.get("settings").then(settings=>{
      this.settings = settings || {};
    })
    this.storage.get("global").then(global=>{
      this.global = global || {};
      this.temp.reopen_pocket = 0;

      this.storage.get("user").then(u=>{
        if(!u)
          this.setU({})
        else
          this.u = u

        if(this.plt.is("cordova")){
          JPush.init();
          JPush.setDebugMode(false);
          var setBadge = (number) => {
            JPush.setApplicationIconBadgeNumber(number);
            JPush.setBadge(number);
          }
          let t = setInterval(() => {
              JPush.getRegistrationID(r => {
                try {
                  if(r.length > 0){
                    setBadge(0), clearInterval(t), t = setInterval(() => {
                      if(this.u.id){
                        clearInterval(t);
                        this.getData("user/pushReg", {
                          id: this.u.id,
                          registrationID: r,
                          platform: this.plt.is("ios") ? 1 : 0,
                          silent : 1
                        })
                      }
                    },1000)
                  }
                } catch(t) {}
              })
          },
          1e3);
          document.addEventListener("jpush.openNotification",
          (t:any) => {
              this.plt.is("android") ? this.goto(t.extras) : this.goto(t)
          },
          !1)
          document.addEventListener("jpush.receiveNotification",
          (t:any) => {
              var e;
              this.plt.is("android") ? (e = t.extras, e.msg = t.alert) : (e = t, e.msg = t.aps.alert), e.modal ? this.goto(e) : this.promptNotification(e)
          },
          !1)
//          document.addEventListener("jpush.receiveMessage",
//          (t:any) => {
//              var e = t.extras;
//              this.plt.is("android") ? e.msg = t.message: e.msg = t.content,
//              this.promptNotification(e)
//          },
//          !1)
        }
        this.initialized = 1; //放到common的最后 表示 common 已经初始化完成了
      })
      
      // this.temp.copySupported = this.copyCheck()
    })
  }

  init(){
    return new Promise((resolve, reject) => {
      if(this.initialized) resolve()
      else{
        let timer = setInterval(()=>{
          this.initialized && (clearInterval(timer),resolve())
        },100);
      }
    });
  }

  getData(url, data:any={}) {
    if(this.u.id)
      Object.assign(data,{user_id:this.u.id,sign:this.u.sign});

    if(data.silent)
      delete data.silent;
    else{
      this.temp.loadingCount ++;
      if(this.temp.loadingCount == 1){
        this.temp.loading = this.loadingCtrl.create({
          spinner: "dots",
          content: "",
          duration: 6000
        });
        this.temp.loading.present();
      }
    }
    return new Promise((resolve, reject) => {
        this.http.post((url.indexOf('http') === 0 ? '' : this.BASE_URL) + url, data).timeout(6000).map(t => {
          if(this.temp.loadingCount){
            this.temp.loadingCount --;
            if(!this.temp.loadingCount)
              this.temp.loading.dismiss();
          }
          return t.json();
        }).subscribe(t => {
          resolve(t);
        },
        err => {
          if(this.temp.loadingCount){
            this.temp.loadingCount --;
            if(!this.temp.loadingCount)
              this.temp.loading.dismiss();
          }
        })
    })
  }

  // 不带userId和sign
  getDataInfo(url, data:any={}) {
    // if(this.u.id)
    //   Object.assign(data,{user_id:this.u.id,sign:this.u.sign});

    if(data.silent)
      delete data.silent;
    else{
      this.temp.loadingCount ++;
      if(this.temp.loadingCount == 1){
        this.temp.loading = this.loadingCtrl.create({
          spinner: "dots",
          content: "",
          duration: 6000
        });
        this.temp.loading.present();
      }
    }
    return new Promise((resolve, reject) => {
        this.http.post((url.indexOf('http') === 0 ? '' : this.BASE_URL) + url, data).timeout(6000).map(t => {
          if(this.temp.loadingCount){
            this.temp.loadingCount --;
            if(!this.temp.loadingCount)
              this.temp.loading.dismiss();
          }
          return t.json();
        }).subscribe(t => {
          resolve(t);
        },
        err => {
          if(this.temp.loadingCount){
            this.temp.loadingCount --;
            if(!this.temp.loadingCount)
              this.temp.loading.dismiss();
          }
        })
    })
  }


  styleDefault(set=1){
    if(set){
      if(!this.temp.statusBarColor) return;
      this.temp.statusBarColor = 0;
    }
    this.statusBar.styleDefault();
  }
  styleLightContent(set=1){
    if(set){
      if(this.temp.statusBarColor) return;
      this.temp.statusBarColor = 1;
    }
    this.statusBar.styleLightContent();
  }

  // setSettings(settings={}){
  //   return new Promise((resolve, reject) => {
  //     Object.assign(this.settings,settings);
  //     this.storage.set("settings",this.settings);
  //     if(this.u.id){
  //       this.getData('user_setting/update',Object.assign({silent:1},this.settings)).then(e=>{
  //         resolve(e);
  //       })
  //     }else
  //       resolve();
  //   })
  // }
  setGlobal(global={}){
    Object.assign(this.global,global);
    this.storage.set("global",this.global);
  }
  setU(u=null){ //{} 清空     不传参数 也就是 n会等于null this.u维持不变 直接storage.set
    if(JSON.stringify(u) == "{}")  //对象是指针  所以不能用 ==/=== 判断
      this.u = u;
    else if(u)
      Object.assign(this.u,u);

    this.storage.set("user",this.u);
  }

  toast(t){return this.toastPosition(t,"middle")}
  toastPosition(t,e){return this.toastPositionDuration(t,e,3e3)}
  toastPositionDuration(t,e,n){var i=this;return new Promise((r,s)=>{var tt=i.toastCtrl.create({message:t,duration:n,position:e});tt.onDidDismiss(()=>{r()}),tt.present()})}
  nativeToast(t){this.nativeToastDuration(t,"5000")}
  nativeToastDuration(t,time){this.xToast.show(t,time,"center").subscribe(t=>{}) /*需要加上subscribe不然ios下不显示*/}

  getQueryString(t){return this.getUrlParam(t,window.location.search.substr(1))}
  getUrlParam(t,e){var n=new RegExp("(^|&|\\?)"+t+"=([^&]*)(&|$)","i"),i=e.match(n);return null!=i?decodeURIComponent(i[2]):null}

  // copyCheck(){
  //   if(this.plt.is("cordova"))
  //     return true;
  //   else if(ClipboardJs.isSupported()){
  //     let cb = new ClipboardJs('.copy');
  //     cb.on('success', function(e){
  //         e.clearSelection();
  //     });
  //     return true;
  //   }
  // }
  // copy(t){this.copyBothTip(t,"复制成功","复制失败")}
  // copySucTip(t,e){this.copyBothTip(t,e,"复制失败")}
  // copyBothTip(t,e,n){
  //   this.plt.is("cordova") ?
  //     this.clipboard.copy(t).then(()=>{this.toast(e)},()=>{this.toast(n)}) :
  //   this.temp.copySupported ? (document.getElementById("copyTarget").innerText = t, this.toast(e)) : this.toast(n)
  // }
  
  isWechat() {
    return navigator.userAgent.toLowerCase().match(/MicroMessenger/i) + "" == "micromessenger"
  }
  hasClass(t, e) {
      return t.className.match(new RegExp("(\\s|^)" + e + "(\\s|$)"))
  }
  addClass(t, e) {
      this.hasClass(t, e) || (t.className += " " + e)
  }
  removeClass(t, e) {
      if (this.hasClass(t, e)) {
          var n = new RegExp("(\\s|^)" + e + "(\\s|$)");
          t.className = t.className.replace(n, "")
      }
  }
  toggleClass(t, e) {
      this.hasClass(t, e) ? this.removeClass(t, e) : this.addClass(t, e)
  }


  // 记录buy_page_url  因为在微信内地址不会变 所以用window.location获取到的不对
  // t 参数 e 回调
  buy(t, e, buy_page_url) {
    t.buy_page_url = buy_page_url;
    t.callback = e;
    t.view = 'pay';
    this.goto(t);
  }
  actionsheet(title,btns){
      var i = this.actionsheetCtrl.create({
          title: title,
          cssClass: "action-sheets-basic-page",
          buttons: btns
      });
      i.present()
  }
  pay(t, e, fail=null) {
    if(this.plt.is('cordova')){
      this.getData("tradelist/add", t).then((i:any) => {
        if(i.status == 2){ //余额/优惠码 全额付款成功
          this.u.money = (this.u.money - i.data).toFixed(2);
          e();
        }else if (i.status) {
          lyxpay.pay(t.type, t.type == 1 && this.plt.is("android") ? JSON.stringify(i.data) : i.data, {
              success: () => { e() },
              failure: (t) => {
                //支付宝的错误码
                if(8000 == t || 6004 == t)
                  this.toast('支付结果确认中'),this.getData("tradelist/check", {id: i.msg}).then((i:any) => {
                    i.msg ? e() : fail ? fail() : this.toast("支付失败")
                  })
                else
                  fail ? fail() : this.toast("支付失败")
              }
          })
        } else {
          if(i.msg == '余额不足')
            this.u.money = i.data;
          this.toast(i.msg)
        }
      })
    }else if(this.isWechat()){
      this.toast("正在生成支付信息");
      this.getData("tradelist/add", t).then((i:any) => {
        if("please bind wechat first" == i.msg)
          window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx5ead4b1c3b371c37&redirect_uri=" + encodeURIComponent('http://m.sheng365.cn/?btn_click=1#'+t.buy_page_url) + "&response_type=code&state=&scope=snsapi_base#wechat_redirect"
        else if(i.status == 2) //余额/优惠码 全额付款成功
          this.u.money = (this.u.money - i.data).toFixed(2), e();
        else if(1 == i.status)
          window['WeixinJSBridge'].invoke("getBrandWCPayRequest", i.data, (t) => {
            "get_brand_wcpay_request:ok" == t.err_msg ? e() : this.toast("支付失败")
          })
        else
          this.toast(i.msg)
      })
    }else{
      if(t['money'] + t['promo_code_amount'] + 0.0001 > t['amount']){
        this.getData("tradelist/add", t).then((i:any) => {
          if(i.status == 2) //余额/优惠码 全额付款成功
            this.u.money = (this.u.money - i.data).toFixed(2), e();
          else if(1 == i.status){}
          else
            this.toast(i.msg)
        })
      }else
        this.toast("非余额全额付款，请在微信或APP内进行支付操作")
    }
  }

  // getShareUrl(url:any=''){
  //   let timestamp = new Date(new Date().toLocaleDateString()).getTime()/1000, share_url:any = "";

  //   url = url.split("#");

  //   // #前面部分
  //   share_url = url[0];
  //   share_url = share_url.split("?");
  //   share_url = share_url[0] + "?u="+this.u.auth + "&_t=" + timestamp + (share_url[1] ? "&" + share_url[1] : "");

  //   if(share_url.indexOf("http") !== 0)
  //     share_url = this.SITE_URL + share_url;
  //   // #后面部分
  //   if(url[1])
  //     share_url += "#" + url[1];
  //   return share_url;
  // }
  // share(t){
  //   return new Promise((resolve, reject) => {
  //     var e=this.popoverCtrl.create("share",t.type=='url'?{hideSave:1}:{},{cssClass:'share-container'});
  //     e.onDidDismiss(data => {
  //      resolve();
  //     });
  //     e.present(),this.shareOpt=t;
  //   })
  // }
  // shareToOpt(opt,t){
  //   this.shareOpt=opt, this.shareTo(t)
  // }
  // shareTo(t) {
  //   var packageName, clientType, appName, opt:any=this.shareOpt;
  //   if(typeof opt.pic == 'object' && opt.pic.length == 1)
  //     opt.pic = opt.pic[0];
    
  //   if(t == 'weibo' && opt.type == 'url') //微博不能直接分享网页链接出去 改成加到内容中的普通分享
  //     delete opt.type, opt.pic = opt.weiboPic, delete opt.weiboPic
  //   if(opt.type == 'url')
  //     delete opt.type
  //   else if(opt.url && typeof opt.pic != 'object')
  //     opt.message += "\r\n" + opt.url, delete opt.url;


  //   var isIos11 = !1;
  //   if(t!='weibo' && t!='save'){
  //     // ios 11 下 原生分享到微信、朋友圈等报错 —— but remote VC failed, dismissing
  //     // 微博可以 通过sdk直接支持多图
  //     isIos11 = this.plt.versions().ios && this.plt.versions().ios.major >= 11;
  //     if(isIos11 && typeof opt.pic == 'object')
  //       return setTimeout(()=>{this.toastPositionDuration('多图分享模式','top',3000)},1000), this.socialSharing.share(opt.message, opt.message, opt.pic/*, opt.url*/);
  //   }
  //   switch (t) {
  //     case "qzone":
  //         //QQ空间APP不支持分享链接  当分享链接到QQ空间时 采用通过QQ分享到空间的方式
  //         if( opt.url || isIos11 ){
  //           t = "qq";
  //           clientType=ShareSDK.ClientType.QQ;
  //           appName = 'QQ'
  //         }else{
  //           packageName = this.plt.is("ios")?"com.tencent.mqq.ShareExtension":"com.qzone";
  //           appName = 'QQ空间';
  //         }
  //         break;
  //     case "qq":
  //         if( opt.url || isIos11 )
  //           clientType = ShareSDK.ClientType.QQ;
  //         else
  //           packageName = this.plt.is("ios")?"com.tencent.mqq.ShareExtension":"com.tencent.mobileqq";
  //         appName = 'QQ';
  //         break;
  //     case "wechat":
  //         //android 单图 分享到微信  显示的是文件 而不是 图片  所以采用 shareSDK 的方式
  //         if( opt.url || ( typeof opt.pic != 'object' && this.plt.is("android") ) || isIos11 )
  //           clientType = ShareSDK.ClientType.Wechat;
  //         else
  //           packageName = this.plt.is("ios")?"com.tencent.xin.sharetimeline":"com.tencent.mm";
  //         appName = '微信';
  //         break;
  //     case "timeline":
  //         if( opt.url || isIos11 )
  //           clientType = ShareSDK.ClientType.Wechat;
  //         else
  //           packageName =  this.plt.is("ios")?"com.tencent.xin.sharetimeline":"com.tencent.mm/com.tencent.mm.ui.tools.ShareToTimeLineUI";
  //         appName = '微信';
  //         break;
  //     case "weibo":
  //         if(opt.url || this.plt.is("ios"))
  //           clientType = ShareSDK.ClientType.SinaWeibo;
  //         else
  //           //com.sina.weibo.ShareExtension 就是不出来分享图片 分享不了
  //           //com.apple.social.sinaweibo、com.apple.share.SinaWeibo.post 官方的、要在系统设置里面设置账户
  //           packageName = /*this.plt.is("ios")?"com.sina.weibo.ShareExtension":*/"com.sina.weibo";
  //         appName = '微博';
  //         break;
  //     case "save":
  //         this.toast("保存中");
  //         this.photoLibrary.requestAuthorization().then(() => {
  //           if(typeof this.shareOpt.pic == 'object'){
  //             let saveImg = (key)=>{
  //               setTimeout(()=>{
  //                 this.toast('正在保存第'+(key+1)+'张');
  //                 this.photoLibrary.saveImage(this.shareOpt.pic[key],this.plt.is("ios")?"Camera Roll":this.APP_NAME);
  //               },key*600)
  //             }
  //             for(var i=0,len=this.shareOpt.pic.length;i<len;i++){
  //               //来个setTimeout 直接循环写的话 会出现 write busy 错误
  //               saveImg(i);
  //             }
  //             setTimeout(()=>{
  //               this.toast("保存成功")
  //             },this.shareOpt.pic.length*600)
  //           }else
  //             this.photoLibrary.saveImage(this.shareOpt.pic,this.plt.is("ios")?"Camera Roll":this.APP_NAME), this.toast("保存成功");
  //         }).catch(err => {this.toast("未授权访问相册，保存失败")});
  //       break;
  //   }
  //   if(clientType){
  //     this.toastPositionDuration("即将打开"+appName,"middle",10000);
  //     sharesdk.isInstallClient.promise(clientType).then(n => {
  //         n ?
  //           opt.url ?
  //             sharesdk.share(this.sharePlatform[t], ShareSDK.ShareType.WebPage, {
  //                 icon: opt.pic,
  //                 title: opt.title,
  //                 text: opt.message,
  //                 url: opt.url
  //             },(t) => {this.toast("分享成功")},(t) => {this.toast("分享失败")}) :
  //           sharesdk.share(this.sharePlatform[t], ShareSDK.ShareType.Image, {
  //                   image : opt.pic,
  //                   title: opt.title,
  //                   text: opt.message
  //               },(t) => {this.toast("分享成功")},(t) => {this.toast("分享失败")}) :
  //         this.toast("未安装"+appName)
  //     });
  //   }else if(packageName){
  //     this.toast("即将打开"+appName);
  //     this.socialSharing.canShareVia(packageName).then(() => {
  //       if(t!='weibo' && this.plt.is("ios") && this.temp.statusBarColor)
  //         this.styleDefault(0);
  //       //安卓里面被分享的应用 基本是 singletask 的  会立即执行回调  所以执行成功的回调就不提示了
  //       this.socialSharing.shareVia(packageName, opt.message, opt.message, opt.pic, opt.url).then((t) => {this.plt.is("ios") && this.toast("分享成功"),t!='weibo' && this.plt.is("ios") && this.temp.statusBarColor && this.styleLightContent(0)},(t) => {this.plt.is("ios") && this.toast("分享失败"),t!='weibo' && this.plt.is("ios") && this.temp.statusBarColor && this.styleLightContent(0)})
  //     }).catch(() => {
  //         this.toast("未安装"+appName)
  //     });
  //   }
  //   return true;
  // }

  alert(t){
    const alert = this.alertCtrl.create({
      subTitle: t,
      buttons: ['知道了']
    });
    alert.present();
    return alert;
  }
  promptNotification(t) {
    this.prompt("推送消息",t.msg,"取消",()=>{},"查看",()=>{this.goto(t)});
  }
  //title,message,btn1_text,btn1_callback,btn2_text,btn2_callback
  prompt(t,e,n,i,r,s){
    let p = this.alertCtrl.create({
        title: t,
        message: e,
        enableBackdropDismiss : false,
        buttons: [{
            text: n,
            handler: t => {
              return i()
            }
        },
        {
            text: r,
            handler: t => {
              return s()
            }
        }]
    });
    p.present()
  }

  parseJson(str){
      return new Promise(function(resolve,reject){
          resolve(JSON.parse(str));
      });
  }
  equals(x, y) {
    if (x === y) {
      return true; // if both x and y are null or undefined and exactly the same
    } else if (!(x instanceof Object) || !(y instanceof Object)) {
      return false; // if they are not strictly equal, they both need to be Objects
    } else if (x.constructor !== y.constructor) {
      // they must have the exact same prototype chain, the closest we can do is
      // test their constructor.
      return false;
    } else {
      for (const p in x) {
        if (!x.hasOwnProperty(p)) {
          continue; // other properties were tested using x.constructor === y.constructor
        }
        if (!y.hasOwnProperty(p)) {
          return false; // allows to compare x[ p ] and y[ p ] when set to undefined
        }
        if (x[p] === y[p]) {
          continue; // if they have the same strict value or identity then they are equal
        }
        if (typeof (x[p]) !== 'object') {
          return false; // Numbers, Strings, Functions, Booleans must be strictly equal
        }
        if (!this.equals(x[p], y[p])) {
          return false;
        }
      }
      for (const p in y) {
        if (y.hasOwnProperty(p) && !x.hasOwnProperty(p)) {
          return false;
        }
      }
      return true;
    }
  }

  checkLogin(){
    return new Promise((resolve, reject) => {
      this.init().then(()=>{
        if(this.temp.pop) this.temp.pop=0,this.pop(),resolve(!1)
        else if(!this.u.id) this.temp.pop=1,this.goto({view:"login"}),resolve(!1)
        else resolve(!0)
      })
    })
  }

  gotoRoot(){
    if(!this.navCtrl)
      this.setActiveNavCtrl();

    this.navCtrl.popToRoot()
  }
  
  goto(params,view=''){
    if(view) params.view = view;
    
    if(params.modal)
      this.modalCtrl.create(params.view, params)
    else
      switch(params.view){
        case 'download':
          !params.no_msg && this.toast(params.msg?params.msg:"该功能请在客户端中使用")
          break;
        case"convert":case"center":case"findpwd":case"home":case"login":case"pocketdetail":case"userranking":case"reg":case"footprint":case"bonus":case"money":case"fans":
          //做排除用
          break;
        case"detail":
          params.up=JSON.stringify(params);
          //不加break 以便继续执行到default
        default:
          if(this.plt.is("cordova"))
            this.styleDefault();
      }

    if(!this.navCtrl)
      this.setActiveNavCtrl();

    if(params.view)
      this.temp.dl=1, this.navCtrl.push(params.view,params);
  }
  pop(){
    if(!this.navCtrl)
      this.setActiveNavCtrl();

    this.navCtrl.pop()
  }
  //当切换tab的时候 重新设置下navCtrl 虽然都是设置的getActiveNavs()[0] 实际表示的都是当前tab的navCtrl
  setActiveNavCtrl(navCtrl=null, delay=0){
    if(delay)
      setTimeout(()=>{this.navCtrl = navCtrl?navCtrl:this.appCtrl.getActiveNavs()[0];}, delay);
    else
      this.navCtrl = navCtrl?navCtrl:this.appCtrl.getActiveNavs()[0];
  }

  // resource_type 0 图片 1 视频
  saveResource(resouce,resource_type=0){
    return new Promise((resolve, reject) => {
      this.toast("保存中");
      this.photoLibrary.requestAuthorization().then(() => {
        resource_type ?
          this.photoLibrary.saveVideo(resouce,this.plt.is("ios")?"Camera Roll":this.APP_NAME).then(()=>{
            this.toast("已成功保存到相册"),resolve()
          },()=>{
            this.toast("保存失败，请联系客服"),reject()
          }) :
        this.photoLibrary.saveImage(resouce,this.plt.is("ios")?"Camera Roll":this.APP_NAME).then(()=>{
          this.toast("已成功保存到相册"),resolve()
        },()=>{
          this.toast("保存失败，请联系客服"),reject()
        })
      }).catch(err => {this.toast("未授权访问相册，保存失败")});
    })
  }

  /* 瀑布流公共方法*/
    getNode() {
    let parentNode = document.getElementById("container");
    let childNodeArray: any = parentNode.getElementsByClassName("box");
    let screenWidth = document.documentElement.clientWidth;
    let childWidth = childNodeArray[0].offsetWidth;
    let num = Math.floor(screenWidth / childWidth); //获得一排摆的个数 用Math.floor()转换为整数
    parentNode.style.cssText = "width:" + childWidth * num + "px; margin:0 auto"; //固定container的宽并设置居中
    this.setImagePosition(num, childNodeArray);
  }
  setImagePosition(num, childArray) {
    var imgHeightArray = [];//定义数组用于存放所有图片的高度
    for (var i = 0; i < childArray.length; i++) { //遍历所有图片
      if (i < num) {
        imgHeightArray[i] = childArray[i].offsetHeight; //取得第一排图片的高度
      } else {
        var minHeight = Math.min.apply(null, imgHeightArray); //获取第一排图片中高度最小的图片
        var minIndex = this.getMinHeight(imgHeightArray, minHeight); //函数获得高度最小的图片的位置
        childArray[i].style.position = "absolute"; //绝对定位图片
        childArray[i].style.top = minHeight + "px"; //图片距顶部像素
        childArray[i].style.left = childArray[minIndex].offsetLeft + "px"; //图片距左的像素
        imgHeightArray[minIndex] = imgHeightArray[minIndex] + childArray[i].offsetHeight; //将最低高度的box的高度加上它下方的box高度
      }
    }
  }

  getMinHeight(imgHeightArray, minHeight) {
    for (var i in imgHeightArray) {
      if (imgHeightArray[i] == minHeight) { //循环所有数组的高度 让它等于最小图片的高度 返回i值
        return i;
      }
    }
  }
  /* 瀑布流公共方法*/


  // 退出登录
  logout() {
    return new Promise((resolve, reject) => {
      this.setU({});
      resolve();
    });
  }
  
}
