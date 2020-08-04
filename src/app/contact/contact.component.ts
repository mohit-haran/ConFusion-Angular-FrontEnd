import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Feedback, ContactType } from '../shared/feedback';
import { faPhoneAlt, faFax, faEnvelope, faEnvelopeOpen} from '@fortawesome/free-solid-svg-icons';
import { faSkype } from '@fortawesome/free-brands-svg-icons';
import { flyInOut } from '../animations/app.animation';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  host:{
    '[@flyInOut]': 'true',
    'style' :'display: block'
  },
  animations:[
    flyInOut()
  ]
})
export class ContactComponent implements OnInit {

  phone = faPhoneAlt;
  fax = faFax;
  envelope = faEnvelope;
  skype = faSkype;

  feedbackForm: FormGroup;
  feedback: Feedback;
  contactType = ContactType;

  @ViewChild('fform') feedbackFormDirective;

  formErrors = {
    firstname:'',
    lastname: '',
    telnum: '',
    email: ''
  };

  validationMessages = {
    firstname: {
      required: 'First name is required.',
      minlength: 'First name must be atleast 2 characters long.',
      maxlength: 'First name cannot exceed 25 characters.'
    },
    lastname: {
      required: 'Last name is required.',
      minlength: 'Last name must be atleast 2 characters long.',
      maxlength: 'Last name cannot exceed 25 characters.'
    },
    telnum: {
      required: 'Telephone number is required.',
      pattern: 'Telephone number must contain only numbers and must be 10 characters long.'
    },
    email:{
      required: 'E-mail is required.',
      email: 'Email not in valid format.'
    }
  }

  constructor(private fb: FormBuilder) {
    this.createForm();
   }

  ngOnInit(): void {
  }

  createForm() {
    this.feedbackForm = this.fb.group({
      firstname:['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      lastname:['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      telnum: [0 , [Validators.required, Validators.pattern('[0-9]{10}')]],
      email: ['', [Validators.required, Validators.email]],
      agree: false,
      contactType: 'None',
      message: ''
    });

    this.feedbackForm.valueChanges
      .subscribe((data) => this.onValueChanged(data));

    this.onValueChanged();
  }
  onSubmit(){
    this.feedback = this.feedbackForm.value;
    this.feedbackForm.reset({
      firstname:'',
      lastname:'',
      telnum:0,
      email:'',
      agree: false,
      contactType:'None',
      message:''
    });
    this.feedbackFormDirective.resetForm();
  }

  onValueChanged(data?){
    if(!this.feedbackForm)
    return;

    let form = this.feedbackForm;

    for(let field in this.formErrors)
    {
      if(this.formErrors.hasOwnProperty(field))
      {
        this.formErrors[field] = '';
        let control = form.get(field);
        if(control && control.dirty && !control.valid)
        {
          let messages = this.validationMessages[field];
          for(let key in control.errors){
            if(control.errors.hasOwnProperty(key)){
              this.formErrors[field]+=messages[key]+" "
            }
          }
        }
      }
    }

  }

}
