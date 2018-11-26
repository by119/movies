import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { CommonProvider } from "../../providers/common/common";
/**
 * Generated class for the AlbumDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({ 
  name: "album-detail"
})
@Component({
  selector: "page-album-detail",
  templateUrl: "album-detail.html"
})
export class AlbumDetailPage {
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public cp:CommonProvider
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad AlbumDetailPage");
    this.photosArr();
  }
  photoarrInfo = [];
  photosArr(){
    this.cp.getDataInfo("areist_album/getlist",{
      id:this.navParams.get("id")
    }).then((res:any) => {
      this.photoarrInfo = res.data[0].pics;
    })
  }
}
