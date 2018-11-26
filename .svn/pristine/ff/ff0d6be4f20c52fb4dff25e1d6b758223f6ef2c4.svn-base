import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ErrorHandler, NgModule, enableProdMode } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import {CommonProvider} from "../providers/common/common";
import { BackButtonService } from "../providers/common/backButtonService";
import { WechatApi } from "../providers/common/wechatApi";

import {IonicStorageModule} from "@ionic/storage";

import { Network } from '@ionic-native/network';
import { OpenNativeSettings } from '@ionic-native/open-native-settings';
import { ManUpModule, ManUpService, TRANSLATE_SERVICE } from 'ionic-manup';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AppVersion } from '@ionic-native/app-version';
import { AppAvailability } from '@ionic-native/app-availability';
import { PhotoLibrary } from '@ionic-native/photo-library';
// import { SocialSharing } from '@ionic-native/social-sharing';
// import { Clipboard } from '@ionic-native/clipboard';
import { Toast } from '@ionic-native/toast';
import { JPush } from '@jiguang-ionic/jpush';
import { ThemeableBrowser } from '@ionic-native/themeable-browser';

import { ComponentsModule } from "../components/components.module";


import { VgCoreModule } from 'videogular2/core';
import { VgControlsModule } from 'videogular2/controls';
import { VgOverlayPlayModule } from 'videogular2/overlay-play';
import { VgBufferingModule } from 'videogular2/buffering';
// import {SingleMediaPlayer} from './single-media-player';

enableProdMode();
//由于ios的cordova-plugin-ionic-webview插件 cors 的问题 暂时采用远程的json  
export function translateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)?'http://api.maoxuankj.com/api/version/translate/':'./assets/i18n/', '.json');
}
@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    ComponentsModule,
    HttpModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: translateLoader,
        deps: [HttpClient]
      }
    }),
    ManUpModule.forRoot({url: 'http://api.maoxuankj.com/api/version', externalTranslations: true}),
    IonicStorageModule.forRoot(/*{driverOrder: ['sqlite', 'websql', 'indexeddb']}*/),
    IonicModule.forRoot(MyApp, {
      backButtonText: '',
      iconMode: 'ios',//安卓icon强制使用ios的icon以及样式
      mode: 'ios',//样式强制使用ios样式
      tabsHideOnSubPages: true //隐藏子页面tabs
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    BackButtonService,
    // WechatApi,
    CommonProvider,
    StatusBar,
    SplashScreen,
    JPush,
    PhotoLibrary,
    Toast,
    Network,
    OpenNativeSettings,
    AppAvailability,
    AppVersion,
    ManUpService,
    ThemeableBrowser,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    {provide: TRANSLATE_SERVICE, useClass: TranslateService},
  ]
})
export class AppModule { }
