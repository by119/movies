import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CommonProvider } from "../../providers/common/common";

/**
 * Generated class for the WorkPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({ name: 'work' })
@Component({
  selector: 'page-work',
  templateUrl: 'work.html',
})
export class WorkPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public cp: CommonProvider
  ) {
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad WorkPage');
  }
  choose(type1){
    // type: 1:制片厂  2：艺人
    console.log(type1,this.cp.u.type,'type1  1:制片厂  2：艺人');
    let title = '',url = '';
    if(type1 == 1){
      title = '确认选择成为制片厂吗？'
      url = 'studio-identity';
    }else if(type1 = 2){
      title = '确认选择成为艺人吗？';
      url = 'checkin';
    }
    if(this.cp.u.name){
      this.cp.prompt(
        "选择工作状态",
        title,
        "取消",
        () => {},
        "确认",
        () => {
          this.cp.getData("user/edit", {
            type: type1
          }).then((res: any) => {
            this.cp.setU({type: type1}); // 0:普通用户   1：制片人   2：艺人
            this.cp.toast("认证成功！");
            this.cp.gotoRoot()
          })
        }
      );
    }else {
      this.cp.prompt(
        "选择工作状态",
        title,
        "取消",
        () => {},
        "先去完善资料",
        () => {
          this.cp.goto({view: url, lastpage: 'work'})
        }
      );
    }
    // this.cp.prompt(
    //   "选择工作状态",
    //   title,
    //   "取消",
    //   () => {},
    //   "确认",
    //   () => {
    //     this.cp.getData("user/edit", {
    //       type: type1
    //     }).then((res: any) => {
    //       console.log(type1);
    //       this.cp.setU({type:type1}); // 0:普通用户   1：制片人   2：艺人
    //       this.cp.gotoRoot()
    //     })
    //   }
    // );


  }

}
