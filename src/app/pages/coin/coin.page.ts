import { Component, OnInit } from '@angular/core';
import { CoinService } from 'src/app/services/coin.service';

@Component({
  selector: 'app-coin',
  templateUrl: './coin.page.html',
  styleUrls: ['./coin.page.scss'],
})
export class CoinPage implements OnInit {

  public coins;
  constructor(private coin: CoinService) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.coin.getPrice().then((coins) => { this.coins = coins })
  }

}
