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

    dividaTotalMes: number = 0;
    rendaMes: number = 0;
    dividaTotalDisponivel: number = 0;
    isSaldoPositivo: boolean = true;

    constructor(public navCtrl: NavController, public dividaProvider: DividaProvider) {
    }


    ionViewDidEnter() {
        this.dividas = this.dividaProvider.findAll();
        this.getResumoDoMes();
    }


    getResumoDoMes() {
        this.dividas.forEach(d => {
            this.dividaTotalMes += parseFloat(d.valor.toString());
        });

        this.dividaTotalDisponivel = this.rendaMes - this.dividaTotalMes;
        this.isSaldoPositivo = this.verificarSaldo(this.dividaTotalDisponivel);
    }


    verificarSaldo(saldo: number):boolean {
        return saldo >= 0;
    }


}
