import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CommonProvider } from "../../providers/common/common";
/**
 * Generated class for the SuggestionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name:"suggestion"
})
@Component({
  selector: 'page-suggestion',
  templateUrl: 'suggestion.html',
})
export class SuggestionPage {
  suggestinfo = "";
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public cp:CommonProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SuggestionPage');
  }
  
  suggest(){
    this.cp.getData("feedback/add",{
      content: this.suggestinfo
    }).then((res:any) => {
      if(res.code == 0){
        this.cp.toast("反馈成功");
        this.cp.pop();
      }
    })
  }
}
