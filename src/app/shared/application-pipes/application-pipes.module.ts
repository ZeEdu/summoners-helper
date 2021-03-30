import { NgModule } from '@angular/core';
import { SafeHtmlPipe } from './safe-html.pipe';

@NgModule({
  declarations: [SafeHtmlPipe],
  imports: [],
  exports: [SafeHtmlPipe],
  providers: [SafeHtmlPipe],
})
export class ApplicationSharedPipesModule {}
