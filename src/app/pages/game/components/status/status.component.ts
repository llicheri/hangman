import { Component, OnInit, ViewChild, OnDestroy } from "@angular/core";
import { AppService } from "src/app/app.service";
import { Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Subscription } from "rxjs";

@Component({
  selector: "app-status",
  templateUrl: "./status.component.html",
  styleUrls: ["./status.component.sass"]
})
export class StatusComponent implements OnInit, OnDestroy {
  // word decided in other page
  private clearSelectedWord: string;
  // word shown on page with _ in the place of the not selected letter
  shownWord: string = "";
  // remaining attempts
  remainingAttempts = 5;
  // modal html object
  @ViewChild("content", null) modal;
  // message viewed into the modal body
  modalMessage: string;
  // date of init game
  gameInit: Date;
  // subscription on key press event. Variable used only to unsubscribe it after game finish
  obsKeyPress: Subscription;

  constructor(
    private appService: AppService,
    private router: Router,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.gameInit = new Date();
    // set word to view
    this.appService.getWordChoiced().subscribe(word => {
      if (!word) {
        console.log("No word selected yet");
        this.router.navigateByUrl("word-choice");
      } else {
        this.clearSelectedWord = word;
        Object.keys(this.clearSelectedWord).forEach(k => {
          this.shownWord += "_ ";
        });
      }
    });
    // listen the button clicks
    this.obsKeyPress = this.appService.onKeyPressed.subscribe(res => {
      this.onKeyPressed(res);
    });
  }

  // unsubscribe the key press event listen on component destroy to avoid the continuos listening
  ngOnDestroy() {
    this.obsKeyPress.unsubscribe();
  }

  // operations after keyboard key click
  onKeyPressed(res: { remainingAttempts: number; shownWord: string }) {
    this.shownWord = res.shownWord;
    this.remainingAttempts = res.remainingAttempts;
    // lose game semphore: check remaining attempts
    const loseGame = this.remainingAttempts <= 0;
    // win game semaphore: check presence of hidden chars
    const winGame = this.shownWord.indexOf("_") < 0;
    // if no remaining attempts lose the game
    if (loseGame) {
      this.modalMessage = "You lose the game";
    }
    // if user win the game
    else if (winGame) {
      this.modalMessage = "You win the game!!!";
      // highscore calculation: - second from start to end - remaining attemps
      const now = new Date();
      const time = now.getTime() - this.gameInit.getTime();
      this.appService.addHighscore({
        time: this.msToTime(time),
        remainingAttempts: this.remainingAttempts
      });
    }

    // open modal after win or lose of the game
    if (loseGame || winGame) {
      this.open(this.modal);
      this.appService.resetGame();
    }
  }

  // function to open modal
  open(content) {
    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title" })
      .result.then(
        () => {
          this.onCloseModal();
        },
        () => {
          this.onCloseModal();
        }
      );
  }

  // function called on modal close to close the component and redirect the user on the home page
  onCloseModal() {
    this.modalService.dismissAll();
    this.router.navigateByUrl("word-choice");
  }

  private msToTime(duration: number): string {
    let seconds: any = Math.floor((duration / 1000) % 60);
    let minutes: any = Math.floor((duration / (1000 * 60)) % 60);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    return minutes + ":" + seconds;
  }
}
