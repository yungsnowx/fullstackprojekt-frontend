import { AddressDTO } from "./addressDTO";

describe("address", () =>{
    it("should create an address",() =>{
        expect(new AddressDTO()).toBeTruthy;
    })
})