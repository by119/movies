import {Component} from '@angular/core';
import {IonicPage, NavParams} from 'ionic-angular';
import {CommonProvider} from '../../providers/common/common';
import {Validators, FormBuilder, FormGroup} from '@angular/forms';

@IonicPage({
  priority: 'off',
  name: 'reg'
})
@Component({
  selector: 'page-reg',
  templateUrl: 'reg.html',
})
export class RegPage {
  pageForm = this.formBuilder.group({
    tel : ["", [Validators.required, Validators.pattern('^[1][3,4,5,7,8][0-9]{9}$')]],
    pwd: ["", [Validators.required, Validators.minLength(6)]],
    confirm_pwd: ["", [Validators.required, Validators.minLength(6)]],
    captcha: ["", [Validators.required, Validators.minLength(4)]],
    auth: [this.cp.global.auth]
  }, {validator: this.matchingPasswords('pwd', 'confirm_pwd')});

  matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
    return (group: FormGroup): { [key: string]: any } => {
      let pwd = group.controls[passwordKey];
      let confirmPassword = group.controls[confirmPasswordKey];

      if (pwd.value !== confirmPassword.value) {
        return {
          mismatchedPasswords: true
        };
      }
    }
  }

  constructor(public navParams: NavParams,
              public formBuilder: FormBuilder,
              public cp: CommonProvider) {
  }

  ionViewDidEnter() {
    if (this.cp.plt.is("cordova"))
      this.cp.styleLightContent();
  }

  // captcha(t) {
  //   var u = typeof u == 'undefined' ? 0 : u;
  //   if (!u) {
  //     var n, i = this.pageForm.controls.mobile;
  //     if (!i.valid) return void this.cp.toast("手机号填写错误");
  //     n = i.value,
  //       u = 60;
  //     var r = setInterval(() => {
  //         u--,
  //           0 == u ? (t.target.innerText = "重新发送", clearInterval(r)) : t.target.innerText = "重新发送(" + u + ")"
  //       },
  //       1000);
  //     this.cp.getData('?m=user&c=login&a=send_sms_new',{H5API:!0,mobile:n,type:'register'}).then((res:any)=>{
  //       this.cp.toast(res.content)
  //       console.log(res);
  //     })
  //   }
  // }

  captcha(t){
    var u=typeof u == 'undefined'?0:u;
    if (!u) {
        var n, i = this.pageForm.controls.tel;
        if (!i.valid) return void this.cp.toast("手机号填写错误");
        n = i.value,
        u = 60;
        var r = setInterval(() => {
            u--,
            0 == u ? (t.target.innerText = "重新发送", clearInterval(r)) : t.target.innerText = "重新发送(" + u + ")"
        },
        1000);
        this.cp.getData("captcha/index", {
            type: "register",
            tel: n
        }).then((n: any) => {
            this.cp.toast(n.msg),
            n.status || (u = 1)
        })
    }
  }

  sub(t){
    // console.log(this.pageForm.captcha)
    console.log(t)
      this.cp.getDataInfo("user/reg",t).then((n:any) => {
        if(n.status == "1"){
          // this.cp.pop();
          // this.cp.goto({view:'home'})
          this.cp.gotoRoot();
        }
        console.log(n)
      })
  }

  // sub(t) {
  //   t.H5API = !0;
  //   t.enabled_sms  =  -1;
  //   this.cp.getData("?m=user&c=login&a=register", t).then((res: any) => {
  //     let {info,status} = res;
  //     console.log(res);
  //     if(status=='n'){
  //       this.cp.toast(info)
  //     }else{
  //       console.log('注册成功！！！');
  //     }
  //   })
  // }

  /*登录*/
  login(){
    let {tel,pwd} = this.pageForm.value;
    let t:any = {username:tel, pwd};
    if (this.cp.plt.is('cordova'))
      t.app = 1;
    t.H5API = true;
    this.cp.getData("?m=user&c=login", t).then(n => {
      this.handle(n);
    })
  }
  /*处理token*/
  handle(n) {
    let {
      info,status,token,url
    } = n;
    this.cp.toast(info);
    if (status == 'y') {
      console.log('登录成功');
      this.cp.setGlobal({token});
      this.getUserInfo();
    } else{
      console.log('登录失败');
    }
  }
  /*获取用户数据*/
  getUserInfo(){
    this.cp.getData('user',{per_page:'10',page:'1',list:''}).then((res:any)=>{
      let {code,data} = res;
      if(code == 0){
        this.cp.setU(data.userInfo);
        this.cp.global.tel = data.userInfo.mobile_phone
        this.cp.pop();
      }
    })
  }
}
