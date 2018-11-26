import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CommonProvider } from "../../providers/common/common";

/**
 * Generated class for the AddAlbumPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({ name: 'add-album' })
@Component({
  selector: 'page-add-album',
  templateUrl: 'add-album.html',
})
export class AddAlbumPage {
  @ViewChild('form') form;
  @ViewChild('form2') form2;
  albumName = "";//相册名
  cardImg = ""; //相册封面
  photoImg = ""; //上传的照片
  photoImgs: any = []; //上传到相册的照片
  cardformElem: any;  // 上传相册封面的组件
  cardElem: any;      // 上传相册封面的组件
  photoformElem: any; // 上传照片的组件
  photoElem: any;     // 上传照片的组件
  addShow2 = true;
  isShowImg2 = false;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public cp: CommonProvider) {
  }

  ionViewDidLoad() {
    this.photoformElem = this.form2.nativeElement;
    this.photoElem = this.photoformElem.firstElementChild;
    this.imgList();
  }

  // 获取图片
  imgList(){
    this.cp.getData("areist_album/getlist",{
      id:this.navParams.get("id")
    }).then((res:any) => {
      if (res.data[0].pics != []) {
        this.addShow2 = false;
        this.isShowImg2 = true;
        this.photoImgs = res.data[0].pics;
        this.albumName = res.data[0].title;
      }else{
        this.addShow2 = true;
        this.isShowImg2 = false;
      }
      
      console.log(this.photoImgs,'图片相册的列表')
    })
  }

  photoUploadImg() {
    this.cp.getData('upload/index', new FormData(this.photoformElem)).then((res: any) => {
      if (res.code != 0) {
        this.cp.toast(res.msg.indexOf('大小不符') > 0 ? '图片需小于5M' : res.msg);
      } else {
        this.photoImg = this.cp.SITE_URL + res.data.name;
        this.photoImgs.push(this.photoImg);
      }
      if (res.code == 0) {
        this.addShow2 = false;
        this.isShowImg2 = true;
      }
    });
    this.photoElem.value = '';
  }
  addPhotoImg() {
    if (this.photoImgs.length >= 20) {
      this.cp.toast('最多只能上传20张');
    } else {
      this.photoElem.click();
    }
  }
  confirmDelPhoto(i) {
    this.photoImgs.splice(i, 1);
  }
  saveBtn() {
    if (!this.albumName) {
      this.cp.toast("相册名不能为空");
      return false;
    }
    if (this.photoImgs.length <= 0) {
      this.cp.toast("照片不能为空");
      return false;
    }
    this.cp.getData('areist_album/add', {
      title: this.albumName,
      pic: this.photoImgs
    }).then((res: any) => {
      if (res.msg == "上传成功") {
        this.cp.toast("添加成功");
        // this.cp.goto({view:'intro'})
        this.cp.pop();
      } else {
        this.cp.toast("请完善信息！")
      }
    });
  }
}
