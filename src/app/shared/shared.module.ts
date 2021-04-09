import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout/typings/module';
import { MaterialModule } from './material.module';

@NgModule({
  imports: [
    FlexLayoutModule,
    MaterialModule
  ],
  exports: [
    FlexLayoutModule,
    MaterialModule
  ],
  providers: []
})
export class SharedModule { }
