import { Component, OnInit } from '@angular/core';
import { QuestionServicesService } from '../services/question-services.service';
import {interval} from 'rxjs'
@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {

  public name:string='';
  public questionList:any=[];
  public currentQuestion:number=0;
  public points:number=0;
  public counter=60;
  correctAnswer:number=0;
  incorrectAnswer:number=0;
  interval$: any;
  progress:string='0';
  constructor(private questionService:QuestionServicesService) { }

  ngOnInit(): void {
    this.getAllQuesion();
    this.name=localStorage.getItem('name')!;
    this.startCounter();
  }
  getAllQuesion(){
    this.questionService.getQuestionJson().subscribe((res:any)=>{
      this.questionList=res.questions;
    })
  }

  nextQuestion(){
    this.currentQuestion++;
    this.resetCounter();
  }

  previousQuestion(){
    this.currentQuestion--;
  }
  answer(currentQuestion:number,option:any){
    if(option.correct){
      this.points+=10;
      this.correctAnswer++;
      this.getProgressPercentage();
      this.currentQuestion++;
      this.resetCounter();
    }else{
      this.points-=10;
      this.incorrectAnswer++;
      this.currentQuestion++;
      this.resetCounter();
      this.getProgressPercentage();

    }
  }
  
  startCounter(){
    this.interval$=interval(1000).subscribe((val:any)=>{
      this.counter--;
      if(this.counter===0){
        this.counter=60;
        this.points-=10;
      }
    });

    setTimeout(()=>{
      this.interval$.unsubscribe();
    },60000)
  }

  stopCounter(){
    this.interval$.unsubscribe();
    this.counter=0;

  }

  resetCounter(){
    this.stopCounter();
    this.counter=60;
    this.startCounter();
  }

  resetQuiz(){
    this.stopCounter();
    this.getAllQuesion();
    this.points=0;
    this.counter=60;
    this.currentQuestion=0;
    this.progress="0";
  }

  getProgressPercentage(){
    this.progress=((this.currentQuestion/this.questionList.length)*100).toString();
    console.log(this.progress)
    return this.progress;
  }

}
