import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppConfigService } from 'src/app/services/config.service';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.css'],
})
export class AboutComponent implements OnInit {
    constructor(
        private router: Router,
        private titleService: Title,
        private configService: AppConfigService
    ) {}

    ngOnInit(): void {
        if (!this.configService.frontendConfig.FRONTEND.ABOUT) {
            this.router.navigateByUrl('home');
        }
        this.titleService.setTitle(
            this.configService.frontendConfig.appName + ' - ' + 'A propos'
        );
    }
}
