import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {CommonProvider} from "../../providers/common/common";
/**
 * Generated class for the LegalMouldPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({ name: 'legal-mould' })
@Component({
  selector: 'page-legal-mould',
  templateUrl: 'legal-mould.html',
})
export class LegalMouldPage {
  items:any = [];
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public cp:CommonProvider
  ) {
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad LegalMouldPage');
    this.ContractTemplateoLists()
  }
  downloadFile(url){
    console.log('下载模板',url);
  }
    // 合约模板
    ContractTemplateoLists(){
      this.cp.getDataInfo("contract_template/getList",{
        
      }).then((res:any) => {
        console.log(res,'das');
        this.items = res.data
      })
    }
}
