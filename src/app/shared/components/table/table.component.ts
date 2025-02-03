import { ChangeDetectionStrategy, Component, ElementRef, inject, OnInit, signal, ViewChild } from '@angular/core';

import { Store } from '@ngrx/store';

import { countryFeature } from '../../../store/features/country.feature';
import { CountryActions } from '../../../store/actions/country.actions';

@Component({
  selector: 'app-table',
  imports: [],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent implements OnInit {
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;
  private readonly store = inject(Store);
  headerItems = signal<string[]>([
    'Name', 'Capital', 'Independent'
  ]);
  vm = this.store.selectSignal(countryFeature.selectCountryState);
  currentPage = this.store.selectSignal(countryFeature.selectCurrentPage);
  searchQuery = this.store.selectSignal(countryFeature.selectSearchQuery);
  visibleItems = this.store.selectSignal(countryFeature.selectVisibleItemst);
  params = {
    query: '',
    start: 0,
    end: 1,
  };
  scrollTop = window.scrollY;

  ngOnInit(): void {
    this.store.dispatch(CountryActions.loadData({ params: this.params }));
  }

  loadMore(): void {
    this.scrollTop = +this.vm().startSearching || window.scrollY;
    const container = this.scrollContainer.nativeElement;
    const scrollTop = container.scrollTop;
    const bottom = container.scrollHeight === (container.scrollTop + container.clientHeight);
    if (scrollTop > this.scrollTop && bottom && this.vm().totalCount > this.visibleItems().length) {
      this.scrollTop = scrollTop;
      const end = this.currentPage() + 1;
      const params = { ...this.params, query: this.searchQuery(), end };
      this.store.dispatch(CountryActions.loadMore({ params }));
    }
  }

}
