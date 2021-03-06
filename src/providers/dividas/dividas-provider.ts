import { Divida } from "../../models/divida/divida";
import { Injectable } from "../../../node_modules/@angular/core";

@Injectable()
export class DividaProvider {

    dividas: Array<Divida> = new Array<Divida>();


    public insert(divida: Divida) {
        this.dividas.push(divida);
        localStorage.setItem('dividas', JSON.stringify(this.dividas));
    }


    public findAll(): Array<Divida> {
        let ds = JSON.parse(localStorage.getItem('dividas'));
        if(ds) {
            this.dividas = ds;
        }
        return this.dividas;
    }


    public pagarDivida(divida: Divida) {
        if (divida.prestacoes == 1) {
            this.removerDivida(divida);
        } else {
            let index = this.dividas.indexOf(divida);
            this.dividas[index].prestacoes--; //diminui as prestações em 1

            //Trecho criado por ChadD
            var dataAtualizada = new Date(this.dividas[index].vencimento);
            dataAtualizada.setMonth(dataAtualizada.getMonth() + 1);

            this.dividas[index].vencimento = new Date(dataAtualizada.toISOString()); 
            localStorage.setItem('dividas', JSON.stringify(this.dividas));
        }
    }


    public removerDivida(divida: Divida) {
        let index = this.dividas.indexOf(divida);
        this.dividas.splice(index, 1);//Remove 1 item no index especificado
        localStorage.setItem('dividas', JSON.stringify(this.dividas));
    }


    public editarDivida(dividaAntiga: Divida, dividaNova: Divida) {
        let index = this.dividas.indexOf(dividaAntiga);
        this.dividas[index] = dividaNova;
        localStorage.setItem('dividas', JSON.stringify(this.dividas));
    }
}