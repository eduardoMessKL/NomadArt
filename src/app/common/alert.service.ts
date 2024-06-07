import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private subject = new Subject<string>(); //O que é e o que faz o Subject?
  alert$ = this.subject.asObservable(); //Pra que serve o $ e a função asObservable?

  showAlert(message: string){
    this.subject.next(message) //qual a função do metodo next?
  }

  clearAlert(){
    this.subject.next('')
  }
}
