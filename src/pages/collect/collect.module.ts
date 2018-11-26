import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CollectPage } from './collect';
import { ComponentsModule } from "../../components/components.module";
@NgModule({
  declarations: [
    CollectPage,
  ],
  imports: [
    IonicPageModule.forChild(CollectPage),
    ComponentsModule
  ],
})
export class CollectPageModule {}
