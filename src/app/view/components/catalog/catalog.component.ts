import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArtService } from 'src/app/model/service/artService/art.service';
import { AuthService } from 'src/app/model/service/authService/auth.service';


@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css'],
})
export class CatalogComponent implements OnInit {
  arts: any[] = [];
  artistId: string = '';

  filteredArts: any[] = [];
  techniques: string[] = ['Óleo', 'Aquarela', 'Digital', 'Acrílica', 'Outra'];
  selectedTechnique: string = '';

  searchText: string = '';

  isLoggedIn: boolean = false;
  techniqueDetails: {[key: string]: {text: string, imageUrl: string}} = {
    'Óleo': {
      text: 'A pintura a óleo é uma técnica artística na qual pigmentos são suspensos em óleo secante, formando uma tinta de textura densa e brilho duradouro.',
      imageUrl: '/assets/oil.jpg'
    },
    'Aquarela': {
      text: 'A aquarela é uma técnica de pintura em que os pigmentos são dissolvidos em água, resultando em uma obra de arte com tons suaves e transparências.',
      imageUrl: '/assets/water.jpg'
    },
    'Digital': {
      text: 'A arte digital é criada em plataformas digitais, utilizando softwares e ferramentas específicas para criar ilustrações, pinturas e designs gráficos.',
      imageUrl: '/assets/digital.jpg'
    },
    'Acrílica': {
      text: 'A pintura acrílica usa tintas à base de polímeros acrílicos que secam rapidamente, permitindo cores vibrantes e variadas técnicas de aplicação.',
      imageUrl: '/assets/acrylic.jpg'
    },
    'Outra': {
      text: 'Nesta seção se encontram todas as outras formas de pintura, descubra novas técnicas!',
      imageUrl: '/assets/other.jpg'
    }

  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private artService: ArtService,
    private authService: AuthService
  ) {
    this.artistId = this.route.snapshot.paramMap.get('id')!;
  }

  ngOnInit() {
    this.artService.getAllArts().subscribe(arts => {
      this.arts = this.shuffleArray(arts);
      this.filteredArts = arts;
    });

    this.authService.isLoggedIn().subscribe(loggedIn =>{
      this.isLoggedIn = loggedIn;
    })
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

  async navigateToPublish(): Promise<void> {
    const userId = await this.authService.getCurrentUserId();
    if (userId) {
      this.router.navigate([`profile/${userId}/publish-art`]);
    } else {
      this.router.navigate([`/signin`]);
      console.error('User not logged in');
    }
  }

  navigateToGallery(){
    this.router.navigate([`/gallery`])
    console.log('te amo vitória')
  }

  shuffleArray(array: any[]): any[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  
}
