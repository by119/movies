import { Component, Input, ViewChild } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  InfiniteScroll,
  Content
} from "ionic-angular";
import { CommonProvider } from "../../providers/common/common";

@IonicPage({ name: "collect" })
@Component({
  selector: "page-collect",
  templateUrl: "collect.html"
})
export class CollectPage {
  @ViewChild(InfiniteScroll) infiniteScroll: InfiniteScroll;
  @ViewChild(Content) content: Content;
  items = [];
  page = 0;
  res: any = [];
  params: any = {};
  delParams: any = {};
  infiniteScrollState = !0;
  size = 20;
  url = "";
  delUrl = "";
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public cp: CommonProvider
  ) {}

  @Input() organs = []; //制片人收藏
  ionViewDidLoad() {
    if (this.cp.u.type == 2) {
      this.url = "collection/getList";
    } else if(this.cp.u.type == 1){
      this.url="producer_collection/getList";
    }
    this.page == 0 && this.doInfinite();
  }

  //艺人删除组训的收藏
  confirmDel(id,i) {
    this.delParams = {
      collection_id: id,
      silent:true
    };    
    if (this.cp.u.type == 2) {
      this.delUrl = "collection/add";
    } else if(this.cp.u.type == 1){
      this.delUrl="producer_collection/getList";
    }
    this.cp.prompt("删除收藏", "确认删除该收藏？", "取消", () => { }, "删除", () => {
      this.cp.getData(this.delUrl, this.delParams).then((res: any) => {
        if(res.status==1){
          this.cp.toast(res.msg);
          this.items.splice(i,1); 
        }else {
          this.cp.toast(res.msg);
        }
      })  
    })
  }
  //制片人收藏
  collectList() {
    this.cp.getData("collection/getList", {
        // producer_id: 2,
        user_id: 1,
        uid: 5
      })
      .then((res: any) => {
        this.organs = res.data;
        console.log(res, "这是制片人的收藏");
      });
  }

  doInfinite() {
    this.params = {
      p: ++this.page,
      numPerPage: this.size
    };
    if(this.cp.u.type==1){
      this.params.producer_id = this.cp.u.id
    }
    this.cp.getData(this.url, this.params).then((e: any) => {
      if (e.data.length > 0) {
        this.res = e;
        this.items = this.items.concat(this.res.data);
        this.infiniteScroll.complete();
        if (this.items.length > 0 && this.cp.u.type == 1) {
          console.log('没排序')
          // setTimeout(() => {
          //   this.cp.getNode();
          // }, 100);
        }
        if (this.items.length == this.res.total) {
          this.infiniteScrollState = !1;
          this.infiniteScroll.enable(this.infiniteScrollState);
        } else {
          this.infiniteScrollState = !0;
          this.infiniteScroll.enable(this.infiniteScrollState);
        }
      } else {
        this.infiniteScrollState = !1;
        this.infiniteScroll.enable(this.infiniteScrollState);
      }
    });
  }
}
