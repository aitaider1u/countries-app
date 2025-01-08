import { Component } from '@angular/core';
import { RegionListComponent } from "../../widget/region-list/region-list.component";
import { regions } from '../../data/regions-data';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  regions = regions;
}
