import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, InfiniteScroll, Content } from 'ionic-angular';
import { CommonProvider } from "../../providers/common/common";
/**
 * Generated class for the ArtistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({ name: 'artist' })
@Component({
  selector: 'page-artist',
  templateUrl: 'artist.html',
})
export class ArtistPage {
  @ViewChild(InfiniteScroll) infiniteScroll: InfiniteScroll;
  @ViewChild(Content) content: Content;
  tabs: any = "0"; items = [[], []]; page = [0, 0];
  res = [];
  params: any = {};
  infiniteScrollState = [!0, !0];
  size = 20;
  filter = !1;
  sex = null;
  category_id = null;
  age = null;
  style_id = null;
  // 筛选标签
  filterList = [
    {
      title: '性别',
      name: 'sex',
      pro: [
        { name: '男', id: 0 },
        { name: '女', id: 1 }
      ]
    }, {
      title: '类型',
      name: 'category_id',
      pro: []
    }, {
      title: '年龄',
      name: 'age',
      pro: [
        { name: '15岁以下', id: 0 },
        { name: '15-20', id: 1 },
        { name: '21-25', id: 2 },
        { name: '26-30', id: 3 },
        { name: '31-35', id: 4 },
        { name: '36-40', id: 5 },
        { name: '40以上', id: 6 }]
    }, {
      title: '风格',
      name: 'style_id',
      pro: []
    }];

  proIndex = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public cp: CommonProvider) {
  }

  ionViewDidLoad() {
    this.page[this.tabs] == 0 && this.doInfinite();
    this.cp.getDataInfo("areist_type/getlist",{}).then((e: any) => {
      // console.log(e, '筛选标签类型');
      this.filterList[1].pro = e.data;
    })
    this.cp.getDataInfo("areist_style/getlist",{}).then((e: any) => {
      // console.log(e, '筛选风格');
      this.filterList[3].pro = e.data;
    })
  }

  // 确定筛选
  confirm() {
    this.filter = !1;
    this.page[this.tabs] = 0;
    this.items[this.tabs] = [];
    this.sex = this.proIndex[0];
    this.category_id = this.proIndex[1];
    this.age = this.proIndex[2];
    this.style_id = this.proIndex[3];
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
  choosePro(i, j, id) {
    this.proIndex[i] = this.proIndex[i] == id ? null : id;
  }

  changeSeg() {
    if (this.tabs == 1) {
      this.filter = !0;
    } else {
      this.filter = !1;
      this.sex = null;
      this.category_id = null;
      this.age = null;
      this.style_id = null;
      this.infiniteScrollState[this.tabs] = !1;
      this.infiniteScroll.enable(this.infiniteScrollState[this.tabs]);
    }
    0 == this.page[this.tabs] && this.doInfinite();
    this.infiniteScroll.enable(this.infiniteScrollState[this.tabs]);
    if (this.items[this.tabs].length > 0) {
      setTimeout(() => { this.cp.getNode(); }, 100)
    }
  }
  doInfinite() {
    this.params = {
      sex: this.sex,
      category_id: this.category_id,
      age: this.age,
      style_id: this.style_id,
      p: ++this.page[this.tabs],
      numPerPage: this.size
    }
    this.cp.getDataInfo("user_profile/getlist", this.params).then((e: any) => {
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
