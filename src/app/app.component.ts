import { ChangeDetectorRef, Component, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { Usuario } from 'src/model/usuario.class';
import { LocalStorageUtil } from 'src/utils/localStorage.class.util';
import { NavbarComponent } from './components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnChanges, OnInit {

  title = 'GDS';

  @ViewChild(NavbarComponent) navbar: NavbarComponent;
  
  constructor(private cd: ChangeDetectorRef,
    private router: Router){

  }
  
  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges): void {
  
  }
}
