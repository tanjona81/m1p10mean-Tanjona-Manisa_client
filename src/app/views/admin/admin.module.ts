import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import {
    AlertModule,
  AvatarModule,
  BadgeModule,
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  FormModule,
  GridModule,
  ModalModule,
  NavModule,
  PopoverModule,
  ProgressModule,
  SharedModule,
  SpinnerModule,
  TableModule,
  TabsModule,
  ToastModule,
  TooltipModule,
  UtilitiesModule
} from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { ChartjsModule } from '@coreui/angular-chartjs';

import { AdminRoutingModule } from './admin-routing.module';
import { ServiceComponent } from './service/service.component';
import { EmployeComponent } from './employe/employe.component';
import { BeneficeComponent } from './benefice/benefice.component';
import { OffreComponent } from './offre/offre.component';

import { DocsComponentsModule } from '@docs-components/docs-components.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ToggleButtonModule } from 'primeng/togglebutton';

@NgModule({
  imports: [
    AdminRoutingModule,
    CardModule,
    NavModule,
    IconModule,
    TabsModule,
    CommonModule,
    GridModule,
    ProgressModule,
    ReactiveFormsModule,
    ButtonModule,
    FormModule,
    ButtonModule,
    ButtonGroupModule,
    ChartjsModule,
    AvatarModule,
    TableModule,
    CommonModule,
    DocsComponentsModule,
    AlertModule,
    BadgeModule,
    ModalModule,
    ToastModule,
    SharedModule,
    UtilitiesModule,
    TooltipModule,
    PopoverModule,
    FontAwesomeModule,
    SpinnerModule,
    ToggleButtonModule,
    FormsModule
  ],
  declarations: [
    ServiceComponent,
    EmployeComponent,
    BeneficeComponent,
    OffreComponent
  ]
})
export class AdminModule {
}
