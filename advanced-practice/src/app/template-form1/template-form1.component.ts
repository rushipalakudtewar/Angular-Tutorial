import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-template-form1',
  templateUrl: './template-form1.component.html',
  styleUrl: './template-form1.component.css'
})
export class TemplateForm1Component {
  genders=['male','female']
  onSubmit(form:NgForm)
  {
    console.log(form);
    
  }
}
