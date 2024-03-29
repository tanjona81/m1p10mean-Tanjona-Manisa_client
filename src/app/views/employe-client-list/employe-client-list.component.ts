import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PreferenceService } from '../../services/preference/preference.service';
import { LocalStorageService } from '../../services/storage/local-storage.service';
import { Employe } from '../../models/Employe';

import { faHeart as faSolidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faRegularHeart } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-employe-client-list',
  templateUrl: './employe-client-list.component.html',
  styleUrl: './employe-client-list.component.scss',
})
export class EmployeClientListComponent implements OnInit {
  icons = { faSolidHeart, faRegularHeart };

  isLoading: boolean = false;
  isLoadingOnUpdate: boolean = false;
  listEmploye: Employe[] = [];

  constructor(
    private localStorageService: LocalStorageService,
    private preferenceService: PreferenceService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.initData();
  }

  initData(): void {
    this.isLoading = true;
    this.fetchListEmployePlusPreference();
  }

  fetchListEmployePlusPreference(): void {
    // this.isLoading = true;
    try {
      this.preferenceService.getAllEmployeActivatedPlusPreference().subscribe({
        next: (response) => {
          this.listEmploye = response.details;
          this.isLoading = false;
        },
        error: (error) => {
          console.log(error);
          this.isLoading = false;
        },
      });
    } catch (e) {
      console.error(e);
    }
  }

  onCreatePreference(id_service: string): void {
    this.isLoadingOnUpdate = true;
    try {
      const data = {
        id_customer:
          this.localStorageService.getDecodedAccessToken(
            this.localStorageService.getData('x-authorization-c-token')
          )?._id || '',
        id_prefere: id_service,
        designation: 'employe',
      };
      this.preferenceService.createPreference(data).subscribe({
        next: () => {
          this.fetchListEmployePlusPreference();
          this.isLoadingOnUpdate = false;
        },
        error: (error) => {
          console.log(error);
          this.isLoadingOnUpdate = false;
        },
      });
    } catch (e) {
      console.error(e);
    }
  }

  onDeletePreference(id: string): void {
    this.isLoadingOnUpdate = true;
    try {
      this.preferenceService.findAndDeletePreference(id, 'employe').subscribe({
        next: () => {
          this.fetchListEmployePlusPreference();
          this.isLoadingOnUpdate = false;
        },
        error: (error) => {
          console.log(error);
          this.isLoadingOnUpdate = false;
        },
      });
    } catch (e) {
      console.error(e);
    }
  }

  goToRDVForm(id_employe: string): void {
    this.route.navigate(['/rendezvous-form'], { queryParams: { id_employe } });
  }
}
