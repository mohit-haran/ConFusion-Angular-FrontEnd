import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Router } from '@angular/router';
import { flyInOut, expand } from '../animations/app.animation'

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  host:{
    '[@flyInOut]': 'true',
    'style' :'display: block'
  },
  animations:[
    flyInOut(),
    expand()
  ]
})
export class MenuComponent implements OnInit {

  dishes: Dish[];
  errMsg: string;

  constructor(private dishService: DishService, private router: Router, @Inject('BaseURL') public BaseURL) { }

  ngOnInit(): void {
    this.dishService.getDishes()
      .subscribe(dishes=>{
        this.dishes = dishes;
      },errmess => this.errMsg = <any>errmess);
  }

  onSelect(dish:Dish){
    this.router.navigate(['/dishdetail',dish.id]);
  }

}
