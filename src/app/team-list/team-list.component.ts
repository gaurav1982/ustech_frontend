import { Component, OnInit } from '@angular/core';
import { Team } from '../team';
import { HttpParams, HttpClient} from '@angular/common/http';
import { template } from '@angular/core/src/render3';
import {TeamServiceService} from '../team-service.service'
import {Router} from '@angular/router';
@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.css']
})
export class TeamListComponent implements OnInit {

  teams : Team[] = [];
  arr;
  constructor(private _http : HttpClient , private teamService : TeamServiceService , private router : Router) { }

  ngOnInit() {
    this._http.get('http://localhost:4200/api/team').subscribe(response => {
      //console.log(response);
      this.arr = response;
      for(let response_data of this.arr)
       {
          let new_team = new Team;
          new_team.teamId = response_data.id;
          new_team.teamName = response_data.name;
          new_team.teamLogo = response_data.logo;
          this.teams.push(new_team);
       }
    },
    error => {
      console.log(error);
    })


  }
 onClick(index,rout,fixture){
   console.log(index);
   this.teamService.team_id = index;
   this.teamService.is_fixture = fixture;
   this.router.navigate([rout]);
 }
 alertM(){

   alert("Hello");
 }
}
