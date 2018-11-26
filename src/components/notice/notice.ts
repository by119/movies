import { Component, Input } from '@angular/core';
import { CommonProvider } from "../../providers/common/common";
@Component({
  selector: 'notice',
  templateUrl: 'notice.html'
})
export class NoticeComponent {
  @Input('item') item;
  constructor(public cp: CommonProvider) { }

}
