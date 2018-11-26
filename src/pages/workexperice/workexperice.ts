import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CommonProvider } from "../../providers/common/common";
/**
 * Generated class for the WorkexpericePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name:'workexperice'
})
@Component({
  selector: 'page-workexperice',
  templateUrl: 'workexperice.html',
})
export class WorkexpericePage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public cp:CommonProvider
  ) {
  }
  typeList = [];
  name = "";    //剧名
  dircator = "";    //导演
  teamPeople = "";    //合作艺人
  ship = "";    //类型
  role = "";    //角色
  cardzElem: any;
  cardzformElem: any;
  isShowImg = true;
  cardzPhotos = "";
  cardfPhotos = "";
  @ViewChild('form2') form2;

  ionViewDidLoad() {
    this.workType();
    console.log('ionViewDidLoad WorkexpericePage');
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

  // 工作类型
  workType(){
    this.cp.getData("areist_works_type/getlist",{

    }).then((res:any) => {
      this.typeList = res.data;
    })
  }

  // 上传海报
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
  
  workBtn(){
    this.cp.getData("areist_experience_of_employment/add",{
      title: this.name,     //剧名
      director: this.dircator,    //导演
      collaborators: this.teamPeople,    //合作艺人
      pic: this.cardzPhotos,
      category: this.ship,
      role:this.role
    }).then((res:any) =>{
      if(res.msg == "上传成功"){
        this.cp.toast("添加成功");
        // this.cp.goto({view:'intro'})
        this.cp.pop();
      }else{
        this.cp.toast("请完善信息！")
      }
    })
  }

}
