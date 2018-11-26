import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CommonProvider } from "../../providers/common/common";
/**
 * Generated class for the LegalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({ name: 'legal' })
@Component({
  selector: 'page-legal',
  templateUrl: 'legal.html',
})
export class LegalPage {

  constructor(public navCtrl: NavController,
    public cp: CommonProvider,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
  }
}
