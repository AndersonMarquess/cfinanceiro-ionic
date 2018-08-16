import { Injectable } from "@angular/core";
import { Renda } from "../../models/renda/renda";

@Injectable()
export class RendaProvider {

    renda:Renda = new Renda();

    public insert(renda:Renda) {
        localStorage.setItem('renda', JSON.stringify(renda));
        this.renda = renda;
    }

    public getRenda(): Renda {
        let r = JSON.parse(localStorage.getItem('renda'));
        if(r) {
            return this.renda = r;
        }
        return this.renda;
    }
}