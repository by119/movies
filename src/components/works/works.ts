import { Component, Input } from '@angular/core';
import { Item, NavParams } from 'ionic-angular';
import { CommonProvider } from "../../providers/common/common";

/**
 * Generated class for the WorksComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'works',
  templateUrl: 'works.html'
})
export class WorksComponent {
  @Input('videoUrl') videoUrl;
  @Input('lastPage') pageName;
  @Input('producerId') producerId;
  @Input('roleId') roleId;
  @Input('userId') userId;
  @Input('uId') uId;
  @Input("item") item;

  constructor(public navParams: NavParams,public cp: CommonProvider) {
    console.log('Hello WorksComponent Component');
  }
  chooseArtist() {
    console.log('aaaaaaa', this.producerId,this.roleId,this.userId);
    this.cp.getData("annunciate_roles/choose", {
      user_id: this.userId,
      role_id: this.roleId,
      uid: this.uId
    }).then((res: any) => {
      if(res.code == 0){
        this.cp.toast("选取成功");
        this.cp.pop();
      }
      console.log(res, '制片人选取艺人2222')
    })
  }
}
