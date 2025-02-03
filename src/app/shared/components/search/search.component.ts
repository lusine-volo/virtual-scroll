import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Store } from '@ngrx/store';

import { CountryActions } from '../../../store/actions/country.actions';
import { countryFeature } from '../../../store/features/country.feature';

@Component({
  selector: 'app-search',
  imports: [ FormsModule ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent {
  private readonly store = inject(Store);
  query = signal<string>('');
  selectedSuggestion = signal<string>('');
  suggestionQueries = this.store.selectSignal(countryFeature.selectSuggestionQueries);

  onSearch(query: string): void {
    const params = {
      query: query,
      start: 0,
      end: 1,
    };
    this.store.dispatch(CountryActions.search({ params })); 
  }

  onSetQuery(suggestion: string): void {
    this.query.set(suggestion);
    this.selectedSuggestion.set(suggestion);
    this.onSearch(suggestion);
  }

}
