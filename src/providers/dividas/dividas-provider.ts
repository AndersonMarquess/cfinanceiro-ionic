import { Divida } from "../../models/divida/divida";
import { Injectable } from "../../../node_modules/@angular/core";

@Injectable()
export class DividaProvider {
    
    dividas: Array<Divida> = new Array<Divida>();


    public insert(divida: Divida) {
        this.dividas.push(divida);
        console.log(this.dividas);
    }

    
    public findAll(): Array<Divida> {
        return this.dividas;
    }
}