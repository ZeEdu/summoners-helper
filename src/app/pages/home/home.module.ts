import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { FormsModule } from "@angular/forms";

import { HomePage } from "./home.page";
import { HomeRoutingModule } from "./home-routes.module";

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, HomeRoutingModule],
  declarations: [HomePage],
})
export class HomePageModule {}
