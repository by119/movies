import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CommonProvider } from "../../providers/common/common";
/**
 * Generated class for the AboutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name:'about'
})
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {
  aboutInfo = "";
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public cp:CommonProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutPage');
    this.cp.getData("article/detail",{
      id:2
    }).then((res:any) => {
      this.aboutInfo = res;
    })
  }

}
