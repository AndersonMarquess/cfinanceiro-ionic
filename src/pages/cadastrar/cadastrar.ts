import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { Divida } from '../../models/divida/divida';
import { DividaProvider } from '../../providers/dividas/dividas-provider';
import { HomePage } from '../home/home';


@IonicPage()
@Component({
    selector: 'page-cadastrar',
    templateUrl: 'cadastrar.html',
})
export class CadastrarPage {


    public divida: Divida = new Divida();


    constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public dividaProvider: DividaProvider) {
    }


    ionViewDidLoad() {
        console.clear();
    }


    criarDivida() {
        if (this.divida.descricao && this.divida.valor && this.divida.prestacoes && this.divida.vencimento) {
            this.dividaProvider.insert(this.divida);
            this.divida = new Divida();
            this.showAlert('Nova dívida cadastrada com sucesso!');

            //push: muda a página e cria o botão de voltar
            //setRoot: para impedir o botão de voltar
            this.navCtrl.setRoot(HomePage);
        } else {
            this.showAlert('Erro ao tentar criar nova dívida.');
        }
    }


    showAlert(msg:string) {
        const alert = this.alertCtrl.create({
            title: 'Nova dívida',
            subTitle: msg,
            buttons: ['OK']
        });
        alert.present();
    }
}