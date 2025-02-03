import { ChangeDetectionStrategy, Component } from '@angular/core';

import { TableComponent } from '../../shared/components/table/table.component';
import { SearchComponent } from '../../shared/components/search/search.component';

@Component({
  selector: 'app-home',
  imports: [
    SearchComponent,
    TableComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  title = 'AI Search Country';
}
