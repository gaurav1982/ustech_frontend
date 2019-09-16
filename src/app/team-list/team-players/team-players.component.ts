import { Component, OnInit } from '@angular/core';
import { Player } from '../players';
import { PlayerDetail } from '../players';
import { HttpParams, HttpClient} from '@angular/common/http';
import {TeamServiceService} from "../../team-service.service";
import {Router} from '@angular/router';
@Component({
  selector: 'app-team-players',
  templateUrl: './team-players.component.html',
  styleUrls: ['./team-players.component.css']
})
export class TeamPlayersComponent implements OnInit {
  players = [];
  player_details = [];
  //let PlayerDetail_component: PlayerDetailsComponent;
  constructor(private _http : HttpClient , private teamService : TeamServiceService , private router : Router) { }

  ngOnInit() {
    if(!this.teamService.team_id)
    {
      alert("Select Team");
      this.router.navigate(['/']);
    }
    this._http.get('http://localhost:4200/api/team/'+this.teamService.team_id).subscribe(response => {
      for(let response_data of response[0].get_players)
       {
          let new_Player = new Player;
          new_Player.playerId = response_data.id;
          new_Player.firstName = response_data.f_name;
          new_Player.secondName = response_data.l_name;
          new_Player.imageURL = response_data.imageuri;
          new_Player.jersey_number = response_data.jersey_number;
          this.players.push(new_Player);
       }

    },
    error => {
      console.log(error);
    })
  }
  onClick(index){
    this.teamService.player_id = index;
    this._http.get('http://localhost:4200/api/player/'+index+'/history').subscribe(response => {
      let player_detail = new PlayerDetail;
      player_detail.firstName = response[0].f_name;
      player_detail.secondName = response[0].l_name;
      player_detail.total_match = response[0].player_Summary.total_match;
      player_detail.total_run = response[0].player_Summary.total_run;
      player_detail.total_sixes = response[0].player_Summary.total_six;
      //this.teamService.player_detail = player_detail;
      this.teamService.setPlayerDetail(player_detail);
      //console.log(this.teamService.player_detail);
      /*for(let response_data of response[0].get_players)
       {
         console.log(response_data);
        let new_Player = new Player;
         new_Player.playerId = response_data.id;
        new_Player.firstName = response_data.f_name;
        new_Player.secondName = response_data.l_name;
        new_Player.imageURL = response_data.imageuri;
        new_Player.jersey_number = response_data.jersey_number;
        this.players.push(new_Player);
       }
      */
    },
    error => {
      console.log(error);
    })

  }

}
