import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { CommonProvider } from "../../providers/common/common";
/**
 * Generated class for the MoreTagPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: "more-tag",
  segment: 'more-tag/:checkinType'
})
@Component({
  selector: "page-more-tag",
  templateUrl: "more-tag.html"
})
export class MoreTagPage {
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public cp: CommonProvider
  ) {}
  monthState: any = [];
  ids = [];
  monthList = [];
  checkinType = 1;
  ionViewDidLoad() {
    this.checkinType = this.navParams.get('checkinType');
    let url = this.checkinType==1?"areist_type/getlist":"areist_style/getlist";
    this.cp.getData(url, {}).then((res: any) => {
      this.monthList = res.data;
      this.monthState = [];
      for (let i = 0; i < res.data.length; i++) {
        this.monthState.push(!1);
      }
    });
  }

  moreTagBtn() {
    this.ids = [];
    for (let i = 0; i < this.monthState.length; i++) {
      if (this.monthState[i]) {
        this.ids.push(this.monthList[i].id);
      }
    }
    this.cp.getData("User_Profile/reist_type_del", {
        type: this.checkinType, //修改标签
        ids: this.ids.toString()
      })
      .then((res: any) => {
        if(res.status!=1){
          this.cp.toast(res.msg);
        }else {
          this.cp.pop();
        }        
      });
  }
}
