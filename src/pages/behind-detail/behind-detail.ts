import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CommonProvider } from "../../providers/common/common";

/**
 * Generated class for the BehindDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'behind-detail',
  segment: 'behind-detail/:id'
})
@Component({
  selector: 'page-behind-detail',
  templateUrl: 'behind-detail.html',
})
export class BehindDetailPage {

  tabs: any = '0';
  isCollect = true;  
  introList: any = []; //幕后团队经典案例
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public cp: CommonProvider
  ) {
  }
  //幕后团队详情
  actionerInfo = "";
  ionViewDidLoad() {
    //幕后团队详情 
    this.actiorDetail();
  }
  // 幕后团队详情
  actiorDetail() {
    this.cp.getDataInfo("behind_team/detail", {
      id: this.navParams.get("id")
    }).then((res: any) => {
      this.actionerInfo = res.data;
      this.introList = res.data.classic_case;
    })
  }
}
