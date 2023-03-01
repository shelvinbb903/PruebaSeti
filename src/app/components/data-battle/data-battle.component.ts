import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-data-battle',
  templateUrl: './data-battle.component.html',
  styleUrls: ['./data-battle.component.scss']
})
export class DataBattleComponent implements OnInit {
  constructor(private activeModal: NgbActiveModal, public pokemonSer: PokemonService) {}

  showLoading = false;
  resultSimulation:any = []

  async ngOnInit() {
    await this.getDataType()    
  }

  /**
   * Metodo para generar datos de simulacion de una batalla entre dos pokemon
   *
   */
  async getDataType() {
    this.showLoading = true
    this.resultSimulation = await this.pokemonSer.simulateBattle();
    this.showLoading = false
  }

  /**
   * Metodo para cerrar el modal
   *
   */
  async closeModal() {
    this.activeModal.close('Modal Closed');
  }
}
