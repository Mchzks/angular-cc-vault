import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CC } from 'src/app/models/CC';
import { CcService } from 'src/app/services/cc.service';

@Component({
  selector: 'app-list-cc',
  templateUrl: './list-cc.component.html',
  styleUrls: ['./list-cc.component.css']
})
export class ListCcComponent implements OnInit {

  listCards: CC[] = [];

  constructor(
    private _cardService: CcService,
    private toast: ToastrService
  ) {
    this.getCards();
  }

  ngOnInit(): void {
  }

  getCards() {
    this._cardService.listCC().subscribe(doc => {
      this.listCards = [];
      doc.forEach((element: any) => {
        this.listCards.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
      console.log(this.listCards);
    });
  }

  deleteCC(id: any) {
    this._cardService.deleteCC(id).then(() => {
      this.toast.error('Deleted Card!', 'Delete')
    }, error => {
      this.toast.error('Something went wrong...', 'Error')
      console.log(error);
    })
  }
  
  editCC(card: CC) {
    this._cardService.editCC(card);
  }
}
