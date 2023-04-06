import { Component, OnInit } from '@angular/core';
import { getAuth } from "firebase/auth";
import { collection, getDocs} from 'firebase/firestore';
import { Firestore } from '@angular/fire/firestore';
import { Chart, registerables } from 'node_modules/chart.js';

Chart.register(...registerables)

@Component({
  selector: 'app-user-statistics',
  templateUrl: './user-statistics.component.html',
  styleUrls: ['./user-statistics.component.css']
})

export class UserStatisticsComponent implements OnInit {

  userXp: number = 0;
  metal: number = 0;
  plastic: number = 0;
  paper: number = 0;
  level: number = 0;
  auth = getAuth();
  user: undefined;

  constructor(public firestore: Firestore) { }

  async ngOnInit(): Promise<void> {
    const user = this.auth.currentUser;
    if (user) {
      const email = user.email;
      const snapshot = await getDocs(collection(this.firestore, 'levelling_and_xp'));
      snapshot.forEach((doc) => {
          if(doc.data()['email'] == email){
            this.userXp = doc.data()['xp'];
          }
      });
      const statistics = await getDocs(collection(this.firestore, 'recycled_items'));
      statistics.forEach((stat) => {
          if(stat.data()['email'] == email){
            this.metal = stat.data()['metal'];
            this.plastic = stat.data()['plastic'];
            this.paper = stat.data()['paper'];
          }
      });
    }

    this.level = Math.floor(this.userXp/500);

    const myChart = new Chart("myChart", {
      type: 'pie',
      data: {
          labels: [ 'Plastic', 'Paper', 'Metal'],
          datasets: [{
              label: '# of Votes',
              data: [this.plastic, this.paper, this.metal],
              backgroundColor: [
                  '#6464B6',
                  '#E59E03',
                  '#009245'
              ],
              borderColor: [
                  '#6464B6',
                  '#E59E03',
                  '#009245'
              ],
              borderWidth: 1
          }]
      }
  });
  }
}