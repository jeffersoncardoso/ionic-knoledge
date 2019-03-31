import { Component, OnInit } from '@angular/core';
import { GeoLocationService } from 'src/app/services/geo-location.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  public address;

  constructor(private geo: GeoLocationService) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.geo.getReverseGeocoding().then((address) => { this.address = address })
  }

}
