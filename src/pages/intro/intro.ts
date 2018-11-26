import { Component, ViewChild } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { CommonProvider } from "../../providers/common/common";

@IonicPage({ name: "intro" })
@Component({
  selector: "page-intro",
  templateUrl: "intro.html"
})
export class IntroPage {
  @ViewChild("form") form;
  videoformElem: any; // 上传视频的组件
  videoElem: any; // 上传视频的组件
  videoUrl = ""; // 上传的video地址
  dataList: any = [];//艺人档期
  actionerInfo = ""; //艺人信息资料
  introList: any = []; //艺人工作经历
  albumList = []; //艺人相册
  videoList = []; //艺人视频
  schedule = ""; //艺人档期状态  ''：详细档期   true:有档期   false:无档期
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public cp: CommonProvider
  ) {}
  ionViewWillEnter() {
    this.cp.checkLogin().then(loaded => {
      if (loaded) {
        this.expriceList(); //艺人工作经历
        this.monthList(); //艺人档期
        this.actiorDetail(); //艺人详情
        this.actorPhotoList(); //艺人相册
        this.videoLists(); //艺人视频
      }
    });
  }
  ionViewDidLoad() {
    this.videoformElem = this.form.nativeElement;
    this.videoElem = this.videoformElem.firstElementChild;
  }

  // 艺人详情
  actiorDetail() {
    this.cp.getData("user_profile/getlist", {}).then((res: any) => {
      if (res.data[0]) {
        this.actionerInfo = res.data[0];
      } else {
        this.cp.goto({ view: "checkin" });
      }
    });
  }

  // 艺人工作经历
  expriceList() {
    this.cp.getData("areist_experience_of_employment/getlist", {}).then((res: any) => {
      this.introList = res.data;
    });
  }
  monthList() {
    this.cp.getData("areist_morietheaterschedule/time", {}).then((res: any) => {
      let data = res.data;
      let exp: any = "";
      let state: any = "";
      this.dataList = [];
      for (let i = 0; i < data.length; i++) {
        state = data[i][2]&&data[i][2].grade ? 1 : 0;
        exp = { month: data[i][0], grade: state };
        this.dataList.push(exp);
      }
      this.schedule = res.schedule;
    });
  }
  // 艺人相册
  actorPhotoList() {
    this.cp.getData("areist_album/getlist", {}).then((res: any) => {
      this.albumList = res.data;
    });
  }

  // 艺人视频
  videoLists() {
    this.cp.getData("areist_video/getlist", {silent: true}).then((res: any) => {
      this.videoList = res.data;
    });
  }

  confirmDelWork(id, i) {
    this.cp.prompt("删除工作经历","确认删除工作经历？","取消",() => {},"删除",() => {
        this.cp.getData("areist_experience_of_employment/del", {
          id: id
        }).then((res: any) => {
          if (res.status == 1) {
            this.cp.toast(res.msg);
            // this.cp.toast('删除成功');
            this.introList.splice(i, 1);
          }
        });
      }
    );
  }
  confirmDelAlbum(id, i) {
    this.cp.prompt("删除相册","确认删除相册？","取消",() => {},"删除",() => {
        this.cp.getDataInfo("areist_album/del", {
          id: id
        }).then((res: any) => {
          if (res.status == 1) {
            this.cp.toast(res.msg);
            // this.cp.toast('删除成功');
            this.albumList.splice(i, 1);
          }
        });
      }
    );
  }
  videoUploadImg() {
    this.cp.getData("upload/index", new FormData(this.videoformElem)).then((res: any) => {
        if (res.code != 0) {
          this.cp.toast(
            res.msg.indexOf("大小不符") > 0 ? "图片需小于5M" : res.msg
          );
        } else {          
          this.cp.getData("areist_video/add",{
            video:this.cp.SITE_URL + res.data.name
          }).then((res:any) => {
            if(res.data.code==0){
              this.videoList.push(res.data.data);
            }
          })
        }
      });
    this.videoElem.value = "";
  }
  addVideo() {
    this.videoElem.click();
  }
  // 刪除视频
  confirmDelVideo(id, i) {
    this.cp.prompt("删除视频","确认删除视频？","取消",() => {},"删除",() => {
        this.cp.getData("areist_video/del", {
          id: id
        })
        .then((res: any) => {
          if(res.status==1){
            this.cp.toast(res.msg);
            this.videoList.splice(i, 1);
          }
        });
      }
    );
  }
}
