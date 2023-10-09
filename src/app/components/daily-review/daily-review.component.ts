import { Component, Input, OnInit } from '@angular/core';
import { Modal } from 'bootstrap';
import { DailyLog } from 'src/model/dailyLog.class';
import { Projeto } from 'src/model/projeto.class';

@Component({
  selector: 'app-daily-review',
  templateUrl: './daily-review.component.html',
  styleUrls: ['./daily-review.component.scss']
})
export class DailyReviewComponent implements OnInit {
  
  @Input() dailyLog: DailyLog = new DailyLog();

  @Input() projeto: Projeto = new Projeto();

  modal: any;
  
  constructor(){

  }

  ngOnInit(): void {
  }

  abrirModal(){
    this.modal = new Modal('#dailyReviewModal');
    this.modal.show();
  }

  fecharModal(){
    this.modal.hide();
  }
}
