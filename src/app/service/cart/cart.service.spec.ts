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
        cartService.getCartbyId(1).subscribe(
            data => {
                console.log(data)
                expect(data).toEqual(new CartDTO(1,1,true))                }
            )
        const req = testingController.expectOne("/warenkorb/:1")
        expect(req.request.method).toEqual("GET")
        req.flush(new CartDTO(1,1,true))
        testingController.verify()
    })
    
    
})