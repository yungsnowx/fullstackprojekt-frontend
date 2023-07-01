import {Order} from "./order";

export class OrderDTO implements Order{

    public bestellID:number;
    public warenkorbID:number;
    public lieferadresse:number;
    public rechnungsadresse:number;
    public bezahlt: boolean;
    public datum:Date;

    constructor(bestellID:number,warenkorbID:number, lieferadresse:number
        ,rechnungsadresse:number,bezahlt:boolean, datum:Date ){
        this.bestellID = bestellID;
        this.warenkorbID = warenkorbID;
        this.lieferadresse = lieferadresse;
        this.rechnungsadresse = rechnungsadresse;
        this.bezahlt = bezahlt;
        this.datum = datum
    }

    getOrderDTO(){
        return {
            bestellID: this.bestellID,
            warenkorbID: this.warenkorbID,
            lieferadresse: this.lieferadresse,
            rechnungsadresse:  this.rechnungsadresse,
            bezahlt: this.bezahlt,
            datum: this.datum
        }
    }

    getWithoutId(){
        return {
            warenkorbID: this.warenkorbID,
            lieferadresse: this.lieferadresse,
            rechnungsadresse:  this.rechnungsadresse,
            bezahlt: this.bezahlt,
            datum: this.datum
        }
    }
}
