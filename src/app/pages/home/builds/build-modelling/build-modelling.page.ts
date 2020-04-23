import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DataDragonHandlerService } from '../../../../services/data-dragon-handler.service';
import { Rune, Runes } from '../../../../interfaces/runes';

@Component({
  selector: 'app-build-modelling',
  templateUrl: './build-modelling.page.html',
  styleUrls: ['./build-modelling.page.scss']
})
export class BuildModellingPage implements OnInit {
  private runes: Array<Runes>;
  constructor(
    private fb: FormBuilder,
    private ddHandler: DataDragonHandlerService
  ) {}

  guideForm = this.fb.group({
    runes: this.fb.group({
      primaryRune: [''],
      secondaryRune: ['']
    })
  });

  onSubmit(): void {
    console.log(this.guideForm.value['runes'].primaryRune);
  }

  ngOnInit() {
    this.ddHandler.getRunes().subscribe((response: Array<Runes>) => {
      this.runes = response;
      console.log(this.runes);
    });
  }
}
