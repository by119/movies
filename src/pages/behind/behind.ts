import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, InfiniteScroll, Content } from 'ionic-angular';
import { CommonProvider } from "../../providers/common/common";


/**
 * Generated class for the BehindPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({ name: 'behind' })
@Component({
  selector: 'page-behind',
  templateUrl: 'behind.html',
})
export class BehindPage {
  @ViewChild(InfiniteScroll) infiniteScroll: InfiniteScroll;
  @ViewChild(Content) content: Content;
  tabs: any = "0"; items = [[], []]; page = [0, 0];
  res = [];
  params: any = {};
  infiniteScrollState = [!0, !0];
  size = 20;
  filter = !1;
  filterType: any = '';
  annunciate_type: any = ''; //筛选类型列表
  function_team: any = ''; //筛选技术团队列表
  production_team: any = ''; //筛选制片团队列表  
  annunciate_type_function_id: any = '';//职能
  annunciate_type_id: any = ''; //类型
  proIndex = []; //属性数组
  posIndex = []; //下标数组

  constructor(public navCtrl: NavController, public navParams: NavParams, public cp: CommonProvider) {
  }

  ionViewDidEnter() {
    this.page[this.tabs] == 0 && this.doInfinite();
  }
  ionViewDidLoad() {
    // 获取筛选条件
    this.cp.getDataInfo("annunciate_type/condition", {}).then((e: any) => {
      this.annunciate_type = e.data.annunciate_type;
      this.function_team = e.data.function_team;
      this.production_team = e.data.production_team;
    })
  }

  // 确定筛选
  confirm() {
    this.filter = !1;
    this.page[this.tabs] = 0;
    this.items[this.tabs] = [];
    this.annunciate_type_function_id = this.proIndex[0];
    this.annunciate_type_id = this.proIndex[1];
    this.doInfinite();
  }
  // 取消筛选
  close() {
    this.filter = !1;
  }
  // 打开筛选
  filterShow() {
    this.filter = !0;
  }
  // 选择筛选属性
  choosePro(filterType, i, id) {
    if (filterType == 0) {
      this.posIndex[0] = this.proIndex[0] == id ? null : i;
      this.proIndex[0] = this.proIndex[0] == id ? null : id;
      this.filterType = 0;
    } else if (filterType == 1) {
      this.posIndex[0] = this.proIndex[0] == id ? null : i;
      this.proIndex[0] = this.proIndex[0] == id ? null : id;
      this.filterType = 1;
    } else {
      this.posIndex[1] = this.proIndex[1] == id ? null : i;
      this.proIndex[1] = this.proIndex[1] == id ? null : id;
    }
  }

  changeSeg() {
    if (this.tabs == 1) {
      this.filter = !0;
      this.annunciate_type_function_id = '';
      this.annunciate_type_id = '';
    } else {
      this.filter = !1;
    }
    0 == this.page[this.tabs] && this.doInfinite();
    this.infiniteScroll.enable(this.infiniteScrollState[this.tabs]);
    if (this.items[this.tabs].length > 0) {
      setTimeout(() => { this.cp.getNode(); }, 100)
    }
  }
  doInfinite() {
    this.params = {
      annunciate_type_function_id: this.annunciate_type_function_id,
      annunciate_type_id: this.annunciate_type_id,
      p: ++this.page[this.tabs],
      numPerPage: this.size
    }
    this.cp.getDataInfo("behind_team/getList", this.params).then((e: any) => {
      if (e.data.length > 0) {
        this.res[this.tabs] = e;
        this.items[this.tabs] = this.items[this.tabs].concat(this.res[this.tabs].data);
        this.infiniteScroll.complete();
        if (this.items[this.tabs].length > 0) {
          setTimeout(() => { this.cp.getNode(); }, 100)
        }
        if (this.items[this.tabs].length == this.res[this.tabs].total) {
          this.infiniteScrollState[this.tabs] = !1;
          this.infiniteScroll.enable(this.infiniteScrollState[this.tabs]);
        } else {
          this.infiniteScrollState[this.tabs] = !0;
          this.infiniteScroll.enable(this.infiniteScrollState[this.tabs]);
        }
      } else {
        this.infiniteScrollState[this.tabs] = !1;
        this.infiniteScroll.enable(this.infiniteScrollState[this.tabs]);
      }
    })
  }
}
