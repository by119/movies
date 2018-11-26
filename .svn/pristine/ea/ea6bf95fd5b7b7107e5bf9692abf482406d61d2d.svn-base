import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CommonProvider } from "../../providers/common/common";

@IonicPage({
  name:"identity"
})
@Component({
  selector: 'page-identity',
  templateUrl: 'identity.html',
})
export class IdentityPage {
  cardzElem: any;
  cardzformElem: any;
  cardfElem: any;
  cardfformElem: any;
  isShowImg = true;
  isShowvideo = true;
  cardzPhotos = "";
  cardzPhotoArr = [];
  cardfPhotos = "";
  isFanShowImg = true;
  phptoShow = true;
  rolesTitle = "";   //标题
  rolesName = "";    //名称
  rolesText = "";    //内容
  rolesTextArr = [];
  photos = [];   //相关专业证书
  fileElem: any;
  formElem: any;
  videoElem:any;
  videoformElem:any;
  @ViewChild('formVideo') formVideo;
  @ViewChild('form2') form2;
  @ViewChild('form') form;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public cp:CommonProvider
  ) {
  }

  // 相关专业证书
  addImg() {
    if (this.photos.length == 6) {
      this.cp.toast('最多上传6张图片')
    }else
      this.fileElem.click()
  }
  uploadImg() {
    this.cp.getData('upload/index', new FormData(this.formElem)).then((result: any) => {
      if (result.code != 0){
        this.cp.toast(result.msg)
      }else{
        this.photos.push(this.cp.SITE_URL + result.data.name);
      }
      if(this.photos.length>=6){
        this.phptoShow = false;
      }
    });
    this.fileElem.value = '';
  }
  deleteImg(item) {
    item &&
    this.photos.splice(this.photos.indexOf(item), 1);
  }

  // 上传毕业证书
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

  // 上传视频
  videoPhotos = "";
  videoShow = true;
  videoaddImg() {
    this.videoElem.click()
  }
  videouploadImg() {
    this.cp.getData('upload/index', new FormData(this.videoformElem)).then((result: any) => {
      if (result.code != 0){
        this.cp.toast(result.msg.indexOf('大小不符') > 0 ? '图片需小于5M' : result.msg);
      } else {
        this.videoPhotos = this.cp.SITE_URL + result.data.name;
      }
      if(result.code == 0){
        this.videoShow = false;
        this.isShowvideo = true;
      }
    });
    this.videoElem.value = '';
  }
  videodeleteImg(item) {
    this.videoPhotos = "";
  }

  confirmAddRoles() {
    if(this.rolesName==''){
      this.cp.toast('角色姓名不能为空');
      return false;
    }
    if(this.rolesTitle == ""){
      this.cp.toast("角色标题不能为空");
      return false;
    }
    if(this.rolesText==''){
      this.cp.toast('角色介绍不能为空');
      return false;
    }
    this.addRoleInfo = !1;
    let str = { title:this.rolesTitle,role:this.rolesName,intro:this.rolesText };
    this.rolesTextArr.push(str);
    console.log(this.rolesTextArr,'this.rolesTextArr111111')
    this.rolesName = '';
    this.rolesText = '';
    this.rolesTitle = '';
  }
  identityClick(){
    this.cardzPhotoArr = [];
    this.cardzPhotoArr.push(this.cardzPhotos);
    this.cp.getData("User_Profile/add",{
      relevant_pics: this.photos,
      graduation_pics: this.cardzPhotoArr,
      video: this.videoPhotos,
      authentication: 1,
      experience: this.rolesTextArr
    }).then((res:any) => {
      if(res.data.code == 0){
        this.cp.pop();
      }
    })
  }

  // 添加角色的弹窗
  addRoleInfo = false;
  addRole(){
    this.addRoleInfo = !this.addRoleInfo;
  }

  ionViewDidLoad() {
    this.formElem = this.form.nativeElement;
    this.fileElem = this.formElem.firstElementChild;

    this.cardzformElem = this.form2.nativeElement;
    this.cardzElem= this.cardzformElem.firstElementChild;
    
    this.videoformElem = this.formVideo.nativeElement;
    this.videoElem= this.videoformElem.firstElementChild;

    if(this.cardzPhotos == ""){
      this.isShowImg = false;
      this.photoZShow = true;
    }else{
      this.isShowImg = true;
      this.photoZShow = false;
    }
   
    if(this.videoPhotos == ""){
      this.videoShow = true;
      this.isShowvideo = false;
    }else{
      this.videoShow = false;
      this.isShowvideo = true;
    }

   
    if(this.photos.length < 6){
      this.phptoShow = true;
    }

  }

}
