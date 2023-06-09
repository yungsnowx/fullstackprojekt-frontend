import { Address } from "./address";

export class AddressDTO implements Address{
    
    strasse?: string;
    hausnummer?: string;
    ort?: string;
    plz?: string;
    land?: string;
    
    constructor(strasse?:string,hausnummer?:string,ort?:string,plz?:string,land?:string){
        
        this.strasse = strasse;
        this.hausnummer = hausnummer;
        this.ort = ort;
        this.plz = plz;
        this.land = land;
    }
    get_address(){
        return {
            strasse: this.strasse,
            hausnummer: this.hausnummer,
            ort: this.ort,
            plz: this.plz,
            land: this.land
        }
    }
    

}