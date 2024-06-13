import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent] // Import the standalone component
    }).compileComponents();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should open the PDF modal when openPdfModal is called', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.openPdfModal();
    fixture.detectChanges();
    
    const modalElement = fixture.debugElement.query(By.css('.modal'));
    expect(modalElement).toBeTruthy();
    expect(app.modalVisible).toBeTrue();
  });

  it('should close the PDF modal when closePdfModal is called', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.openPdfModal();
    fixture.detectChanges();
    app.closePdfModal();
    fixture.detectChanges();
    
    const modalElement = fixture.debugElement.query(By.css('.modal'));
    expect(modalElement).toBeFalsy();
    expect(app.modalVisible).toBeFalse();
  });
});
