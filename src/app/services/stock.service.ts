import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { ToastService } from './toast.service';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(private http: HttpService, private toast: ToastService, private storage: Storage) { }

  getStockDescription(stock: string) {
    switch (stock) {
      case "ABEV3": return "Ambev S.A."
      case "ITSA4": return "Itaú S.A."
      case "MDIA3": return "M. Dias Branco S.A."
      case "VULC3": return "Vulcabras Azaleia S.A."
      case "EGIE3": return "Engie Brasil Energia S.A."
      case "FLRY3": return "Fleury S.A."
      default: return stock
    }
  }

  private async makeStockRequest(name:string) {
    let response = await this.http.getStocksPrice(name)
    
    if(response["Global Quote"] == undefined) {
      throw new Error("Limite atingido");
    } else {
      return response['Global Quote']  
    }
  }

  async getStockPrice(name:string) {
    try {
      let stock = await this.makeStockRequest(name)
  
      let symbol = stock["01. symbol"].replace(".SAO", "")
  
      stock = {
        description: this.getStockDescription(symbol),
        symbol: symbol,
        price: stock["05. price"],
        high: stock["03. high"],
        low: stock["04. low"],
        change: stock["09. change"],
        percent: stock["10. change percent"],
      }
      
      this.storage.set(name, stock);

      return stock  
    } catch (error) {
      this.toast.show("Limite atingido, buscando do cache")
      return await this.storage.get(name);
    }
  }

}
