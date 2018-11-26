import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CommonProvider } from "../../providers/common/common";
/**
 * Generated class for the ArticlePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name:'article'
})
@Component({
  selector: 'page-article',
  templateUrl: 'article.html',
})
export class ArticlePage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public cp:CommonProvider
  ) {
  }
  articleContent = "";
  ionViewDidLoad() {
    this.cp.getDataInfo("article/detail",{
      id:1
    }).then((res:any) => {
      this.articleContent = res;
    })
  }



}
