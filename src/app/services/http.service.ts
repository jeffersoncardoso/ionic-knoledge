import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  
  constructor(private http: HttpClient) { }

  getReverseGeocoding(latitude, longitude) {
    let url = "https://nominatim.openstreetmap.org/reverse?format=json&lat=" + latitude + "&lon=" + longitude + "&zoom=18&addressdetails=1"
    return this.http.get(url).toPromise();
  }

  getCoinsPrice() {
    let url = "https://economia.awesomeapi.com.br/all"
    return this.http.get(url).toPromise();
  }

  getStocksPrice(stock) {
    //"O118A5Z5RX5H7H9Q" my api key
    let apiKey = "O118A5Z5RX5H7H9Q" //"9NU0GS3QNZLUM1IO", "MMU8PSJEEWG4CS7W", "QQXO2X0Z9H7011LS", "DAO7XDNY9KMPRDST"

    stock = stock + '.SAO'
    let url = "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=" + stock + "&apikey=" + apiKey
    return this.http.get(url).toPromise();
  }
}
