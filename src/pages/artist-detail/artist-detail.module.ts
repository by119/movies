import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ArtistDetailPage } from './artist-detail';
import { ComponentsModule } from "../../components/components.module";

@NgModule({
  declarations: [
    ArtistDetailPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(ArtistDetailPage),
  ],
})
export class ArtistDetailPageModule {}
