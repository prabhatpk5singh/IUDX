import { TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent] // Import the standalone component
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(app).toBeTruthy();
  });

  it('should open the Map View modal when openMapView is called', () => {
    app.openMapView();
    fixture.detectChanges();

    const modalElement = fixture.debugElement.query(By.css('.modal.show'));
    expect(modalElement).toBeTruthy();
    expect(app.isMapViewOpen).toBeTrue();
  });

  it('should close the Map View modal when closeMapView is called', () => {
    app.openMapView();
    fixture.detectChanges();
    app.closeMapView();
    fixture.detectChanges();

    const modalElement = fixture.debugElement.query(By.css('.modal.show'));
    expect(modalElement).toBeFalsy();
    expect(app.isMapViewOpen).toBeFalse();
  });

  it('should switch to the "Visualise" tab and initialize the map', fakeAsync(() => {
    app.openMapView();
    fixture.detectChanges();

    app.setActiveTab('visualise');
    fixture.detectChanges();

    tick(); // Simulate the passage of time for asynchronous tasks

    const activeTabElement = fixture.debugElement.query(By.css('.nav-link.active'));
    expect(activeTabElement.nativeElement.textContent.trim()).toBe('Visualise');
    expect(app.activeTab).toBe('visualise');
    expect(app.mapInitialized).toBeTrue();
  }));

  it('should switch to the "Data" tab and display GeoJSON data', () => {
    app.openMapView();
    fixture.detectChanges();

    app.setActiveTab('data');
    fixture.detectChanges();

    const activeTabElement = fixture.debugElement.query(By.css('.nav-link.active'));
    expect(activeTabElement.nativeElement.textContent.trim()).toBe('Data');
    expect(app.activeTab).toBe('data');

    const dataElement = fixture.debugElement.query(By.css('pre'));
    expect(dataElement.nativeElement.textContent).toContain('PLACES OF TOURIST IMPORTANCE');
    expect(dataElement.nativeElement.textContent).toContain('GURUVAYUR');
  });
});
