import { Component, ViewChild, Input } from "@angular/core";
import { IonicPage, NavController, NavParams, InfiniteScroll, Content } from "ionic-angular";
import { CommonProvider } from "../../providers/common/common";
@IonicPage({ name: "promo" })
@Component({
  selector: "page-promo",
  templateUrl: "promo.html"
})
export class PromoPage {
  @ViewChild(InfiniteScroll) infiniteScroll: InfiniteScroll;
  @ViewChild(Content) content: Content;
  tabs: any = "1";
  items = [[], []];
  page = [0, 0];
  res = [];
  params: any = {};
  infiniteScrollState = [!0, !0];
  size = 20;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public cp: CommonProvider
  ) {}
  ionViewWillEnter(){
    this.page[this.tabs] == 0 && this.doInfinite();
  }

  ionViewDidLoad() {
    // this.page[this.tabs] == 0 && this.doInfinite();
  }

  changeSeg() {
    0 == this.page[this.tabs] && this.doInfinite();
    this.infiniteScroll.enable(this.infiniteScrollState[this.tabs]);
  }

  doInfinite() {
    this.params = {
      is_completed: this.tabs,
      p: ++this.page[this.tabs],
      numPerPage: this.size
    };
    this.cp.getDataInfo("annunciate/getList", this.params).then((e: any) => {
      if (e.data.length > 0) {
        this.res[this.tabs] = e;
        this.items[this.tabs] = this.items[this.tabs].concat(
          this.res[this.tabs].data
        );
        this.infiniteScroll.complete();
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
    });
  }
}
