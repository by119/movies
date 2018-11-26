import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {CommonProvider} from "../../providers/common/common";

@IonicPage({
  name: 'artist-detail',
  segment: 'artist-detail/:id'
})
@Component({
  selector: 'page-artist-detail',
  templateUrl: 'artist-detail.html',
})
export class ArtistDetailPage {
  tabs: any = '0';
  isCollect = true;  
  introList: any = [];   //艺人工作经历
  dataList = [];    //艺人档期
  schedule = ""; //艺人档期状态  ''：详细档期   true:有档期   false:无档期
  artistImg = [];   //艺人相册
  videoList = [];   //艺人视频
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
    public cp:CommonProvider
  ) {
  }

  actionerInfo = "";    //艺人详情
  ionViewDidLoad() {
    console.log(this.navParams, 'ionViewDidLoad ArtistDetailPage');
    this.actiorDetail();    //艺人详情
    this.expriceList();     //艺人工作经历列表
    this.actorList();       //艺人档期
  }

  bgColor(bgc,i) {
    let len = this.color.length-1;
    if(i<=len){
      bgc.push(this.color[i]);
    }else {
      bgc.push(this.color[i-len]);
    }
  }
  bgColor2(bgc,i) {
    let len = this.color.length-1;
    if(i<=len){
      bgc.push(this.color[len-i]);
    }else {
      bgc.push(this.color[i-len]);
    }
  }
  // 艺人详情
  actiorDetail(){
    this.cp.getDataInfo("user_profile/getlist",{
      uid:this.cp.u.id,
      user_id:this.navParams.get("id")
    }).then((res:any) => {
      if(res.total>0){
        this.bgCS = [];
        this.bgCC = [];
        for(let i=0;i<res.data[0].style.length;i++){
          this.bgColor(this.bgCS,i);
        }
        for(let i=0;i<res.data[0].category.length;i++){
          this.bgColor2(this.bgCC,i);
        }
        this.actionerInfo = res.data[0];
        if(res.data[0].collections == 1){
          this.isCollect = false;
        }else{
          this.isCollect = true;
        }
      }
    })
  }

  // 艺人工作经历
  expriceList(){
    this.cp.getDataInfo("areist_experience_of_employment/getlist",{
      user_id:this.navParams.get("id")
    }).then((res:any) => {
      if(res.total>0){
        this.introList = res.data;
      }
    })
  }

  // 艺人档期
  actorList(){
    this.cp.getDataInfo("areist_morietheaterschedule/time",{
      user_id:this.navParams.get("id")
    }).then((res:any) => {
      if(res.status==1){
        let data = res.data;
        let exp: any = "";
        let state: any = "";
        this.dataList = [];
        for (let i = 0; i < data.length; i++) {
          state = data[i][2]&&data[i][2].grade ? 1 : 0;
          exp = { month: data[i][0], grade: state };
          this.dataList.push(exp);
        }
        this.schedule = res.schedule;
      }
    })
  }

  // 艺人相册   artistImg
  actorPhotoList(){
    this.cp.getDataInfo("areist_album/getlist",{
      user_id:this.navParams.get("id")
    }).then((res:any) => {
      if(res.total>0){
        this.artistImg = res.data;
      }
    })
  }

  // 艺人视频
  videoLists(){
    this.cp.getDataInfo("areist_video/getlist",{
      user_id:this.navParams.get("id")
    }).then((res:any) => {
      if(res.total>0){
        this.videoList = res.data;
      }
    })
  }

  // 艺人收藏
  collect() {
    this.cp.getData("producer_collection/collection",{
      collection_id: this.navParams.get("id"),
      silent: true
    }).then((res:any) => {
      if(res.msg == "收藏成功"){
        this.isCollect = !this.isCollect;
        // this.cp.toast("收藏成功");
        // this.cp.goto({view:'collect'});
      }else{
        this.isCollect = !this.isCollect;
        // this.cp.toast("您取消了收藏");
      }
    })
  }
  contactTA() {
    console.log('联系TA')
  }
}
