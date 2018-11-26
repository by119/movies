import { Component, ViewChild, Input } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CommonProvider } from "../../providers/common/common";

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({ name: 'home' })
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  @ViewChild('avatarSilde') avatarSilde;
  @ViewChild('artistSilde') artistSilde;
  @ViewChild('artistDetilSilde') artistDetilSilde;
  current: any = 1;
  currentHot: any = 1;
  currentHotType: any = 0;
  slideBg = '';
  slideImg = [];
  @Input() notices = [];  //热门通告
  artistImg = [];     //热门艺人
  constructor(public navCtrl: NavController, public navParams: NavParams, public cp: CommonProvider) { }

  ionViewDidLoad() {
    this.hotAnnounce();   //热门通告
    this.hotActioer();    //热门艺人
    this.advListImg();    //轮播图
    console.log(this.cp.u,'这是登陆的信息')
  }

  // 轮播图
  advListImg(){
    this.cp.getDataInfo("adv/getlist",{
      type:1
    }).then((res:any) => {
      this.slideImg = res.data;
      for(var i=0;i<res.data.length;i++){
        this.slideBg = res.data[i].pic_url;
      }
    })
  }

  // 热门艺人
  hotActioer(){
    this.cp.getDataInfo("user_profile/getlist",{
      is_hot:1,
    }).then((res:any) => {
      this.artistImg = res.data;
    })
  }

  // 热门通告
  hotAnnounce(){
    this.cp.getDataInfo("annunciate/getList",{
      annunciate_id:1,
      is_hot:1
    }).then((res:any) => {
      if(res.total>0){
        this.notices = res.data;
      }
    })
  }

  slideChanged() {
    this.current = this.avatarSilde.getActiveIndex();
    if (this.current < this.slideImg.length) {
      this.slideBg = this.slideImg[this.current].pic_url;
    }
  }
  slideHotChanged() {
    this.currentHot = this.artistSilde.getActiveIndex();
    this.artistSilde.slideTo(this.currentHot, 500);
    if (this.currentHotType == 1) {
      this.artistDetilSilde.slideTo(this.currentHot, 500);
    }
  }
  slideHotDetilChanged() {
    this.currentHot = this.artistDetilSilde.getActiveIndex();
    this.artistDetilSilde.slideTo(this.currentHot, 500);
    this.artistSilde.slideTo(this.currentHot, 500);
    this.currentHotType = 1
  }
  curHot(i) {
    this.currentHot = i;
    this.artistSilde.slideTo(this.currentHot, 500);
    this.artistDetilSilde.slideTo(this.currentHot, 500);
  }
}
