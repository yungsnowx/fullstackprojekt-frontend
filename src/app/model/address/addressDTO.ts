import { Address } from "./address";

export class AddressDTO implements Address{

    addressID?: number;
    strasse?: string;
    hausnummer?: string;
    ort?: string;
    plz?: string;
    land?: string;
    
    constructor(addressID?:number,strasse?:string,hausnummer?:string,ort?:string,plz?:string,land?:string){
        this.addressID = addressID;
        this.strasse = strasse;
        this.hausnummer = hausnummer;
        this.ort = ort;
        this.plz = plz;
        this.land = land;
    }
    get_address(){
        return {
            addressID: this.addressID,
            strasse: this.strasse,
            hausnummer: this.hausnummer,
            ort: this.ort,
            plz: this.plz,
            land: this.land
        }
    }
    

}