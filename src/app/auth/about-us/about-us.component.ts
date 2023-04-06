import { Component, OnInit } from '@angular/core';
import { faCircleCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import * as AOS from 'aos';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css'],
})
export class AboutUsComponent implements OnInit {
  faCircleCheck = faCircleCheck;
  faCircleXmark = faCircleXmark;

  isReadMore1 = true;
  isReadMore2 = true;
  isReadMore3 = true;

  constructor() {}

  ngOnInit(): void {
    AOS.init();
  }

  showText1() {
    this.isReadMore1 = !this.isReadMore1;
  }

  showText2() {
    this.isReadMore2 = !this.isReadMore2;
  }

  showText3() {
    this.isReadMore3 = !this.isReadMore3;
  }
}
