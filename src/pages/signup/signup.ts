import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CommonProvider } from "../../providers/common/common";
/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name:"signup"
})
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  cardzElem: any;
  cardzformElem: any;
  isShowImg = true;
  cardzPhotos = "";
  cardfPhotos = "";
  intro_title = "";
  allRoleInfo = [];
  role = "";
  @ViewChild('form2') form2;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public cp:CommonProvider
  ) {
  }

   // 上传报名视频
   photoZShow = true;
   cardzaddImg() {
       this.cardzElem.click()
   }
   cardzuploadImg() {
     this.cp.getData('upload/index', new FormData(this.cardzformElem)).then((result: any) => {
       if (result.code != 0){
         this.cp.toast(result.msg.indexOf('大小不符') > 0 ? '图片需小于5M' : result.msg);
       } else {
         this.cardzPhotos = this.cp.SITE_URL + result.data.name;
       }
       if(result.code == 0){
         this.photoZShow = false;
         this.isShowImg = true;
       }
     });
     this.cardzElem.value = '';
   }
   cardzdeleteImg(item) {
     this.cardzPhotos = "";
   }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
    this.allRole();    //所有报名的角色
    this.cardzformElem = this.form2.nativeElement;
    this.cardzElem= this.cardzformElem.firstElementChild;

    if(this.cardzPhotos == ""){
      this.isShowImg = false;
      this.photoZShow = true;
    }else{
      this.isShowImg = true;
      this.photoZShow = false;
    }
  }

  // 所有角色
  allRole(){
    this.cp.getDataInfo("annunciate_roles/getList",{
      annunciate_id:this.navParams.get("id"),
      _paginate:false
    }).then((res:any) => {
      console.log(res,'这是报名的所有角色')
      this.allRoleInfo = res.data;
    })
  }
  // 报名
  signUp(){
    this.cp.getData("areist_delivery_woeks/add",{
      video:this.cardzPhotos,
      intro:this.intro_title,
      annunciate_id:this.navParams.get("id"),
      role_id: this.role
    }).then((res:any) => {
      if(res.code == 0){
        this.cp.pop();
      }
    })
  }

  // 刪除视频
  confirmDelVideo() {    
    this.cp.prompt(
      "删除视频",
      "确认删除视频？",
      "取消",
      () => {},
      "删除",
      () => {
        this.cardzPhotos = "";
      }
    );
  }
}
