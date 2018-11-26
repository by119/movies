import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SuggestionPage } from './suggestion';
import { ComponentsModule } from "../../components/components.module";
@NgModule({
  declarations: [
    SuggestionPage,
  ],
  imports: [
    IonicPageModule.forChild(SuggestionPage),
    ComponentsModule
  ],
})
export class SuggestionPageModule {}
