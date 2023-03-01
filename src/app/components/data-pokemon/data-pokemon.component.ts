import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-data-pokemon',
  templateUrl: './data-pokemon.component.html',
  styleUrls: ['./data-pokemon.component.scss']
})
export class DataPokemonComponent implements OnInit {
  constructor(private activeModal: NgbActiveModal) {}

  @Input() dataPokemon:any = {};

  ngOnInit() {
    
  }

  /**
   * Metodo para cerrar el modal
   *
   */
  async closeModal() {
    this.activeModal.close('Modal Closed');
  }
}
