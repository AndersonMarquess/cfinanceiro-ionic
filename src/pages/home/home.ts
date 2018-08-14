import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { DividaProvider } from '../../providers/dividas/dividas-provider';
import { Divida } from '../../models/divida/divida';
import { RendaProvider } from '../../providers/rendas/rendas-provider';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    dividas: Array<Divida>;

    dividaTotalMes: number = 0;
    rendaMes: number = 0;
    totalDisponivel: number = 0;
    isSaldoPositivo: boolean = true;

    dividaTotalLongoPrazo: number = 0;
    rendaLongoPrazo: number = 0;
    totalDisponivelLongoPrazo: number = 0;
    isSaldoPositivoLongoPrazo: boolean = true;


    constructor(public navCtrl: NavController, public dividaProvider: DividaProvider, public rendaProvider: RendaProvider, public alertCtrl: AlertController) {
    }


    ionViewDidEnter() {
        this.dividas = this.dividaProvider.findAll();
        if (this.rendaProvider.getRenda()) {
            this.rendaMes = this.rendaProvider.getRenda().renda;
        }
        this.getResumoDoMes();
        this.getResumoDeLongoPrazo();
    }


    getResumoDoMes() {
        let mesAtual = new Date().getMonth();
        
        this.dividas.forEach(d => {
            if(mesAtual >= new Date(d.vencimento).getMonth())
                this.dividaTotalMes += parseFloat(d.valor.toString());
        });

        this.totalDisponivel = this.rendaMes - this.dividaTotalMes;
        this.isSaldoPositivo = this.verificarSaldo(this.totalDisponivel);
    }


    verificarSaldo(saldo: number): boolean {
        return saldo >= 0;
    }


    getResumoDeLongoPrazo() {
        let meses: number = 1;
        this.dividas.forEach(d => {
            this.dividaTotalLongoPrazo += parseFloat(d.valor.toString()) * parseInt(d.prestacoes.toString());
            if (meses < d.prestacoes) {
                meses = d.prestacoes;
            }
        });
        this.rendaLongoPrazo = this.rendaMes * meses;
        this.totalDisponivelLongoPrazo = this.rendaLongoPrazo - this.dividaTotalLongoPrazo;

        this.isSaldoPositivoLongoPrazo = this.verificarSaldo(this.totalDisponivelLongoPrazo);
    }


    pagarDivida(divida: Divida) {
        let alert = this.alertCtrl.create({
            title: 'Dívida paga',
            message: 'Essa dívida foi paga?',
            buttons: [
                {
                    text: 'Cancelar',
                    role: 'cancel',
                    handler: () => {
                        console.log('Cancelar clicado.');
                    }
                },
                {
                    text: 'Confirmar',
                    handler: () => {
                        this.dividaProvider.pagarDivida(divida);
                        this.navCtrl.setRoot(HomePage);
                    }
                }
            ]
        });
        alert.present();
    }
}

