export class OrderDTO{
    
    public bestellID:number;
    public warenkorbID:number;
    public lieferadresse:number;
    public rechnungsadresse:number;
    public bezahlt: number;
    public datum:Date;

    construtor(bestellID:number,warenkorb:number, lieferadresse:number
        ,rechnungsadresse:number,bezahlt:number, datum:Date ){
        this.bestellID = bestellID;
        this.warenkorbID = warenkorb;
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
}