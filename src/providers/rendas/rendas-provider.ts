import { Injectable } from "@angular/core";
import { Renda } from "../../models/renda/renda";

@Injectable()
export class RendaProvider {

    renda:Renda = new Renda();

    public insert(renda:Renda) {
        this.renda = renda;
    }

    public getRenda(): Renda {
        return this.renda;
    }
}