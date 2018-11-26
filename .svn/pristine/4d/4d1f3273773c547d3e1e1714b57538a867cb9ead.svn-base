import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CommonProvider } from "../../providers/common/common";

/**
 * Generated class for the DemandDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'demand-detail',
  segment: 'demand-detail/:id'
})
@Component({
  selector: 'page-demand-detail',
  templateUrl: 'demand-detail.html',
})
export class DemandDetailPage {
  lastPage = '';
  isCollect = true;
  id: any = ''
  demandInfo = "";    //组训详情
  constructor(public navCtrl: NavController, public navParams: NavParams, public cp: CommonProvider) { }

  ionViewDidLoad() {
    console.log(this.navParams, 'ionViewDidLoad DemandDetailPage');
    this.lastPage = this.navParams.get('lastPage') || '';
    this.demandDetail();    //组训详情
  }
  // 组训详情
  demandDetail() {
    this.cp.getData("annunciate/detail", {
      id: this.navParams.get("id")
    }).then((res: any) => {
      this.demandInfo = res.data;
      this.isCollect = res.data.is_collection;
      this.id = res.data.id;
    })
  }
  // 收藏
  collect() {
    this.cp.getData("collection/add", {
      collection_id: this.id,
      silent:true
    }).then((res: any) => {
      if (res.msg == "收藏成功") {
        this.isCollect = !this.isCollect;
        // this.cp.toast("收藏成功");
        // this.cp.goto({view:'collect'});
      } else {
        this.isCollect = !this.isCollect;
        // this.cp.toast("您取消了收藏");
      }
      // console.log(res,'这是艺人的收藏')
    })
  }
}
