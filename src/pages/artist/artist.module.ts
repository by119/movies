import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ArtistPage } from './artist';
import { ComponentsModule } from "../../components/components.module";

@NgModule({
  declarations: [
    ArtistPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(ArtistPage),
  ],
})
export class ArtistPageModule {}
