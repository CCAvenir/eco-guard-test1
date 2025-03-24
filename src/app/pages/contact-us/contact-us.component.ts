import { Component } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { FormsModule } from '@angular/forms';
import { NgIf, NgClass } from '@angular/common';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [FormsModule, NgIf, NgClass], 
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css'] 
})
export class ContactUsComponent {
  name: string = '';
  email: string = '';
  phone: string = '';
  reason: string = '';
  message: string = '';
  successMessage: string = '';
  menuOpen: boolean = false; 

  constructor(private contactService: ContactService) {}

  submitForm(): void {
    if (!this.name || !this.email || !this.reason || !this.message) {
      alert(' Please fill in all required fields.');
      return;
    }

    const contactData = {
      name: this.name,
      email: this.email,
      phone: this.phone,
      subject: this.reason,
      message: this.message
    };

    console.log('📤 Sending data:', contactData); 

    this.contactService.addMessage(contactData).subscribe(
      (response) => {
        console.log('✅ Response received:', response); 
        this.successMessage = '✅ Message sent successfully!';
        
        this.name = '';
        this.email = '';
        this.phone = '';
        this.reason = '';
        this.message = '';
      },
      (error) => {
        console.error('❌ Error:', error);
        alert('❌ Failed to send message. Please try again.');
      }
    );
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen; 
  }
}
