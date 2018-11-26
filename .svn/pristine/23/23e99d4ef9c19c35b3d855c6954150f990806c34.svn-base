import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { CommonProvider } from "../../providers/common/common";

@IonicPage({ name: "date-modify" })
@Component({
  selector: "page-date-modify",
  templateUrl: "date-modify.html"
})
export class DateModifyPage {
  date0 = !1;
  date1 = !1;
  monthListState = !1;
  monthState: any = [!1, !1, !1, !1, !1, !1];
  experience: any = [];
  schedule: any = "";
  monthList = [];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public cp: CommonProvider
  ) {}
  ionViewDidLoad() {
    this.cp.getData("areist_morietheaterschedule/time", {}).then((res: any) => {
      let data = res.data,
      monthArr: any = "",
      exp: any = "";
      this.schedule = res.schedule;
      this.monthList = [];
      this.experience = [];
      for (let i = 0; i < data.length; i++) {
        monthArr = { month: data[i][0], val: data[i][1] };
        this.monthList.push(monthArr);
        let state = data[i][2]&&data[i][2].grade ? 1 : 0;
        if (this.schedule == "") {
          this.monthState[i] = data[i][2] ? data[i][2].grade : !1;
        } else {
          this.monthState[i] = !1;
        }
        exp = { month: data[i][1], grade: state };
        this.experience.push(exp);
      }
    });
  }
  updateDateState(type) {
    if (type == 0) {
      this.date1 = this.date0 ? !this.date0 : !1;
      this.monthListState = !1;
    }
    if (type == 1) {
      this.date0 = this.date1 ? !this.date1 : !1;
      this.monthListState = !0;
      if (this.date1 == !1) {
        for (let i = 0; i < this.monthState.length; i++) {
          this.monthState[i] = this.date1;
        }
      }
    }
  }
  // 修改每月档期
  updateMonth() {
    let count = 0;
    for (let i = 0; i < this.monthState.length; i++) {
      if (this.monthState[i]) {
        count++;
      }
    }
    this.date1 = count > 0 ? !0 : !1;
  }
  // 确认修改档期
  confirm() {
    if (!this.monthListState) {
      this.schedule = !1;
      for (let i = 0; i < this.experience.length; i++) {
        this.experience[i].grade = 0;
      }
    } else {
      let count = 0;
      for (let i = 0; i < this.experience.length; i++) {
        let state = this.monthState[i] ? 1 : 0;
        if (this.monthState[i]) {
          count++;
        }
        this.experience[i].grade = state;
      }
      this.schedule = count > 0 ? "" : !0;
    }
    this.cp
      .getData("areist_morietheaterschedule/add", {
        schedule: this.schedule,
        experience: this.experience
      })
      .then((res: any) => {
        this.cp.pop();
      });
  }
}
