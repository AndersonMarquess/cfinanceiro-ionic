import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DividaProvider } from '../../providers/dividas/dividas-provider';
import { Divida } from '../../models/divida/divida';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {


    dividas:Array<Divida>;


    constructor(public navCtrl: NavController, public dividaProvider: DividaProvider) {
    }


    ionViewDidEnter() {
        this.dividas = this.dividaProvider.findAll();
    }



}
