import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StudioIdentityPage } from './studio-identity';
import { ComponentsModule } from "../../components/components.module";
@NgModule({
  declarations: [
    StudioIdentityPage,
  ],
  imports: [
    IonicPageModule.forChild(StudioIdentityPage),
    ComponentsModule
  ],
})
export class StudioIdentityPageModule {}
