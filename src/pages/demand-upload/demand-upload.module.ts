import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DemandUploadPage } from './demand-upload';

@NgModule({
  declarations: [
    DemandUploadPage,
  ],
  imports: [
    IonicPageModule.forChild(DemandUploadPage),
  ],
})
export class DemandUploadPageModule {}
