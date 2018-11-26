import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,InfiniteScroll,Content } from 'ionic-angular';
import { CommonProvider } from "../../providers/common/common";
/**
 * Generated class for the DemandPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({ name: 'demand' })
@Component({
  selector: 'page-demand',
  templateUrl: 'demand.html',
})
export class DemandPage {
  @ViewChild(InfiniteScroll) infiniteScroll: InfiniteScroll;
  @ViewChild(Content) content: Content;
  page = 0;
  res:any = [];
  params: any = {};
  infiniteScrollState = !0;
  size = 20;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public cp:CommonProvider
  ) {
  }

  needInfoList = [];     //我发布的需求列表

  ionViewDidLoad() {
    this.page == 0 && this.doInfinite();
  }
  // 我发布的需求
  myNeed(){
    this.cp.getData("annunciate/getList",{
      producer_id:2
    }).then((res:any) => {
      this.needInfoList = res.data;
    })
  }
  // 删除我发布的需求
  needDelete(id,i) {
    this.cp.prompt(
      "删除需求",
      "确认删除该需求？",
      "取消",
      () => {},
      "删除",
      () => {
        this.cp.getData("annunciate/deleteAnnunciate", {
          annunciate_id: id
        }).then((res: any) => {      
          if (res.code == 0) {
            this.cp.toast(res.msg);
            // this.cp.toast('删除成功');
            this.needInfoList.splice(i, 1);
          }
        })
      }
    );
  }

  // 上拉加载
  doInfinite() {
    this.params = {
      p: ++this.page,
      numPerPage: this.size,
      producer_id:this.cp.u.id
    }
    this.cp.getData("annunciate/getList", this.params).then((e: any) => {
      if (e.data.length > 0) {
        this.res = e;
        this.needInfoList = this.needInfoList.concat(this.res.data);
        this.infiniteScroll.complete();
        if (this.needInfoList.length == this.res.total) {
          this.infiniteScrollState = !1;
          this.infiniteScroll.enable(this.infiniteScrollState);
        }else {
          this.infiniteScrollState = !0;
          this.infiniteScroll.enable(this.infiniteScrollState);
        }
      } else {
        this.infiniteScrollState = !1;
        this.infiniteScroll.enable(this.infiniteScrollState);
      }
    })
  }
}
