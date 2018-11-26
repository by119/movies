import { Component } from '@angular/core';
import {Validators, FormBuilder } from '@angular/forms';
import {  IonicPage } from 'ionic-angular';
import { CommonProvider } from '../../providers/common/common';

declare var sharesdk: any;
declare var ShareSDK: any;
declare var GetAjaxRequest: any;
declare var JPush: any;

@IonicPage({
  priority: 'off',
  name : 'login',
  defaultHistory : ['home']
})
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  wechatInstalled=0;
  pageForm=this.formBuilder.group({tel:[this.cp.global.tel,[Validators.required,Validators.pattern('^[1][3,4,5,7,8][0-9]{9}$')]],pwd:["",[Validators.required,Validators.minLength(6)]]});

  constructor(public formBuilder:FormBuilder, public cp: CommonProvider) {
  }

  ionViewDidEnter(){
    if(this.cp.plt.is("cordova"))
      this.cp.styleLightContent();
  }
  ionViewWillEnter(){
    this.cp.init().then(()=>{
    if(this.cp.u.id)
      this.cp.pop()
    else
      this.cp.plt.is("cordova")&&sharesdk.isInstallClient.promise(ShareSDK.ClientType.Wechat).then(e=>{e&&(this.wechatInstalled=1)})
    })
  }
  ionViewWillLeave(){
    this.cp.temp.reopen_pocket = this.cp.u.id ? 0 : 1;
  }
  
  reg(){this.cp.plt.is("cordova") && this.wechatInstalled?this.cp.toast("请直接使用微信登录"):this.cp.goto({view:"reg"})}
  
  findpwd(){this.cp.goto({view:"findpwd"})}
  
  wechatLogin(){
    if(!this.wechatInstalled) return this.cp.toast("未检测到微信客户端，请使用账号密码登录");
    
    this.cp.plt.is("cordova") ? (this.cp.plt.is("android") && this.cp.toast("即将登录"), GetAjaxRequest.login((e:any) => {
        e.state = this.cp.global.auth,
        this.cp.toast("正在登录"),
        this.cp.getData("user/wechatLoginApp", e).then(n => {
            this.handle(n);
        })
    }, (err:any)=>{ this.cp.toast(err.errmsg)})) : this.cp.toast("请在APP内使用微信一键登录")
  }
  
  sub(t){
    if(this.cp.plt.is('cordova'))
      t.app = 1;
    this.cp.getData("user/login", t).then(n => {
        this.handle(n);
    })
  }

  handle(n){
    if(n.status){
      this.cp.toast(n.msg),
      localStorage.setItem('uid',n.data.id),
      this.cp.setU(n.data),
      this.cp.temp.pop = 0,
      // this.cp.temp.index_time=0,
      this.cp.global.tel = n.data.tel,
      this.cp.plt.is("cordova") && (JPush.setTags({ sequence: n.data.id, tags: ["has_account"] })),
      // this.cp.toast('正在加载账户设置'),
      // this.cp.getData('user_setting/getlist').then((e:any)=>{
      //   this.cp.setSettings(e.data[0]),
      //   this.cp.toast('设置加载完成'),
        this.cp.pop()
      // })
    }
      else if(n.msg == "登录成功"){
        this.cp.goto({view:'tabs/tab1/home'})

    }else
      this.cp.toast(n.msg)
  }
}
