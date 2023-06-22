import {Address} from "./address";

export class AddressDTO implements Address {
  adresseID: number;
  strasse: string;
  hausnummer: string;
  ort: string;
  plz: string;
  land: string;

  constructor(adresseID: number, strasse: string, hausnummer: string, ort: string, plz: string, land: string) {
    this.adresseID = adresseID;
    this.strasse = strasse;
    this.hausnummer = hausnummer;
    this.ort = ort;
    this.plz = plz;
    this.land = land;
  }

  getAddress() {
    return {
      adresseID: this.adresseID,
      strasse: this.strasse,
      hausnummer: this.hausnummer,
      ort: this.ort,
      plz: this.plz,
      land: this.land
    }
  }


}
