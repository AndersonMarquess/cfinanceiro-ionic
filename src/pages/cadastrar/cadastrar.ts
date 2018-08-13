import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { Divida } from '../../divida/divida';

@IonicPage()
@Component({
    selector: 'page-cadastrar',
    templateUrl: 'cadastrar.html',
})
export class CadastrarPage {


    public divida: Divida = new Divida();
    dividas: Array<Divida> = new Array<Divida>();


    constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
    }


    ionViewDidLoad() {
        console.clear();
    }


    criarDivida() {
        if (this.divida.descricao && this.divida.valor && this.divida.prestacoes && this.divida.vencimento) {
            this.dividas.push(this.divida);
            this.divida = new Divida();
            console.log(this.dividas);
            this.showAlert();
        } else {
            console.log('Erro ao tentar criar nova dívida');
        }

    }


    showAlert() {
        const alert = this.alertCtrl.create({
            title: 'Nova dívida',
            subTitle: 'Nova dívida cadastrarda com sucesso!',
            buttons: ['OK']
        });
        alert.present();
    }

}