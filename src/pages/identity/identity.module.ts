import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IdentityPage } from './identity';
import { ComponentsModule } from "../../components/components.module";
@NgModule({
  declarations: [
    IdentityPage,
  ],
  imports: [
    IonicPageModule.forChild(IdentityPage),
    ComponentsModule
  ],
})
export class IdentityPageModule {}
