import { Component, OnInit } from '@angular/core';
import { StockService } from 'src/app/services/stock.service';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.page.html',
  styleUrls: ['./stock.page.scss'],
})
export class StockPage implements OnInit {

  public newStock = ""
  public wallet = [
    { name: 'ABEV3', info: null, loading: false },
    { name: 'ITSA4', info: null, loading: false },
    { name: 'VULC3', info: null, loading: false },
    { name: 'FLRY3', info: null, loading: false },
  ]

  constructor(private stockService: StockService) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.updateWallet()

    setInterval(() => {
      this.updateWallet()
    }, 60000)
  }

  async updateWallet() {
    this.wallet.forEach((stock) => {
      setTimeout(() => { this.updateStockInfo(stock) }, 12000)
    });
  }

  updateStockInfo(stock) {
    stock.loading = true
    this.stockService.getStockPrice(stock.name).then((stockInfo) => {
      stock.loading = false
      stock.info = stockInfo
    })
  }

  add() {
    let stock = {
      name: this.newStock, info: null, loading: false
    }
    
    this.wallet.unshift(stock)
    this.updateStockInfo(stock)

    this.newStock = ""
  }

  remove(stock) {
    let index = this.wallet.indexOf(stock)
    this.wallet.splice(index, 1)
  }

}
