import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sidecart',
  templateUrl: './sidecart.component.html',
  styleUrls: ['./sidecart.component.scss']
})
export class SidecartComponent {
  @Input() searchValue: string = '';

  @Input() getCartValue: boolean = false;
}
