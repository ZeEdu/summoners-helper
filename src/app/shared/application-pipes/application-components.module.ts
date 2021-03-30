import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ErrorMessageComponent } from 'src/app/components/error-message/error-message.component';

@NgModule({
  declarations: [ErrorMessageComponent],
  imports: [IonicModule],
  exports: [ErrorMessageComponent],
})
export class ApplicationSharedComponentsModule {}
