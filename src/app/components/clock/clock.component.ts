import { Component, OnInit } from '@angular/core';
import { TimeService } from '../../services/time/time.service';
import { data } from '../../data/data';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.css']
})
export class ClockComponent implements OnInit {
  data = data;
  minutes: number;
  hours: number;

  constructor(private timeService: TimeService) { }

  ngOnInit() {
    this.subscribeToTime();
  }

  subscribeToTime(): void {
    this.timeService.getCurrentTime().subscribe(val => {
      this.minutes = val.getMinutes();
      this.hours = val.getHours();
      this.highlightChars();
    });
  }

  highlightChars(): void {
    let minRange: number[];
    data.forEach(row => {
      row.forEach(char => {
        if (char.type === 'minutes') {
          minRange = this.getTimeRange(char.onNums);
          char.active = minRange.includes(this.minutes)
        }

        if (char.type === 'hour') {
          char.active = char.onNums.includes(this.pastToHours());
        }
      });
    })
  }

  pastToHours() {
    return (this.minutes > 34) ? this.hours + 1 : this.hours;
  }

  getTimeRange(times: number[]): number[] {
    let range: number[] = [];

    times.forEach(num => {
      for (let i = num; i < num + 5; i++) {
        range.push(i);
      }
    });

    return range;
  }

}
