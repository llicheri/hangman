import { Component, OnInit } from "@angular/core";
import { AppService } from "src/app/app.service";
import { HighScore } from "src/app/higscore";

@Component({
  selector: "app-highscores",
  templateUrl: "./highscores.component.html",
  styleUrls: ["./highscores.component.sass"]
})
export class HighscoresComponent implements OnInit {
  // user highscores
  highscores: HighScore[] = [];

  constructor(private appService: AppService) {}

  ngOnInit() {
    this.highscores = this.appService.highscores;
  }
}
