import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { HttpService } from './http.service';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class GeoLocationService {

  constructor(private geolocation: Geolocation, private http: HttpService, public toast: ToastService) {}

  async getCurrentPosition() {
    try {
      let location = await this.geolocation.getCurrentPosition()
      return location.coords
    } catch (error) {
      this.toast.show("Erro ao buscar sua localização: " + error.message)
    }
  }

  async getReverseGeocoding() {
    let position:any = await this.getCurrentPosition()
    let address:any = await this.http.getReverseGeocoding(position.latitude, position.longitude)

    this.toast.show(address.address.city + ' - ' + address.address.state)

    return address
  }
}
