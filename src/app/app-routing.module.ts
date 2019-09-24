import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "word-choice",
    loadChildren:
      "src/app/pages/word-choice/word-choice.module#WordChoiceModule"
  },
  {
    path: "game",
    loadChildren: "src/app/pages/game/game.module#GameModule"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
