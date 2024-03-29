import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ServiceService } from '../../services/service/service.service';
import { PreferenceService } from '../../services/preference/preference.service';
import { LocalStorageService } from 'src/app/services/storage/local-storage.service';
import { Service } from 'src/app/models/Service';

import { faHeart as faSolidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faRegularHeart } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrl: './service.component.scss',
})
export class ServiceComponent implements OnInit {
  icons = { faSolidHeart, faRegularHeart };

  listService: Service[] = [];
  isLoading: boolean = false;
  isLoadingOnUpdate: boolean = false;

  constructor(
    private serviceService: ServiceService,
    private localStorageService: LocalStorageService,
    private preferenceService: PreferenceService,
    private route: Router
  ) {}
  ngOnInit(): void {
    this.initData();
  }

  initData(): void {
    this.isLoading = true;
    this.fetchListServicePlusPreference();
  }

  fetchListService(): void {
    this.isLoading = true;
    try {
      this.serviceService.getServiceActif().subscribe({
        next: (response) => {
          this.listService = response.details;
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

  fetchListServicePlusPreference(): void {
    // this.isLoading = true;
    try {
      this.preferenceService.getAllServiceActivatedPlusPreference().subscribe({
        next: (response) => {
          this.listService = response.details;
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
        designation: 'service',
      };
      this.preferenceService.createPreference(data).subscribe({
        next: () => {
          this.fetchListServicePlusPreference();
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
      this.preferenceService.findAndDeletePreference(id, 'service').subscribe({
        next: () => {
          this.fetchListServicePlusPreference();
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

  goToRDVForm(id_service: string): void {
    this.route.navigate(['/rendezvous-form'], { queryParams: { id_service } });
  }
}
