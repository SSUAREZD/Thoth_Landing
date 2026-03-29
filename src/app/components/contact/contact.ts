import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-contact',
  imports: [FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  name = '';
  email = '';
  message = '';

  status = signal<'idle' | 'sending' | 'success' | 'error'>('idle');

  async onSubmit() {
    this.status.set('sending');
    try {
      await emailjs.send(
        'service_51aumaa',
        'template_emxkk2h',
        {
          from_name: this.name,
          from_email: this.email,
          message: this.message,
          time: new Date().toLocaleString('es-CO', { timeZone: 'America/Bogota' }),
        },
        { publicKey: '_VgxKRRjnAUji_rRm' }
      );
      this.status.set('success');
      this.name = '';
      this.email = '';
      this.message = '';
    } catch {
      this.status.set('error');
    }
  }
}
