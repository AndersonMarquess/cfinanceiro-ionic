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
    totalDisponivel: number = 0;
    isSaldoPositivo: boolean = true;
    
    dividaTotalLongoPrazo: number = 0;
    rendaLongoPrazo: number = 0;
    totalDisponivelLongoPrazo: number = 0;
    isSaldoPositivoLongoPrazo: boolean = true;


    constructor(public navCtrl: NavController, public dividaProvider: DividaProvider) {
    }


    ionViewDidEnter() {
        this.dividas = this.dividaProvider.findAll();
        this.getResumoDoMes();
        this.getResumoDeLongoPrazo();
    }


    getResumoDoMes() {
        this.dividas.forEach(d => {
            this.dividaTotalMes += parseFloat(d.valor.toString());
        });

        this.totalDisponivel = this.rendaMes - this.dividaTotalMes;
        this.isSaldoPositivo = this.verificarSaldo(this.totalDisponivel);
    }


    verificarSaldo(saldo: number):boolean {
        return saldo >= 0;
    }


    getResumoDeLongoPrazo() {
        let i: number = 1;
        this.dividas.forEach(d => {
            this.dividaTotalLongoPrazo += parseFloat(d.valor.toString()) * parseInt(d.prestacoes.toString());
            i++;
        });
        this.rendaLongoPrazo = this.rendaMes * i;
        this.totalDisponivelLongoPrazo = this.rendaLongoPrazo - this.dividaTotalLongoPrazo;

        this.isSaldoPositivoLongoPrazo = this.verificarSaldo(this.totalDisponivelLongoPrazo);
    }
}
