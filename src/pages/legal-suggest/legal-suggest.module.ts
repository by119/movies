import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LegalSuggestPage } from './legal-suggest';

@NgModule({
  declarations: [
    LegalSuggestPage,
  ],
  imports: [
    IonicPageModule.forChild(LegalSuggestPage),
  ],
})
export class LegalSuggestPageModule {}
