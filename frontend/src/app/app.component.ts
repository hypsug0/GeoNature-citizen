import {
    Component,
    OnInit,
    ViewEncapsulation,
    Inject,
    LOCALE_ID,
} from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { AppConfigService } from 'src/app/services/config.service';
import { Router, NavigationStart } from '@angular/router';
import { ModalsTopbarService } from './core/topbar/modalTopbar.service';
import { IConfig } from './services/config.model';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    encapsulation: ViewEncapsulation.None,
    // providers: [AppConfigService],
})
export class AppComponent implements OnInit {
    title = 'GeoNature-citizen';
    private frontendConfig: IConfig;
    //private apiUrl: string;
    public backgroundImage: any;
    hideTopbar = false;
    hideFooter = false;

    constructor(
        @Inject(LOCALE_ID) readonly localeId: string,
        private route: ActivatedRoute,
        private configService: AppConfigService,
        private router: Router,
        private metaTagService: Meta,
        private titleService: Title,
        private modalService: ModalsTopbarService
    ) {
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationStart) {
                this.modalService.close();
            }
        });
        this.route.queryParams.subscribe((params) => {
            this.hideTopbar = 'hideTopbar' in params;
            this.hideFooter = 'hideFooter' in params;
        });
    }

    ngOnInit(): void {
        this.frontendConfig = this.configService.frontendConfig;
        // this.apiUrl = this.configService.apiUrl;
        console.log('APP COMPONENT FRONTENDCONFIG', this.frontendConfig);
        this.setBackgroundImage();
        this.setMeta();
    }
    getConfig(): void {
        this.frontendConfig = this.configService.frontendConfig;
        // this.apiUrl = this.configService.apiUrl;
    }
    setBackgroundImage(): void {
        this.backgroundImage =
            this.configService.apiUrl + '/media/background.jpg';
    }
    setMeta(): void {
        this.metaTagService.addTags([
            {
                name: 'keywords',
                content:
                    'GeoNature-citizen ' +
                    (this.frontendConfig.FRONTEND.META.keywords
                        ? this.frontendConfig.FRONTEND.META.keywords
                        : ''),
            },
            { name: 'robots', content: 'index, follow' },
            { name: 'author', content: 'collectif GeoNature' },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1',
            },
            { charset: 'UTF-8' },
            {
                property: 'og:title',
                content: this.frontendConfig.appName,
            },
            {
                property: 'og:description',
                content:
                    this.frontendConfig.FRONTEND.LOCALIZE.platform_teaser[
                        this.localeId
                    ],
            },
            { property: 'og:image', content: this.backgroundImage },
            {
                property: 'og:url',
                content: this.frontendConfig.URL_APPLICATION,
            },
            {
                property: 'twitter:title',
                content: this.frontendConfig.appName,
            },
            {
                property: 'twitter:description',
                content:
                    this.frontendConfig.FRONTEND.LOCALIZE.platform_teaser[
                        this.localeId
                    ],
            },
            { property: 'twitter:image', content: this.backgroundImage },
        ]);
    }
}
