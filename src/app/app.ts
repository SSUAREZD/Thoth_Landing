import { Component } from '@angular/core';
import { Navbar } from './components/navbar/navbar';
import { Hero } from './components/hero/hero';
import { Features } from './components/features/features';
import { Testimonials } from './components/testimonials/testimonials';
import { Contact } from './components/contact/contact';
import { Footer } from './components/footer/footer';
@Component({
  selector: 'app-root',
  imports: [ Navbar,
    Hero,
    Features,
    Testimonials,
    Contact,
    Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
}
