import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AppService } from "src/app/app.service";

@Component({
  selector: "app-word-choice-page",
  templateUrl: "./word-choice-page.component.html",
  styleUrls: ["./word-choice-page.component.sass"]
})

// component written to guarantee the random choice of the word or the choice of it ( in case of 2 users game )
// the default is the random choice
export class WordChoicePageComponent implements OnInit {
  // value of user choice
  choice: string = "";
  // choice set
  values: string[] = [];
  // random choice
  isRandom = true;

  constructor(private router: Router, private appService: AppService) {}

  ngOnInit() {
    this.appService.getPossibleChices().subscribe(x => {
      this.values = x;
    });
  }

  // function called on confirm button
  goToGame() {
    if (this.isRandom) {
      this.choice = this.values[Math.floor(Math.random() * this.values.length)];
    }
    if (!this.choice) {
      return;
    } else {
      this.appService.setWordChoiced(this.choice).subscribe(() => {
        this.router.navigateByUrl("game");
      });
    }
  }
}
