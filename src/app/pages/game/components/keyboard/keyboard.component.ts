import { Component, OnInit } from "@angular/core";
import { AppService } from "src/app/app.service";

@Component({
  selector: "app-keyboard",
  templateUrl: "./keyboard.component.html",
  styleUrls: ["./keyboard.component.sass"]
})
export class KeyboardComponent implements OnInit {
  // all letters
  letters: string[][] = [
    ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    ["z", "x", "c", "v", "b", "n", "m"]
  ];
  // already used letters
  private usedLetters: string[] = [];

  constructor(private appService: AppService) {}

  ngOnInit() {}

  // function called when user click on a button
  onLetterClick(letter: string) {
    if (!this.isLetterUsed(letter)) {
      this.usedLetters.push(letter);
      this.appService.letterClicked(letter);
    }
  }

  // function used to render the button different if used or not
  isLetterUsed(letter: string): boolean {
    return this.usedLetters.indexOf(letter) >= 0;
  }
}
