import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArtService } from 'src/app/model/service/artService/art.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {
  arts: any[] = [];
  filteredArts: any[] = [];
  techniques: string[] = ['Óleo', 'Aquarela', 'Digital', 'Acrílica', 'Outra'];
  selectedTechnique: string = '';
  searchText: string = '';

  techniqueDetails: {[key: string]: {text: string, imageUrl: string}} = {
    'Óleo': {
      text: 'A pintura a oil é uma técnica artística na qual pigmentos são suspensos em oil secante, formando uma tinta de textura densa e brilho duradouro.',
      imageUrl: 'path/to/oleo-image.jpg'
    },
    'Aquarela': {
      text: 'A aquarela é uma técnica de pintura em que os pigmentos são dissolvidos em água, resultando em uma obra de arte com tons suaves e transparências.',
      imageUrl: 'path/to/aquarela-image.jpg'
    },
    'Digital': {
      text: 'A arte digital é criada em plataformas digitais, utilizando softwares e ferramentas específicas para criar ilustrações, pinturas e designs gráficos.',
      imageUrl: 'path/to/digital-image.jpg'
    },
    'Acrílica': {
      text: 'A pintura acrílica usa tintas à base de polímeros acrílicos que secam rapidamente, permitindo cores vibrantes e variadas técnicas de aplicação.',
      imageUrl: 'path/to/acrilico-image.jpg'
    },
    'Outra': {
      text: 'Outra',
      imageUrl: 'path'
    }

  }


  constructor(
    private router: Router,
    private artService: ArtService,
  ) {
  }

  ngOnInit() {
    this.artService.getAllArts().subscribe(arts => {
      this.arts = arts;
      this.filteredArts = arts;
    });
  }

  filterArts(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.selectedTechnique = target.value;
    this.applyFilters();
  }

  onSearchChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.searchText = target.value;
    this.applyFilters();
  }

  applyFilters() {
    let arts = this.arts;
    if (this.selectedTechnique) {
      arts = arts.filter(art => art.technique === this.selectedTechnique);
    }
    if (this.searchText) {
      arts = arts.filter(art => art.title.toLowerCase().includes(this.searchText.toLowerCase()));
    }
    this.filteredArts = arts;
  }

  viewArt(art: any) {
    this.router.navigate([`/description-art/${art.artistId}/${art.id}`]);
  }
}
