import { Component, Input } from '@angular/core';
import { CommonProvider } from "../../providers/common/common";
@Component({
  selector: 'organ',
  templateUrl: 'organ.html'
})
export class OrganComponent {
  @Input('item') item;
  @Input('lastPage') lastPage;
  constructor(public cp: CommonProvider) { }
}
