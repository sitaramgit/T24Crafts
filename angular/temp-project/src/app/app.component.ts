import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { HeaderComponent } from './components/header/header.component';
// Array of numbers
const listOfNumbers = [1, 4, 3, 2, 7, 12];
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit {
  title = 'temp-project';
  ngOnInit(){
    // console.log(listOfNumbers)
    this.findPrimeNumbers(listOfNumbers);
  }
  findPrimeNumbers(numbrs: number[]){
    const res =numbrs.filter((num) => this.isPrime(num) && num);
    console.log(res)
  }

  isPrime(num: number){
    if(num <= 1) return false
    if(num === 2) return true
    for (let index = 2; index <= Math.sqrt(num); index++) {
      if(num % index===0)return false
      
    }
    return true
  }

}
