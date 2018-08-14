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


    divida: Divida = new Divida();
    isEdicao: boolean = false;
    dividaAntiga: Divida = null;

    constructor(public navCtrl: NavController, public navParams: NavParams,
        public alertCtrl: AlertController, public dividaProvider: DividaProvider) {
    }


    ionViewDidLoad() {
        //Recebe o parâmetro 'divida' se o mesmo estiver presente
        this.dividaAntiga = this.navParams.get('divida');
        if(this.dividaAntiga) {
            this.isEdicao = true;
            this.divida = this.dividaAntiga;
        }
    }


    criarDivida() {
        if (this.divida.descricao && this.divida.valor && this.divida.prestacoes && this.divida.vencimento) {

            if (this.isEdicao) {
                this.editar();
            } else {
                this.dividaProvider.insert(this.divida);
                this.showAlert('Nova dívida cadastrada com sucesso!');
            }
            this.divida = new Divida();

            //push: muda a página e cria o botão de voltar
            //setRoot: para impedir o botão de voltar
            this.navCtrl.setRoot(HomePage);
        } else {
            this.showAlert('Erro ao tentar criar nova dívida.');
        }
    }


    showAlert(msg: string) {
        const alert = this.alertCtrl.create({
            title: 'Nova dívida',
            subTitle: msg,
            buttons: ['OK']
        });
        alert.present();
    }


    editar() {
        this.isEdicao = false;
        this.dividaProvider.editarDivida(this.dividaAntiga, this.divida);
        this.dividaAntiga = null;
        this.showAlert('Dívida atualizada com sucesso!');
    }
}