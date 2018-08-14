import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CadastrarPage } from '../pages/cadastrar/cadastrar';
import { DividaProvider } from '../providers/dividas/dividas-provider';
import { RendaProvider } from '../providers/rendas/rendas-provider';
import { RendaPage } from '../pages/renda/renda';

@NgModule({
    declarations: [
        MyApp,
        HomePage,
        CadastrarPage,//Import da nova página
        RendaPage
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp),
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        CadastrarPage,//Import da nova página        
        RendaPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        { provide: ErrorHandler, useClass: IonicErrorHandler },
        DividaProvider,//Import novos providers
        RendaProvider
    ]
})
export class AppModule { }
