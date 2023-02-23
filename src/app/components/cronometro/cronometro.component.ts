import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cronometro',
  templateUrl: './cronometro.component.html',
  styleUrls: ['./cronometro.component.sass']
})
export class CronometroComponent implements OnInit {

  seconds: number = 0;
  minutes: number = 0;
  hours: number = 0;

  secondsDisplay: string = "00";
  minutesDisplay: string = "00";
  hoursDisplay: string = "00";

  timer: NodeJS.Timeout;
  
  constructor(){}

  ngOnInit(): void {
  }

  padTimer(number: number): string {
    return number < 10 ? `0${number}` : number.toString();
  }
  updateTimer() {
    console.log(this.seconds)
    this.seconds++;
    if (this.seconds >= 60) {
      this.seconds = 0;
      this.minutes++;
      if (this.minutes >= 60) {
        this.minutes = 0;
        this.hours++;
      }
    }

    this.secondsDisplay = this.padTimer(this.seconds);
    this.minutesDisplay = this.padTimer(this.minutes);
    this.hoursDisplay = this.padTimer(this.hours);

  }

  startTimer() {
    this.timer = setInterval(() => {
      this.updateTimer();
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.timer);
  }

  resetTimer() {
    this.seconds = 0;
    this.minutes = 0;
    this.hours = 0;

    this.secondsDisplay = "00";
    this.minutesDisplay = "00";
    this.hoursDisplay = "00";
  }

}
