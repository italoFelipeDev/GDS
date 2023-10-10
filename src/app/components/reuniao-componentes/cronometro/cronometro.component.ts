import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cronometro',
  templateUrl: './cronometro.component.html',
  styleUrls: ['./cronometro.component.scss']
})
export class CronometroComponent implements OnInit {

  seconds: number = 0;
  minutes: number = 0;
  hours: number = 0;

  secondsDisplay: string = "00";
  minutesDisplay: string = "00";
  hoursDisplay: string = "00";

  isStop: boolean = true;

  timer: NodeJS.Timeout;

  @Input() isLocutor: boolean = false;

  @Input() tempoExtrapoladoDaily: number;

  @Input() tempoExtrapoladoLocutor: number;
  private readonly BRANCO = '#EDE7E3';

  constructor(
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
  }

  padTimer(number: number): string {
    return number < 10 ? `0${number}` : number.toString();
  }
  updateTimer() {
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
    if (this.isStop) {
      this.isStop = false;
      this.timer = setInterval(() => {
        this.updateTimer();
      }, 1000);
    }
  }

  stopTimer() {
    this.isStop = true;
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

  istempoExtrapoladoLocutor(): string{
    return this.minutes >= this.tempoExtrapoladoLocutor ? 'red' : this.BRANCO;
  }

  istempoExtrapoladoDaily(): string{
    return this.minutes >= this.tempoExtrapoladoDaily ? 'red' : this.BRANCO;
  }

  getTempoExtrapoladoLocutor(): number{
    return this.tempoExtrapoladoLocutor;
  }
}
