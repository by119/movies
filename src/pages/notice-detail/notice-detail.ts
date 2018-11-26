import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CommonProvider } from "../../providers/common/common";

@IonicPage({
  name: 'notice-detail',
  segment: 'notice-detail/:id'
})
@Component({
  selector: 'page-notice-detail',
  templateUrl: 'notice-detail.html',
})
export class NoticeDetailPage {
  notice = {};
  artistList = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public cp: CommonProvider) {
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad NoticeDetailPage', this.navParams);
    this.noticeDetail(); //通告详情
  }

  noticeDetail() {
    this.cp.getData("annunciate/detail", {
      id: this.navParams.get("id")
    }).then((res: any) => {
      if(res.code==0){
        this.notice = res.data;
        this.artistList = res.data.annunciateRoles;
        if (this.artistList.length > 0) {
          setTimeout(() => { this.cp.getNode(); }, 100)
        }
      }
    })
  }

}
