import { HighscoresModule } from "./../highscores/highscores.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { WordChoicePageComponent } from "./word-choice-page.component";
import { RouterModule, Routes } from "@angular/router";
import { FormsModule } from "@angular/forms";

const routes: Routes = [{ path: "", component: WordChoicePageComponent }];

@NgModule({
  declarations: [WordChoicePageComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    HighscoresModule
  ],
  exports: [RouterModule]
})
export class WordChoiceModule {}
