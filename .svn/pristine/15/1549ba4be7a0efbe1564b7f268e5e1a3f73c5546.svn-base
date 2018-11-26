import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,InfiniteScroll,Content } from 'ionic-angular';
import {CommonProvider} from "../../providers/common/common";
/**
 * Generated class for the LetterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({ name: 'letter' })
@Component({
  selector: 'page-letter',
  templateUrl: 'letter.html',
})
export class LetterPage {
  @ViewChild(InfiniteScroll) infiniteScroll: InfiniteScroll;
  @ViewChild(Content) content: Content;
  organs = [];
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

  ionViewDidLoad() {
    this.doInfinite();
  }
  // 上拉加载
  doInfinite() {
    this.params = {
      p: ++this.page,
      numPerPage: this.size
    }
    this.cp.getData("annunciate/myMessage", this.params).then((e: any) => {
      if (e.data.length > 0) {
        this.res = e;
        this.organs = this.organs.concat(this.res.data);
        this.infiniteScroll.complete();
        if (this.organs.length == this.res.total) {
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
