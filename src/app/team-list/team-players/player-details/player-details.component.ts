import { Component, OnInit } from '@angular/core';
import { PlayerDetail } from '../../players';
import { HttpParams, HttpClient} from '@angular/common/http';
import {TeamServiceService} from "../../../team-service.service";
import {Router} from '@angular/router';

@Component({
  selector: 'app-player-details',
  templateUrl: './player-details.component.html',
  styleUrls: ['./player-details.component.css']
})
export class PlayerDetailsComponent implements OnInit {
  playerDetail=[];
  constructor(private _http : HttpClient , private teamService : TeamServiceService , private router : Router)
  {   }

  ngOnInit() {
   console.log(this.teamService.player_detail.subscribe(data => {
     this.playerDetail = [];
     this.playerDetail.push(data);
     console.log(this.playerDetail);
   }));
  }

}
