import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { KeyboardComponent } from "./components/keyboard/keyboard.component";
import { StatusComponent } from "./components/status/status.component";
import { RouterModule, Routes } from "@angular/router";
import { GamePageComponent } from "./game-page.component";
import { FormsModule } from "@angular/forms";
import { NgbModalModule, NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { HighscoresModule } from "../highscores/highscores.module";

const routes: Routes = [{ path: "", component: GamePageComponent }];

@NgModule({
  declarations: [KeyboardComponent, StatusComponent, GamePageComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    NgbModalModule,
    NgbModule,
    HighscoresModule
  ],
  exports: [RouterModule],
  entryComponents: [StatusComponent]
})
export class GameModule {}
