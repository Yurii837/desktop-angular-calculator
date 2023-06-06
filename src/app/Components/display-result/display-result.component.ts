import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-display-result',
  templateUrl: './display-result.component.html',
  styleUrls: ['./display-result.component.scss']
})
export class DisplayResultComponent {
  @Input() profit: number | null = null;
  @Input() percent: number | null = null;
  @Input() currSymb: string = '';

}
