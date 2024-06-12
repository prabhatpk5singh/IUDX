import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  modalVisible = false;

  openPdfModal() {
    this.modalVisible = true;
  }

  closePdfModal() {
    this.modalVisible = false;
  }
}