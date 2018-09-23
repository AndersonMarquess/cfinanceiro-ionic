import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Renda } from '../../models/renda/renda';
import { RendaProvider } from '../../providers/rendas/rendas-provider';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
    selector: 'page-renda',
    templateUrl: 'renda.html',
})
export class RendaPage {

    renda:Renda = new Renda();

    constructor(public navCtrl: NavController, public navParams: NavParams, 
        public rendaProvider: RendaProvider, public alertCtrl: AlertController) {
    }

    salvarRenda() {
        if(this.renda.renda > 0) {
            this.rendaProvider.insert(this.renda);
            this.showAlert('Nova renda adicionado com sucesso!');
            this.navCtrl.setRoot(HomePage);
        } else {
            this.showAlert('Ops, erro ao tentar inserir renda.');
        }
    }


    showAlert(msg:string) {
        const alert = this.alertCtrl.create({
            title: 'Renda',
            subTitle: msg,
            buttons: ['OK']
        });
        alert.present();
    }

    removerRenda() {
        let alert = this.alertCtrl.create({
            title: 'Remover renda',
            message: 'Deseja realmente remover sua renda no valor de R$ '+
                this.rendaProvider.getRenda().renda+' ?',
            buttons: [
                {
                    text: 'Cancelar',
                    role: 'cancel',
                    handler: () => {
                        console.log('Cancelar remover renda clicado.');
                    }
                },
                {
                    text: 'Confirmar',
                    handler: () => {
                        this.rendaProvider.delete();
                        this.navCtrl.setRoot(HomePage);
                    }
                }
            ]
        });
        alert.present();
    }

}
