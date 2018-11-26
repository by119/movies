import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CommonProvider } from "../../providers/common/common";
/**
 * Generated class for the StudioIntroductionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name:'studio-introductions'
})
@Component({
  selector: 'page-studio-introductions',
  templateUrl: 'studio-introductions.html',
})
export class StudioIntroductionsPage {
  studionInfo = "";
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public cp:CommonProvider
  ) {
  }

  ionViewDidLoad() {
    this.cp.getData("producer/getInfo",{}).then((res:any) => {
      if(res.code==0){
        this.studionInfo = res.data.producer;
      }
    })
  }

}
