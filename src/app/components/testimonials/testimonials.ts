import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-testimonials',
  imports: [CommonModule],
  templateUrl: './testimonials.html',
  styleUrl: './testimonials.css',
})
export class Testimonials {
  @ViewChild('slider', { static: false }) slider?: ElementRef<HTMLDivElement>;

  testimonials = [
    {
      quote: '"Desde que implementamos esta solución de medición, reducimos significativamente las devoluciones por talla. Ha sido una mejora directa en nuestra operación."',
      author: '— Equipo de E-commerce, Calzado Atlanta',
      rating: 5
    },
    {
      quote: '"La herramienta se integró fácilmente a nuestra tienda online y mejoró la experiencia de compra. Nuestros clientes ahora eligen con más seguridad."',
      author: '— Equipo de E-commerce, Calzado Rivera',
      rating: 5
    },
    {
      quote: '"Gracias a esta herramienta logramos mejorar la precisión en la selección de tallas y aumentar nuestra tasa de conversión. Es un aporte claro al rendimiento del negocio."',
      author: '— Dirección E-commerce, Calzado Komodos',
      rating: 5
    },
    {
      quote: '"Implementar este sistema nos permitió optimizar costos logísticos al reducir cambios y devoluciones. Totalmente recomendable para e-commerce de calzado."',
      author: '— Dirección E-commerce, Calzado Para Hombre',
      rating: 5
    },
    {
      quote: '"La precisión en la medición ha marcado la diferencia. Ahora contamos con datos más confiables y una mejor conversión en ventas."',
      author: '— Dirección E-commerce, Calzado Pascelli',
      rating: 5
    }
  ];

  getRatingArray(rating: number): number[] {
    return Array(rating).fill(0);
  }

  scrollLeft() {
    this.slider?.nativeElement.scrollBy({ left: -360, behavior: 'smooth' });
  }

  scrollRight() {
    this.slider?.nativeElement.scrollBy({ left: 360, behavior: 'smooth' });
  }
}

