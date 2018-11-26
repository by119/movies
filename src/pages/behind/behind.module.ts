import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BehindPage } from './behind';
import { ComponentsModule } from "../../components/components.module";

@NgModule({
  declarations: [
    BehindPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(BehindPage),
  ],
})
export class BehindPageModule {}
