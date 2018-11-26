import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { NoticeComponent } from './notice/notice';
import { OrganComponent } from './organ/organ';
import { PeopleComponent } from './people/people';
import { VideoComponent } from './video/video';

//视频播放
import {VgCoreModule} from 'videogular2/core';
import {VgControlsModule} from 'videogular2/controls';
import {VgOverlayPlayModule} from 'videogular2/overlay-play';
import {VgBufferingModule} from 'videogular2/buffering';
import { WorksComponent } from './works/works';

@NgModule({
	declarations: [
		NoticeComponent,
		OrganComponent,
		PeopleComponent,
		VideoComponent,
    WorksComponent
	],
	imports: [
		IonicModule,
		VgCoreModule,
        VgControlsModule,
        VgOverlayPlayModule,
        VgBufferingModule,
	],
	exports: [
		NoticeComponent,
		OrganComponent,
		PeopleComponent,
		VideoComponent,
    WorksComponent
	]
})
export class ComponentsModule { }
