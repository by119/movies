import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {CommonProvider} from "../../providers/common/common";
/**
 * Generated class for the LegalSuggestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({ name: 'legal-suggest' })
@Component({
  selector: 'page-legal-suggest',
  templateUrl: 'legal-suggest.html',
})
export class LegalSuggestPage {
  
  legalList:any = [];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public cp:CommonProvider
    ) {
  }

  ionViewDidLoad() {
    this.videoLists()
  }
    // 诉讼支持
    videoLists(){
      this.cp.getDataInfo("litigation/detail",{
        
      }).then((res:any) => {
        console.log(res,'das');
        this.legalList = res.data
      })
    }

}
