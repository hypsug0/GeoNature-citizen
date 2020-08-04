import * as L from "leaflet";
import { AppConfig } from "../../../../conf/app.config";

import {
  Component,
  ComponentFactoryResolver,
  HostListener,
  Injector,
  Input,
  ViewEncapsulation,
  Inject,
  LOCALE_ID
} from "@angular/core";
import { BaseMapComponent, conf } from "../../base/map/map.component"
import { MapService } from "../../base/map/map.service"


@Component({
  selector: "app-obs-map",
  template: `
    <div
      [id]="options.MAP_ID"
      #map
      i18n-data-observation-zoom-statement-warning
      data-observation-zoom-statement-warning="Veuillez zoomer pour localiser votre observation."
    ></div>
  `,
  styleUrls: ["./map.component.css"],
  encapsulation: ViewEncapsulation.None
})
export class ObsMapComponent extends BaseMapComponent {
  feature_id_key: "id_observation";

  constructor(
    @Inject(LOCALE_ID) readonly localeId: string,
    resolver: ComponentFactoryResolver,
    injector: Injector,
    mapService: MapService
  ) {
    super(resolver, injector, mapService)
  }

  getPopupComponentFactory(): any {
    return this.resolver.resolveComponentFactory(MarkerPopupComponent);
  }

  @HostListener("document:NewObservationEvent", ["$event"])
  newObservationEventHandler(e: CustomEvent) {
    e.stopPropagation();
  }
}

@Component({
  selector: "popup",
  template: `
    <ng-container>
      <img
        class="default-img"
        [src]="
          data.image
            ? data.image
            : data.medias && !!data.medias.length
            ? appConfig.API_TAXHUB +
              '/tmedias/thumbnail/' +
              data.medias[0].id_media +
              '?h=80&v=80'
            : 'assets/default_image.png'
        "
      />
      <p>
        <a
          class="espece-link"
          href="{{ appConfig.details_espece_url + data.taxref?.cd_nom }}"
          target="_blank"
          >{{
            !!data.nom_francais ? data.nom_francais : data.taxref?.nom_vern
          }}</a
        >
        <br />
        <span>
          <span *ngIf="appConfig.program_list_observers_names">
            Observé par
            {{
              data.observer && data.observer.username
                ? data.observer.username
                : "Anonyme"
            }}
            <br />
          </span>
          le {{ data.date }}
        </span><br>
        <a [routerLink]="['/programs', data.id_program, 'features', data.id_observation]" style="cursor:pointer">
          + Voir les détails
        </a>
      </p>
      <div><img class="icon" src="assets/binoculars.png" /></div>
    </ng-container>
  `
})
export class MarkerPopupComponent {
  @Input() data;
  public appConfig = AppConfig;
}
