import { Injectable, EventEmitter } from "@angular/core";
import { Observable, of } from "rxjs";
import { HighScore } from "./higscore";

@Injectable({
  providedIn: "root"
})

// used only one service to simplify the application structure
export class AppService {
  constructor() {}

  /////// word used in the game
  private _wordChoiced: string;
  // simulate async calls
  getWordChoiced(): Observable<string> {
    return of(this._wordChoiced);
  }
  setWordChoiced(word: string): Observable<string> {
    return of((this._wordChoiced = word));
  }

  ////// game choices
  private _possibleChices: string[] = [
    "3dhubs",
    "marvin",
    "print",
    "filament",
    "order",
    "layer"
  ];
  // simulate async calls
  getPossibleChices(): Observable<string[]> {
    return of(this._possibleChices);
  }
  setPossibleChices(choices: string[]): Observable<string[]> {
    return of((this._possibleChices = choices));
  }

  // remaining attempts for the game
  private readonly STARTING_ATTEMPTS = 5;
  private remainingAttempts = 5;

  // letters clicked from the user on keyboard
  private clickedLetters: string[] = [];

  // user's highscores
  private _highscores: HighScore[] = [];
  addHighscore(high: HighScore): void {
    this._highscores.push(high);
  }
  get highscores(): HighScore[] {
    return this._highscores;
  }

  // event emitted after a button click to give informations on clients
  public onKeyPressed: EventEmitter<{
    remainingAttempts: number;
    shownWord: string;
  }> = new EventEmitter();

  // method called from keyboard after click on keyboard
  letterClicked(letter: string) {
    // if first click on letter, it is insert into array
    if (this.clickedLetters.indexOf(letter) < 0) {
      this.clickedLetters.push(letter);
    }
    // if letter is not present into word remaining attempt number is decreased
    if (this._wordChoiced.indexOf(letter) < 0) {
      this.remainingAttempts--;
    }
    // generate word to show on page shown letters clicked by user
    const shownWord = this.generateShownWord();
    // emit information of game status listened to status component
    this.onKeyPressed.emit({
      remainingAttempts: this.remainingAttempts,
      shownWord: shownWord
    });
  }

  // create word to show putting the right letter if it's selected from user otherwise the "_" char
  private generateShownWord(): string {
    let ret = "";
    Object.keys(this._wordChoiced).forEach(key => {
      const letter = this._wordChoiced[key];
      if (this.clickedLetters.indexOf(letter) >= 0) {
        ret += letter + " ";
      } else {
        ret += "_ ";
      }
    });
    return ret;
  }

  // reset game information to start a new match
  resetGame() {
    this._wordChoiced = "";
    this.remainingAttempts = this.STARTING_ATTEMPTS;
    this.clickedLetters = [];
  }
}
