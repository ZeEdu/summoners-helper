import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DataDragonHandlerService } from '../../../../services/data-dragon-handler.service';
import { Rune, Runes } from '../../../../interfaces/runes';
import { Champion, ChampionsResponse } from '../../../../interfaces/champions';

@Component({
  selector: 'app-build-modelling',
  templateUrl: './build-modelling.page.html',
  styleUrls: ['./build-modelling.page.scss']
})
export class BuildModellingPage implements OnInit {
  public runes: Array<Runes>;
  public champions: Array<Champion>;
  public namingSlots = ['first', 'second', 'third', 'fourth'];
  constructor(
    private fb: FormBuilder,
    private ddHandler: DataDragonHandlerService
  ) {}

  public guideForm = this.fb.group({
    name: [''],
    champion: [''],
    runes: this.fb.group({
      primaryRune: [''],
      primarySlots: this.fb.group({
        first: [''],
        second: [''],
        third: [''],
        fourth: ['']
      }),
      secondaryRune: [''],
      secondarySlots: this.fb.group({
        first: [''],
        second: [''],
        third: ['']
      })
    })
  });

  onSubmit(): void {
    console.log(this.guideForm.value);
  }

  ngOnInit() {
    this.ddHandler
      .getRunes()
      .subscribe((response: Array<Runes>) => (this.runes = response));
    this.ddHandler.getChampions().subscribe((response: ChampionsResponse) => {
      this.champions = Object.values(response.data);
      console.log(this.champions);
    });
  }
}
