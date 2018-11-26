import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StudioIntroductionsPage } from './studio-introductions';
import { ComponentsModule } from "../../components/components.module";
@NgModule({
  declarations: [
    StudioIntroductionsPage,
  ],
  imports: [
    IonicPageModule.forChild(StudioIntroductionsPage),
    ComponentsModule
  ],
})
export class StudioIntroductionsPageModule {}
