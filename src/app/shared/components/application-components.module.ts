import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ErrorMessageComponent } from 'src/app/components/error-message/error-message.component';

@NgModule({
  declarations: [ErrorMessageComponent],
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule],
  exports: [ErrorMessageComponent],
})
export class ApplicationSharedComponentsModule {}
