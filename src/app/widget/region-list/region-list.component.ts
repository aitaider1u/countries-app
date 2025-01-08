import { Component } from '@angular/core';
import { regions } from '../../data/regions-data'; // Adjust path if needed
import { routes } from '../../app.routes';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-region-list',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './region-list.component.html',
  styleUrl: './region-list.component.css'
})

export class RegionListComponent {
  regions = regions;
}
