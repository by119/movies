import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CommonProvider } from "../../providers/common/common";
/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({ name: 'search' })
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
  searchQuery: string = '';
  items: string[];
  searchInfo = false;
  historySearchInfo = [];
  searchVal = "";
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public cp:CommonProvider
  ) {
    this.initializeItems();
  }

  initializeItems() {
    this.items = [
      'Amsterdam',
      'Bogota',
    ];
  }

  getItems(ev: any) {
    this.initializeItems();
    const val = ev.target.value;
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  ionViewDidLoad() { 
    console.log('ionViewDidLoad SearchPage');
    this.historySearch();    //历史搜索
  }

  // 历史搜索
  historySearch(){
    this.cp.getData("search_record/getList",{

    }).then((res:any) => {
      this.historySearchInfo = res.data;
    })
  }

  // 删除历史搜索
  deleteSearch(id,i){
    this.cp.prompt(
      "删除历史记录",
      "确认删除历史记录？",
      "取消",
      () => {},
      "删除",
      () => {
        this.cp.getData("search_record/delete", {
          id: id
        }).then((res: any) => {      
          if (res.code == 0) {
            this.cp.toast(res.msg);
            this.historySearchInfo.splice(i, 1);
          }
        })
      }
    );
  }
  // deleteSearch(id){
  //   this.cp.getData("search_record/delete",{
  //     id:id
  //   }).then((res:any) => {

  //   })
  // }
}
