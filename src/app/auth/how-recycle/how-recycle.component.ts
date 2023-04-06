import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';

@Component({
  selector: 'app-how-recycle',
  templateUrl: './how-recycle.component.html',
  styleUrls: ['./how-recycle.component.css']
})
export class HowRecycleComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    AOS.init();
    
      var uluru = [{ lat: 46.9089896499704, lng: 23.814345169730142 },
                   { lat: 46.77130215233844, lng: 23.58917393584071 },
                   { lat: 46.77615918804148, lng: 23.6050981032797}];

      //The map, centered at Uluru
      var map1 = new google.maps.Map(document.getElementById('TSMap') as HTMLElement,
        {
          zoom: 4,
          center: uluru[2],
        }
      );
    
      //The marker, positioned at Uluru
      var marker;
      for(let i=0;i<uluru.length;i++){
       marker = new google.maps.Marker({
        position: uluru[i],
        map: map1,
      });
      }
    }
  }
