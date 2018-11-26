import { Component,ViewChild } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { CommonProvider } from "../../providers/common/common";
/**
 * Generated class for the CheckinPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: "checkin"
})
@Component({
  selector: "page-checkin",
  templateUrl: "checkin.html"
})
export class CheckinPage {
  editBtnTxt = '确认提交';
  typeList = [{ id: 0, name: "男" }, { id: 1, name: "女" }]; //性别
  name = ""; //姓名
  sex = ""; //性别
  age = ""; //年龄
  cm = ""; //身高
  weight = ""; //体重
  nation = ""; //民族
  address = ""; //常住地址
  constellations = ""; //星座
  graduateschool = ""; //毕业院校
  major = ""; //专业
  special = ""; //特长
  information = ""; //个人简介
  style = []; //风格
  category = []; //类型
  styleIds = []; //风格
  categoryIds = []; //类型
  cardfPhotos = "";//头像
  isFanShowImg = false;
  cardpPhotos = ""; //美图
  isPShowImg = false;
  @ViewChild('form2') form2;
  @ViewChild('form3') form3;
  @ViewChild('form4') form4;
  cardfElem: any;
  cardfformElem: any;
  cardpElem: any;
  cardpformElem: any;

  constellation = [
    { id: 1, name: "白羊座" },
    { id: 2, name: "金牛座" },
    { id: 3, name: "双子座" },
    { id: 4, name: "巨蟹座" },
    { id: 5, name: "狮子座" },
    { id: 6, name: "处女座" },
    { id: 7, name: "天平座" },
    { id: 8, name: "天蝎座" },
    { id: 9, name: "射手座" },
    { id: 10, name: "摩羯座" },
    { id: 11, name: "水瓶座" },
    { id: 12, name: "双鱼座" }
  ];
  // color = ["#6BC18B", "#E46E69", "#F4A248", "#678FD1", "#EA8E9D", "#CBAD88"];
  color = [
    "#E83A31",
    "#8A30E8",
    "#4030E8",
    "#30C9E8",
    "#A4E832",
    "#E98C2C",
    "#007ACC",
    "#1C6C73",
    "#1AA15F",
    "#D79062"
  ];
  bgCS = []; //风格颜色
  bgCC = []; //类型颜色
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public cp: CommonProvider
  ) {}

  ionViewDidLoad() {
    this.actiorDetail(1);
    this.cardfformElem = this.form3.nativeElement;
    this.cardfElem = this.cardfformElem.firstElementChild;
    this.cardpformElem = this.form4.nativeElement;
    this.cardpElem = this.cardpformElem.firstElementChild;
  }
  ionViewDidEnter() {
    this.editBtnTxt = this.navParams.get('lastpage')=='work'?'确认提交成为艺人':'确认提交';
    this.actiorDetail(0);
  }
  bgColor(bgc, i) {
    let len = this.color.length - 1;
    if (i <= len) {
      bgc.push(this.color[i]);
    } else {
      bgc.push(this.color[i - len]);
    }
  }
  bgColor2(bgc, i) {
    let len = this.color.length - 1;
    if (i <= len) {
      bgc.push(this.color[len - i]);
    } else {
      bgc.push(this.color[i - len]);
    }
  }

  // 上传头像
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
         this.isFanShowImg = true;
       }
     });
     this.cardfElem.value = '';
   }

  // 上传美图
  cardpaddImg() {
    this.cardpElem.click()
  }
  cardpuploadImg() {
    this.cp.getData('upload/index', new FormData(this.cardpformElem)).then((result: any) => {
      if (result.code != 0) {
        this.cp.toast(result.msg.indexOf('大小不符') > 0 ? '图片需小于5M' : result.msg);
      } else {
        this.cardpPhotos = this.cp.SITE_URL + result.data.name;
      }
      if (result.code == 0) {
        this.isPShowImg = true;
      }
    });
    this.cardpElem.value = '';
  }

  // 我的介绍 详情
  actiorDetail(type) {
      this.cp.getData("user_profile/getlist", {
        is_detail:1
      }).then((res: any) => {
        if (res.data.length > 0) {
          let data = res.data[0];
          if (type === 1) {
            this.name = data.name || "";
            this.sex = data.sex || 0;
            this.age = data.age || ""; //年龄
            this.graduateschool = data.graduute_school || ""; //毕业院校
            this.major = data.major || ""; //专业
            this.special = data.speciality || ""; //特长
            this.cm = data.cm || ""; //身高
            this.information = data.intro || ""; //个人简介
            this.address = data.permanent_residence || ""; //常住地
            this.weight = data.weight || ""; //体重
            this.nation = data.mation || ""; //民族
            this.constellations = data.constellation || ""; //星座
            this.style = data.style || []; //风格
            this.category = data.category || []; //类型
            this.cardfPhotos = data.user.avatar || ""; //头像
            this.cardpPhotos = data.cover_img || ""; //美图
          } else {
            this.bgCS = [];
            this.bgCC = [];
            for (let i = 0; i < data.style.length; i++) {
              this.bgColor(this.bgCS, i);
            }
            for (let i = 0; i < data.category.length; i++) {
              this.bgColor2(this.bgCC, i);
            }
            this.style = data.style || []; //风格
            this.category = data.category || []; //类型
          }          
          if (this.cardfPhotos == "") {
            this.isFanShowImg = false;
          } else {
            this.isFanShowImg = true;
          }
          if (this.cardpPhotos == "") {
            this.isPShowImg = false;
          } else {
            this.isPShowImg = true;
          }
        }
      });
  }
  // 删除风格
  delStyle(i) {
    this.style.splice(i, 1);
  }
  // 删除类型
  delCategory(i) {
    this.category.splice(i, 1);
  }
  // 完善资料
  InformationEdit() {
    this.styleIds = [];
    this.categoryIds = [];
    for (let i = 0; i < this.style.length; i++) {
      this.styleIds.push(this.style[i].id);
    }
    for (let i = 0; i < this.category.length; i++) {
      this.categoryIds.push(this.category[i].id);
    }
    if(!this.name){
      this.cp.toast('姓名不能为空');
      return false;
    }
    if(!this.age){
      this.cp.toast('年龄不能为空');
      return false;
    }
    if(!this.cm){
      this.cp.toast('身高不能为空');
      return false;
    }
    if(!this.weight){
      this.cp.toast('体重不能为空');
      return false;
    }
    if(!this.cardpPhotos){
      this.cp.toast('请上传您的个人美图');
      return false;
    }
    this.cp.getData("user_profile/add", {
        name: this.name, //姓名
        sex: this.sex, //性别
        age: this.age, //年龄
        graduute_school: this.graduateschool, //毕业院校
        major: this.major, //专业
        speciality: this.special, //特长
        cm: this.cm, //身高
        intro: this.information, //个人简介
        permanent_residence: this.address, //常住地
        weight: this.weight, //体重
        mation: this.nation, //民族
        constellation: this.constellations, //星座
        style: this.styleIds.toString(), //风格
        category: this.categoryIds.toString(), //类型
        avatar: this.cardfPhotos,     //头像
        cover_img: this.cardpPhotos     //美图
      })
      .then((res: any) => {
        if(res.status==1){
          this.cp.setU({name:this.name}),
          this.cp.setU({avatar:this.cardfPhotos}),
          this.cp.setU({cover_img:this.cardpPhotos});
          if(this.navParams.get('lastpage')=='work'){
            this.cp.getData("user/edit", {
              type: 2
            }).then((res: any) => {
                this.cp.setU({type:2}); // 0:普通用户   1：制片人   2：艺人
                this.cp.gotoRoot();
                return false;
            })
          }
          this.cp.pop();
        }else {
          this.cp.toast(res.msg);
        }
      });
  }
}
