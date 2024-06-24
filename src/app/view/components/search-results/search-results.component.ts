// src/app/view/components/search-results/search-results.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {
  arts: any[] = [];

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras?.state as { arts: any[] } | undefined;
    this.arts = state?.arts || [];
  }

  ngOnInit(): void {}

  viewArt(art: any) {
    this.router.navigate(['/description-art', art.artistId, art.id]);
  }
}
