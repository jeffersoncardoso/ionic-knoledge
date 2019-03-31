import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class CoinService {

  constructor(private http: HttpService) { }
  
  async getPrice() {
    let coins = await this.http.getCoinsPrice()
    coins = Object.keys(coins).map(function(key) {
      return coins[key];
    });
    
    return coins
  }
}
