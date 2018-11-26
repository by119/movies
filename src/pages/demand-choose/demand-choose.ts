import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CommonProvider } from "../../providers/common/common";
/**
 * Generated class for the DemandChoosePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'demand-choose',
  segment: 'demand-choose/:id'
})
@Component({
  selector: 'page-demand-choose',
  templateUrl: 'demand-choose.html',
})
export class DemandChoosePage {
  producerId = null;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public cp: CommonProvider
  ) {
  }

  ionViewDidLoad() {
    this.producerId = this.navParams.get('id');
    console.log('ionViewDidLoad DemandChoosePage');
    // this.demandChoose();
  }

  ionViewDidEnter(){
    this.demandChoose();
  }

  demandChooseInfo = "";
  annunciateRoles = [];

  demandChoose() {
    this.cp.getData("annunciate/detail", {
      id: this.producerId
    }).then((res: any) => {
      this.demandChooseInfo = res.data;
      this.annunciateRoles = res.data.annunciateRoles;
      console.log(res)
    })
  }

}
