import { Component, OnInit, ViewChild, Inject} from '@angular/core';
import { Location } from '@angular/common';
import { Params, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { switchMap } from 'rxjs/operators';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Comment } from '../shared/comment';
import { visibility, flyInOut, expand } from '../animations/app.animation';



@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
  host:{
    '[@flyInOut]': 'true',
    'style' :'display: block'
  },
  animations:[
    flyInOut(),
    visibility(),
    expand()
  ]
})
export class DishdetailComponent implements OnInit {

  dish: Dish;
  dishCopy: Dish;
  dishIds: string[];
  prev: string;
  next: string;
  left = faChevronLeft;
  right = faChevronRight;
  errMsg: string;

  comment: Comment;
  commentForm: FormGroup;

  visibility = 'shown';

  @ViewChild ('commentform') contactFormDirective;

  formErrors = {
    comment:'',
    author:'',
  }

  validationMessages = {
    comment:{
      required:'Comment is required.'
    },
    author:{
      required:'Author name is required.',
      minlength:'Author name must be 2 characters long.',
      maxlength:'Author name must not exceed 25 characters'
    }
  }

  constructor(private dishService: DishService,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder,
    @Inject('BaseURL') public BaseURL) {
      this.createForm();
     }

  ngOnInit(): void {
    
    this.dishService.getDishIds()
    .subscribe( dishIds => {this.dishIds = dishIds;});

    let id = this.route.params.pipe(switchMap((params: Params)=> { this.visibility='hidden'; return this.dishService.getDish(params['id']); }))
      .subscribe(dish => { this.dish = dish; this.dishCopy = dish; this.setPrevNext(dish.id); this.visibility="shown"; } , errmess=> this.errMsg = <any>errmess); 
  }

  setPrevNext(dishId: string){

    let index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];

  }

  createForm(){
    this.commentForm = this.fb.group({
      rating:5,
      comment:['',[Validators.required]],
      author:['',[Validators.required, Validators.minLength(2), Validators.maxLength(25)]]
    });

    this.commentForm.valueChanges
      .subscribe(data => this.valueChanged(data));
    
    this.valueChanged();
  }

  valueChanged(data?){
    if(!this.commentForm)
    return;

    let form = this.commentForm;

    for(let field in this.formErrors)
    {
      if(this.formErrors.hasOwnProperty(field))
      {
        this.formErrors[field]='';
        let control = form.get(field);
        
        if(control && control.dirty && !control.valid)
        {
          let messages = this.validationMessages[field];
          for(let key in control.errors)
          {
            if(control.errors.hasOwnProperty(key))
            {
              this.formErrors[field] += messages[key];
            }

          }
        }
      }
    }
  }

  onSubmit()
  {
    this.comment = this.commentForm.value;
    this.comment.date = new Date().toISOString();
    this.dishCopy.comments.push(this.comment);
    this.dishService.putDish(this.dishCopy)
      .subscribe(dish =>{
        this.dish = dish;
        this.dishCopy = dish;
      }, errMsg => { this.dish = null; this.dishCopy = null; this.errMsg = errMsg });
    this.commentForm.reset({
      rating:1,
      comment:'',
      author:''
    });

    this.contactFormDirective.resetForm();
  }

  goBack(): void {
    this.location.back();
  }

}
