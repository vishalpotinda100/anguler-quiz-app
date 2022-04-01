import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class QuestionServicesService {

  constructor(private _http:HttpClient) { }

  getQuestionJson(){
    return this._http.get('assets/question.json');
  }
}
