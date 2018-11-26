import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DemandDetailPage } from './demand-detail';

@NgModule({
  declarations: [
    DemandDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(DemandDetailPage),
  ],
})
export class DemandDetailPageModule {}
