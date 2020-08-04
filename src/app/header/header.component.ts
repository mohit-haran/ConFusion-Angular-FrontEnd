import { Component, OnInit } from '@angular/core';
import { faHome, faInfo, faList, faAddressCard, faSignInAlt } from '@fortawesome/free-solid-svg-icons'
import { MatDialog, MatDialogRef} from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  home = faHome;
  info = faInfo;
  address = faAddressCard;
  list = faList;
  signin = faSignInAlt;

  constructor(public dialog:MatDialog) { }

  ngOnInit(): void {
  }

  openLoginForm(){
    this.dialog.open(LoginComponent,{width:'500px',height:'450px'});

  }

}
