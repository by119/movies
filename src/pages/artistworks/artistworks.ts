import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {CommonProvider} from "../../providers/common/common";

@IonicPage({
  name:'artistworks',
  segment: 'artistworks/:keyword'
})
@Component({
  selector: 'page-artistworks',
  templateUrl: 'artistworks.html',
})
export class ArtistworksPage {
  zuxunInfo = [];
  yirenInfo = [];
  isShow = false;
  elseBlank= false;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public cp: CommonProvider
  ) {
  }

  ionViewDidLoad() {
    this.searchList();
  }

  searchList(){
    this.cp.getDataInfo("search_record/searchList",{
      keyword: this.navParams.get("keyword"),
      user_id: this.cp.u.id
    }).then((res:any) => {
      if(res.code == 0){
        this.zuxunInfo = res.data.annunciate;
        this.yirenInfo = res.data.user_profile;
        if(res.data.annunciate.length <=0 && res.data.user_profile.length <=0){
          this.elseBlank = true;
        }
      }
    })
  }
}
