import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DateModifyPage } from './date-modify';

@NgModule({
  declarations: [
    DateModifyPage,
  ],
  imports: [
    IonicPageModule.forChild(DateModifyPage),
  ],
})
export class DateModifyPageModule {}
