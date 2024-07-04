import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';
import { ArtService } from 'src/app/model/service/artService/art.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-edit-art',
  templateUrl: './edit-art.component.html',
  styleUrls: ['./edit-art.component.css']
})
export class EditArtComponent implements OnInit {
  artistId: string;
  artId: string;
  art: any = {
    title: '',
    description: '',
    technique: '',
    imageUrl: '',
    year: ''
  };
  selectedFile: File | null = null;
  selectedImageUrl: string | ArrayBuffer | null = null;
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private artService: ArtService,
    private storage: AngularFireStorage,
    private spinner: NgxSpinnerService
  ) {
    this.artistId = this.route.snapshot.paramMap.get('id')!;
    this.artId = this.route.snapshot.paramMap.get('artId')!;
  }

  ngOnInit() {
    this.artService.getArt(this.artistId, this.artId).subscribe(art => {
      this.art = art;
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.selectedFile = file;

    if(file){
      const reader = new FileReader();
      reader.onload = (e) =>{
        const result = e.target?.result;
        if(result !== undefined){
          this.selectedImageUrl = result;
        }
      };
      reader.readAsDataURL(file);
    }
  }


  onSubmit() {
    this.spinner.show();
    setTimeout(()=>{  
      if(this.art.title.length > 50){
        this.errorMessage = 'Título não pode ter mais de 50 caracteres!';
        return;
      }
      if(this.art.description.length > 500){
        this.errorMessage = 'Descrição não pode ter mais de 500 caracteres!';
      }
      if (!this.art.title || !this.art.description || !this.art.technique) {
        this.errorMessage = 'Preencha todos os campos!';
        return;
      }
  
      if (this.selectedFile) {
        const filePath = `art_images/${this.artistId}/${this.selectedFile.name}`;
        const fileRef = this.storage.ref(filePath);
        const uploadTask = this.storage.upload(filePath, this.selectedFile);
  
        uploadTask.snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe(url => {
              this.art.imageUrl = url;
              this.saveArt();
            });
          })
        ).subscribe();
      } else {
        this.saveArt();
      }
      this.spinner.hide()  
    }, 3000)
  }

  saveArt() {
    this.artService.updateArt(this.artistId, this.artId, this.art).then(() => {
      this.router.navigate([`/profile/${this.artistId}/manage-art`]);
      console.log('Arte ATUALIZADA com Sucesso')
    });
  }

  navigateToManage(){
    this.router.navigate([`/profile/${this.artistId}/manage-art`])
  }

}
