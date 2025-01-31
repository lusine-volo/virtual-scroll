import { Component, ElementRef, inject, OnInit, signal, ViewChild } from '@angular/core';

import { Store } from '@ngrx/store';

import { countryFeature } from '../../../store/features/country.feature';
import { CountryActions } from '../../../store/actions/country.actions';

@Component({
  selector: 'app-table',
  imports: [],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
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
  itemHeight: number = 40;
  visibleCount = signal<number>(Math.floor(800 / this.itemHeight));

  ngOnInit(): void {
    this.store.dispatch(CountryActions.loadData({ params: this.params }));
  }

  loadMore(): void {
    const container = this.scrollContainer.nativeElement;
    const scrollTop = container.scrollTop;
    const bottom = container.scrollHeight === (container.scrollTop + container.clientHeight);
    if (scrollTop > this.scrollTop && !bottom) {
      this.scrollTop = scrollTop;
      const start = Math.floor(scrollTop / this.itemHeight);
      const end = this.currentPage() + 1;
      const params = { query: this.searchQuery(), start, end };
      this.store.dispatch(CountryActions.loadMore({ params }));
    }
  }

}
