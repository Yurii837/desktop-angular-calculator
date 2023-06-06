import { Component, OnInit, OnDestroy } from '@angular/core';
import { CalculatorService } from './calculator.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription, debounce, debounceTime } from 'rxjs';
import { Currency } from './Types/calculator-types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  constructor (
    public calculatorService: CalculatorService
    ) { }

    public currSymbol = '';
    public currCurrency = null;
    public currProfit = 0;
    public currPercent = 0;

    public selectedCurrencies: Currency[] = [];

    private formSub = new Subscription();
    private curSub = new Subscription();

    public formGroup = new FormGroup ({
      amount: new FormControl<number | null>(null,  [Validators.min(1000), Validators.max(1000000), Validators.pattern(/^\d*\.?\d{0,2}$/)]),
      currency: new FormControl(null),
      period: new FormControl(null)
    })

  public tabs = [
    {
      title: 'Lorem1',
      someData: 'Lorem ipsum1',
      someDataElse: 'Lorem ipsum dolor sit1',
      tooltip: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus cumque animimollitia ipsam quae fuga voluptatibus aut quia autem nulla corrupti suscipit quam, rem'
    },
    {
      title: 'Lorem2',
      someData: 'Lorem ipsum2',
      someDataElse: 'Lorem ipsum dolor sit2',
      tooltip: 'Lorem ipsum dolor sit amet consectetur adipi aut quia autem nulla corrupti suscipit quam, rem'
    },
    {
      title: 'Lorem3',
      someData: 'Lorem ipsum3',
      someDataElse: 'Lorem ipsum dolor sit3',
      tooltip: 'lit. Minus cumque animi mollitia ipsam quae fuga voluptatibus aut quia autem nulla corrupti suscipit quam, rem'
    },
    {
      title: 'Lorem4',
      someData: 'Lorem ipsum4',
      someDataElse: 'Lorem ipsum dolor sit4',
      tooltip: 'fourth tooltip'
    },
  ];

  ngOnInit(): void {
    this.calculatorService.getCurrencies();
    this.calculatorService.getPeriods();

    this.formSub = this.formGroup.valueChanges
      .subscribe(res => {
        this.calculateProfit();
        if (typeof(res.currency) === 'number') {
          this.currSymbol = this.calculatorService.currencies[res.currency].sumbol;
          this.currCurrency = res.currency;
        }
      })

    this.curSub = this.calculatorService.$currencies
      .subscribe(curr => {
        this.selectedCurrencies = curr;
      })
  }

  public onKey(event: any) { 
    this.selectedCurrencies = this.search(event.target.value);
  };

  private search(value: string) { 
    let filter = value.toLowerCase();
    
    return this.calculatorService.currencies.filter(option => {
      return (option.title.toLowerCase() + option.abr.toLowerCase()).includes(filter)
    });
  };

  private calculateProfit() {
    if (this.formGroup.valid) {
      const amount = this.formGroup.value.amount || 0;
      const currency = this.formGroup.value.currency;
      const period = this.formGroup.value.period || 0;

      if (typeof(currency) === 'number') {
        this.currProfit = +((this.calculatorService.currencies[currency].percent / 100 + 1) * amount * period / 12).toFixed(2);
        this.currPercent = Math.round(this.currProfit / amount * 100) || 0;
      }
    }
  };

  public reduxAmount(amount: number) {
      const currAmount = this.formGroup.value.amount || 0;
      if (currAmount > 2 * amount) {
        this.formGroup.controls.amount.setValue(currAmount - amount)
      } else if (currAmount > amount) {
        this.formGroup.controls.amount.setValue(amount)
      }
  };

  public increaseAmount(amount: number) {
    const currAmount = this.formGroup.value.amount || 0;
      if (currAmount < 99 * amount) {
        this.formGroup.controls.amount.setValue(currAmount + amount)
      } else if (currAmount < 100 * amount) {
        this.formGroup.controls.amount.setValue(100 * amount)
      }
  };

  ngOnDestroy(): void {
    this.formSub.unsubscribe()
    this.curSub.unsubscribe()
  };
}
