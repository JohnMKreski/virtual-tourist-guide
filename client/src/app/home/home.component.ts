import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  title = 'Home';
  desc = 'The Virtual Tourist Guide is a family-friendly outdoor activity planner designed to help tourists and locals discover fun, engaging, and accessible activities in a specific region. Whether youre looking for hiking trails, biking routes, rafting spots, or scenic picnic areas, the app provides curated recommendations tailored for families. It includes easy-to-use tools for finding nearby activities, checking weather conditions, and planning the perfect outdoor adventure. The Virtual Tourist Guide ensures that visitors can make the most of their time outdoors, with a focus on safety, enjoyment, and inclusivity for all ages.'
}
