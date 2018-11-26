import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DemandPage } from './demand';
import { ComponentsModule } from "../../components/components.module";

@NgModule({
  declarations: [
    DemandPage,
  ],
  imports: [
    IonicPageModule.forChild(DemandPage),
    ComponentsModule
  ],
})
export class DemandPageModule {}
