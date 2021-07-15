import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CC } from 'src/app/models/CC';
import { CcService } from 'src/app/services/cc.service';

@Component({
  selector: 'app-create-cc',
  templateUrl: './create-cc.component.html',
  styleUrls: ['./create-cc.component.css']
})
export class CreateCcComponent implements OnInit {

  form: FormGroup;
  loading = false;
  title = "Add";
  id: string | undefined;

  constructor(
    private fb: FormBuilder,
    private _cardService: CcService,
    private toast: ToastrService
  ) {
    this.form = this.fb.group({
      owner: ['', Validators.required],
      numberCC: ['', [Validators.required, Validators.minLength(16), Validators.maxLength(16)]],
      expire: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]],
      cvv: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]]
    })
  }

  ngOnInit(): void {
    this._cardService.getEdit().subscribe(data => {
      console.log(data);
      this.id = data.id;
      this.title = 'EDIT';
      this.form.patchValue({
        owner: data.owner,
        numberCC: data.numberCC,
        expire: data.expire,
        cvv: data.cvv
      })
    })
  }

  createCC() {
    if(this.id === undefined) {
      this.addCC();
    } else {
      this.editCC(this.id);
    }
  }

  addCC() {
    const CreditCard: CC = {
      owner: this.form.value.owner,
      numberCC: this.form.value.numberCC,
      expire: this.form.value.expire,
      cvv: this.form.value.cvv,
      created: new Date(),
      updated: new Date()
    }
    this.loading = true;
    this._cardService.saveCC(CreditCard).then(() => {
      this.loading = false;
      this.toast.success('Registered!', 'Success');
      this.form.reset();
    }, error => {
      this.loading = false;
      this.toast.success('Opps something went wrong...', 'Error');
      console.log(error);
    });
  }

  editCC(id: string) {
    const CreditCard: any = {
      owner: this.form.value.owner,
      numberCC: this.form.value.numberCC,
      expire: this.form.value.expire,
      cvv: this.form.value.cvv,
      updated: new Date()
    }
    this.loading = true;
    this._cardService.editCard(id, CreditCard).then(() => {
      this.loading = false;
      this.title = 'Add';
      this.form.reset();
      this.id = undefined;
      this.toast.info('Updated Card!', 'Updated')
    }, error => {
      console.log(error);
    })
  }
}
