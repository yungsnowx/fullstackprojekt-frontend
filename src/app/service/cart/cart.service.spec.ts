import {TestBed} from '@angular/core/testing'
import {HttpClientTestingModule,HttpTestingController} from "@angular/common/http/testing"
import { CartService } from './cart.service'
import { CartDTO } from 'src/app/model/cart/cartDTO';

describe("CartService",() =>{
    let cartService:CartService;
    let testingController:HttpTestingController
    beforeEach(() =>{
        TestBed.configureTestingModule({
            imports:[HttpClientTestingModule],
            providers:[CartService]
        });
        cartService = TestBed.inject(CartService)
        testingController = TestBed.inject(HttpTestingController)
    });
    it('should be created',() =>{
        expect(cartService).toBeTruthy();
    })
    
    it("should get the cart with the cart number 1",() =>{
        let cart = new CartDTO(1,1,true)
        cartService.getCartbyId(1).subscribe(
            data => {
                expect(data).toEqual(cart.getCart())                
            })
        const request = testingController.expectOne("/warenkorb/:1")
        expect(request.request.method).toEqual("GET")
        request.flush(cart.getCart())
        testingController.verify()
    })
    it("should get the cart with the userId 1",() => {
        let cart = new CartDTO(1,1,true)
        cartService.getCartByUserId("1").subscribe(
            data =>{
                expect(data).toEqual(cart)
            }
        )
        const request = testingController.expectOne("/warenkorb/user/1")
        expect(request.request.method).toEqual("GET")
        request.flush(cart)
        testingController.verify()
    })
})