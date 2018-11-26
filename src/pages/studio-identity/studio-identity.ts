import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CommonProvider } from "../../providers/common/common";
/**
 * Generated class for the StudioIdentityPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name:'studio-identity'
})
@Component({
  selector: 'page-studio-identity',
  templateUrl: 'studio-identity.html',
})
export class StudioIdentityPage {
  editBtnTxt = '确认提交';
  // 执照
  cardzPhotos = "";
  cardzElem: any;
  cardzformElem: any;
  isShowImg = false;
  // 头像
  cardPhotos = "";
  cardElem: any;
  cardformElem: any;
  isAShowImg = false;
  studio_title = "";      //制片厂名称
  studio_name = "";       //联系人
  studio_phone = "";     //联系人电话
  studio_address = "";   //制片厂地址
  studio_content = "";   //制片厂介绍
  @ViewChild('form2') form2;
  @ViewChild('form3') form3;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public cp:CommonProvider
  ) {
  }
  ionViewDidEnter() {
    this.editBtnTxt = this.navParams.get('lastpage')=='work'?'确认提交成为制片厂':'确认提交';
  }
  ionViewDidLoad() {
    this.cardzformElem = this.form2.nativeElement;
    this.cardzElem = this.cardzformElem.firstElementChild;
    this.cardformElem = this.form3.nativeElement;
    this.cardElem = this.cardformElem.firstElementChild;
    this.cp.getData("producer/getInfo", {}).then((res: any) => {
      if(res.code==0){
          var data = res.data.producer;
          this.studio_title = data.company_name;
          this.studio_name = data.contact_name;
          this.studio_phone = data.contact_tel;
          this.studio_address = data.contact_address;
          this.cardzPhotos = data.company_license;
          this.cardPhotos = data.avatar;
          this.studio_content = data.introduction;
          if (this.cardzPhotos == "") {
            this.isShowImg = false;
          } else {
            this.isShowImg = true;
          }
          if (this.cardPhotos == "") {
            this.isAShowImg = false;
          } else {
            this.isAShowImg = true;
          }
      }
    });
  }

  // 上传公司执照
  cardzaddImg() {
    this.cardzElem.click()
  }
  cardzuploadImg() {
    this.cp.getData('upload/index', new FormData(this.cardzformElem)).then((result: any) => {
      if (result.code != 0) {
        this.cp.toast(result.msg.indexOf('大小不符') > 0 ? '图片需小于5M' : result.msg);
      } else {
        this.cardzPhotos = this.cp.SITE_URL + result.data.name;
      }
      if (result.code == 0) {
        this.isShowImg = true;
      }
    });
    this.cardzElem.value = '';
  }
  // 上传公司logo
  cardaddImg() {
    this.cardElem.click()
  }
  carduploadImg() {
    this.cp.getData('upload/index', new FormData(this.cardformElem)).then((result: any) => {
      if (result.code != 0) {
        this.cp.toast(result.msg.indexOf('大小不符') > 0 ? '图片需小于5M' : result.msg);
      } else {
        this.cardPhotos = this.cp.SITE_URL + result.data.name;
      }
      if (result.code == 0) {
        this.isAShowImg = true;
      }
    });
    this.cardElem.value = '';
  }

  studioClick(){
    if(this.studio_title == ""){
      this.cp.toast("请输入制片厂名称");
      return false;
    }else if(this.studio_name == ""){
      this.cp.toast("请输入联系人");
      return false;
    } else if(this.studio_phone == ""){
      this.cp.toast("请输入联系人电话");
      return false;
    }else if(this.studio_address == ""){
      this.cp.toast("请输入制片厂地址");
      return false;
    }else if(this.cardzPhotos == ""){
      this.cp.toast("请上传公司执照");
      return false;
    }else if(this.cardPhotos == ""){
      this.cp.toast("请上传公司logo");
      return false;
    }else if(this.studio_content == ""){
      this.cp.toast("请输入制片厂介绍");
      return false;
    }else{
      this.cp.getData("producer/authenticate",{
        id: this.cp.u.id,
        company_name: this.studio_title,
        contact_name: this.studio_name,
        contact_tel: this.studio_phone,
        contact_address: this.studio_address,
        company_license: this.cardzPhotos,
        avatar: this.cardPhotos,
        introduction: this.studio_content
      }).then((res:any) => {
        if(res.code == 0){
          this.cp.setU({name: this.studio_title});
          this.cp.setU({avatar: this.cardPhotos});
          this.cp.setU({type: 1}); // 0:普通用户   1：制片人   2：艺人
          this.cp.toast("认证成功！");
          this.cp.gotoRoot();
        }
      })
    }
    
  }

}
