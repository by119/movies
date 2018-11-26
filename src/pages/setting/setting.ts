import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ActionSheetController } from 'ionic-angular';
import { CommonProvider } from "../../providers/common/common";
/**
 * Generated class for the SettingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name:"setting"
})
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public cp:CommonProvider,
    public aa: ActionSheetController,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingPage');
  }

  logout() {
    let actionSheet = this.aa.create({
      title: '真的要退出吗？',
      buttons: [{
        text: '退出登录',
        role: 'destructive',
        handler: () => {
          this.cp.logout().then(() => {
            this.cp.toast('您已退出登录！');
            this.cp.gotoRoot();
          })
        }
      }, {
        text: '取消',
        role: 'cancel',
      }]
    });
    actionSheet.present()
  }

}
