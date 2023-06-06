import { Injectable } from '@angular/core';
import { Currency } from './Types/calculator-types';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {

  constructor() { }
  public $currencies = new BehaviorSubject<Currency[]>([]);
  public periods: number[] = [];

  public getCurrencies() {
    const currencyPromice = new Promise<Currency[]>(resolve => {
      resolve(this.currencyArray)
    })
    currencyPromice
      .then(cur => this.$currencies.next(cur))
  };

  public get currencies() {
    return this.$currencies.value
  }

  public getPeriods() {
    const periodPromice = new Promise<number[]>(resolve => {
      resolve(this.periodArray)
    })
    periodPromice
      .then(per => this.periods = per)
  }

  private currencyArray = [
    {abr: 'TUSD', title: 'Test US Dollar', sumbol: '$', percent: 12},
    {abr: 'TEUR', title: 'Test Euro', sumbol: '€', percent: 13},
    {abr: 'TCNY', title: 'Test Chineze Yuan', sumbol: '㍐', percent: 20},
    {abr: 'TINR', title: 'Test Indian Rupee', sumbol: '૱', percent: 19},
    {abr: 'TUA', title: 'Test Ukrainian Hryvnia', sumbol: '₴', percent: 21},
    {abr: 'TBP', title: 'Test British Pound', sumbol: '£', percent: 10},
    {abr: 'TJY', title: 'Test Japanese Yen', sumbol: '¥', percent: 14},
  ]

  private periodArray = [
    1, 3, 6, 12, 24
  ]
}
