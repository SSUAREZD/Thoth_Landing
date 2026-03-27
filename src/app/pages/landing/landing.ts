import { Component } from '@angular/core';
import { Navbar } from '../../components/navbar/navbar';
import { Hero } from '../../components/hero/hero';
import { Features } from '../../components/features/features';
import { Testimonials } from '../../components/testimonials/testimonials';
import { Offer } from '../../components/offer/offer';
import { Contact } from '../../components/contact/contact';
import { Footer } from '../../components/footer/footer';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [Navbar, Hero, Features, Testimonials, Offer, Contact, Footer],
  template: `
    <app-navbar></app-navbar>
    <app-hero></app-hero>
    <app-features></app-features>
    <app-testimonials></app-testimonials>
    <app-offer></app-offer>
    <app-contact></app-contact>
    <app-footer></app-footer>
  `,
})
export class LandingComponent {}
