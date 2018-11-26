import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, InfiniteScroll, Content } from 'ionic-angular';
import { CommonProvider } from "../../providers/common/common";

@IonicPage({
  name: 'artist-works',
  segment: 'artist-works/:producer_id/:role_id'
})
@Component({
  selector: 'page-artist-works',
  templateUrl: 'artist-works.html',
})
export class ArtistWorksPage {
  @ViewChild(InfiniteScroll) infiniteScroll: InfiniteScroll;
  @ViewChild(Content) content: Content;
  tabs: any = "0"; items = [[], []]; page = [0, 0];
  res = [];
  params: any = {};
  infiniteScrollState = [!0, !0];
  size = 20;
  producerId = null; //组训id
  roleId = null;     //角色id
  videoList = [];
  filter = !1;
  ageList = []; //年龄
  categoryList = []; //类型
  age = null; //年龄
  sex = null; //性别
  category = null; //类型
  proIndex = [null,null,null]; //属性数组
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public cp: CommonProvider
  ) {}

  ionViewDidLoad() {
    this.producerId = this.navParams.get("producer_id")
    this.roleId = this.navParams.get("role_id")
    this.page[this.tabs] == 0 && this.doInfinite();
    this.cp.getDataInfo("areist_delivery_woeks/condition",{}).then((e: any) => {
      if(e.code==0){        
        this.ageList = e.data.age; //年龄
        this.categoryList = e.data.category; //类型
      }      
    })
  }

  // 确定筛选
  confirm() {
    this.filter = !1;
    this.page[this.tabs] = 0;
    this.items[this.tabs] = [];
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
  choosePro(filterType, id) {
    this.proIndex[filterType] = this.proIndex[filterType] == id ? null : id;
  }
  changeSeg() {
    if (this.tabs == 1) {
      this.filter = !0;
    } else {
      this.filter = !1;
      this.age = this.proIndex[0],
      this.category = this.proIndex[1],
      this.sex = this.proIndex[2],
      this.infiniteScrollState[this.tabs] = !1;
      this.infiniteScroll.enable(this.infiniteScrollState[this.tabs]);
    }
    0 == this.page[this.tabs] && this.doInfinite();
    this.infiniteScroll.enable(this.infiniteScrollState[this.tabs]);
  }

  doInfinite() {
    this.params = {
      annunciate_id: this.producerId,
      age: this.proIndex[0],
      category: this.proIndex[1],
      sex: this.proIndex[2],
      p: ++this.page[this.tabs],
      numPerPage: this.size
    }
    this.cp.getDataInfo("areist_delivery_woeks/getList", this.params).then((e: any) => {
      if (e.data.length > 0) {
        this.res[this.tabs] = e;
        this.items[this.tabs] = this.items[this.tabs].concat(this.res[this.tabs].data);
        this.infiniteScroll.complete();
        if (this.items[this.tabs].length == this.res[this.tabs].total) {
          this.infiniteScrollState[this.tabs] = !1;
          this.infiniteScroll.enable(this.infiniteScrollState[this.tabs]);
        }else {
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
