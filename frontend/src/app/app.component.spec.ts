import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

// import { AppConfigService } from 'src/app/services/config.service';
import { AppComponent } from './app.component';
import { TopbarComponent } from './core/topbar/topbar.component';
import { AuthService } from './auth/auth.service';
import { FooterComponent } from './core/footer/footer.component';

// class MockRouter { public navigate() {}; }

describe('AppComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            providers: [AuthService],
            declarations: [AppComponent, TopbarComponent, FooterComponent],
            imports: [RouterTestingModule, HttpClientTestingModule],
        }).compileComponents();
    }));

    it('should create the app', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    });

    // it(`should have as title '${AppConfigService.frontendConfig.appName}'`, () => {
    //     const fixture = TestBed.createComponent(AppComponent);
    //     const app = fixture.debugElement.componentInstance;
    //     expect(app.title).toEqual(AppConfigService.appName);
    // });

    // it('should render title in an anchor tag', () => {
    //     const fixture = TestBed.createComponent(AppComponent);
    //     fixture.detectChanges();
    //     const compiled = fixture.debugElement.nativeElement;
    //     expect(compiled.querySelector('header nav a').textContent).toContain(
    //         ConfigService.appName
    //     );
    // });
});
