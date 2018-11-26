import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CommonProvider } from "../../providers/common/common";
/**
 * Generated class for the DemandUploadPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage({ name: 'demand-upload' })
@Component({
  selector: 'page-demand-upload',
  templateUrl: 'demand-upload.html',
})
export class DemandUploadPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public cp: CommonProvider
  ) {
  }

  typeList: any = [];
  timeList: any = [];
  typeListSex = [{ id: 0, name: '男' }, { id: 1, name: '女' }];
  name = "";    //剧名
  director = "";   //导演
  myDate = "";    //开机时间
  days = "";      //周期
  outcompany = "";    //出品公司
  zhiCompany = "";    //制品公司
  bianjuteam = "";    //编剧团队
  roleDirector = "";    //选角导演
  roleViceDirector = "";    //演员副导演
  email = "";      //邮箱
  address = "";       //地址
  content = "";    //剧情简介
  subject = "";    //艺人选取题目
  ship = "";     //类型
  rolesTextArr = [];     //角色介绍
  rolesName = "";   //角色姓名
  sex = 0; //角色性别
  rolesText = "";    //添加角色介绍
  place = [];    //地点
  cardzElem: any;
  cardzformElem: any;
  cardfElem: any;
  cardfformElem: any;
  isShowImg = true;
  cardzPhotos = "";
  cardfPhotos = "";
  isFanShowImg = true;
  @ViewChild('form2') form2;
  @ViewChild('form3') form3;
  ionViewDidLoad() {
    this.cardzformElem = this.form2.nativeElement;
    this.cardzElem = this.cardzformElem.firstElementChild;

    this.cardfformElem = this.form3.nativeElement;
    this.cardfElem = this.cardfformElem.firstElementChild;
    this.demandType();      //发布组训的类型

    if (this.cardzPhotos == "") {
      this.isShowImg = false;
      this.photoZShow = true;
    } else {
      this.isShowImg = true;
      this.photoZShow = false;
    }

    if (this.cardfPhotos == "") {
      this.isFanShowImg = false;
      this.photoShow = true;
    } else {
      this.isFanShowImg = true;
      this.photoShow = false;
    }

  }

  // 上传海报
  photoZShow = true;
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
        this.photoZShow = false;
        this.isShowImg = true;
      }
    });
    this.cardzElem.value = '';
  }
  cardzdeleteImg(item) {
    this.cardzPhotos = "";
  }


  // 上传海报封面
  photoShow = true;
  cardfaddImg() {
    this.cardfElem.click()
  }
  cardfuploadImg() {
    this.cp.getData('upload/index', new FormData(this.cardfformElem)).then((result: any) => {
      if (result.code != 0) {
        this.cp.toast(result.msg.indexOf('大小不符') > 0 ? '图片需小于5M' : result.msg);
      } else {
        this.cardfPhotos = this.cp.SITE_URL + result.data.name;
      }
      if (result.code == 0) {
        this.photoShow = false;
        this.isFanShowImg = true;
      }
    });
    this.cardfElem.value = '';
  }
  cardfdeleteImg(item) {
    this.cardfPhotos = "";
  }

  // 添加角色的弹窗
  addRoleInfo = false;
  addRole() {
    this.addRoleInfo = !this.addRoleInfo;
  }
  // 确认添加角色介绍
  confirmAddRoles() {
    if(this.rolesName==''){
      this.cp.toast('角色姓名不能为空');
      return false;
    }
    if(this.rolesText==''){
      this.cp.toast('角色介绍不能为空');
      return false;
    }
    this.addRoleInfo = !1;
    let str = { role_name: this.rolesName, role_sex: this.sex, content: this.rolesText };
    this.rolesTextArr.push(str);
    this.rolesName = '';
    this.sex = 0;
    this.rolesText = '';
  }
  //删除添加的角色 
  confirmDel(i){
    this.cp.prompt("删除角色", "确认删除该角色？", "取消", () => { }, "删除", () => {
      this.rolesTextArr.splice(i,1);      
    })
  }
  // 发布组训类型
  demandType() {
    this.cp.getData("annunciate_type/getList", {
      type: 1
    }).then((res: any) => {
      this.typeList = res.data;
    })
  }

  // 发布组训
  demandUpload() {
    this.cp.getData("annunciate/add", {
      producer_id: this.cp.u.id,    //制片人id
      name: this.name,   //剧名
      director: this.director,    //导演
      begin_time: this.myDate,    //开机时间
      cycle: this.days,    //周期
      chupin_company: this.outcompany,    //出品公司
      zhipian_company: this.zhiCompany,    //制品公司
      screenwriter_team: this.bianjuteam,   //编剧团队
      casting_director: this.roleDirector,   //选角导演
      actor_deputy_director: this.roleViceDirector,  //演员副导演  
      e_mail: this.email,      //邮箱
      address: this.address,     //地址
      content: this.content,     //剧情简介
      topic: this.subject,        //艺人选取题目
      poster: this.cardzPhotos,    //上传的海报的地址
      annunciate_type_id: this.ship,    //类型
      roles: this.rolesTextArr,    //角色介绍
      cover_img: this.cardfPhotos,    //上传海报封面
      place: this.place      //地点
    }).then((res: any) => {
      if (res.msg == "组训发布成功") {
        this.cp.toast("发布成功！");
        // this.cp.goto({ view: 'promo' });
        this.cp.pop();
      } else {
        this.cp.toast(res.msg);
      }
    })
  }
}
