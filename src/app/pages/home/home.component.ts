import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataBattleComponent } from 'src/app/components/data-battle/data-battle.component';
import { DataPokemonComponent } from 'src/app/components/data-pokemon/data-pokemon.component';
import { PokemonService } from '../../services/pokemon.service';

@Component({
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
  })
  export class HomeComponent implements OnInit {

    constructor(public modalService: NgbModal, private pokemonSer: PokemonService) {}

    listMenu:any = [];
  
    selectedPokemon = 0;
    showLoading = false;
  
    async ngOnInit() {
      await this.listAllData()
    }
    
    /**
     * Metodo para mostrar las dos opciones de cada pokemon renderizado en patalla. Esto se ejecuta en el evento click
     *
     */
    toggleOption(item: any) {
      //this.listMenu.forEach((item: any) => item.showoptions = false)
      item.showoptions = !item.showoptions;
    }
    
    /**
     * Metodo para abrir el modal con la informacion del pokemon seleccionado
     */
    openDataPokemon = (item: any) => {
      item.showoptions = !item.showoptions;
      const modalRef = this.modalService.open(DataPokemonComponent, { size: 'sm' });
      modalRef.componentInstance.dataPokemon = item;
    }
    
    /**
     * Metodo para seleccionar el pokemon, el cual se va a usar para simular una batalla
     */
    selectPokemon(item: any) {
      item.showoptions = !item.showoptions;
      item.selected = !item.selected;
  
      if(item.selected) {
        this.selectedPokemon++;
        this.pokemonSer.pokemonBattle.push(item)
      }else{
        this.selectedPokemon--;
        this.pokemonSer.pokemonBattle = this.pokemonSer.pokemonBattle.filter((data:any) => data.id != item.id)
      }
    }
    
    /**
     * Evento click del boton iniciar batalla
     */
    startBattle = () => {
      this.modalService.open(DataBattleComponent, {backdrop: false}).result.then(
        (result) => {
          this.listMenu.forEach((item: any) => item.selected = false)
          this.selectedPokemon = 0
          this.pokemonSer.pokemonBattle = []
        },
        (reason) => {
          this.listMenu.forEach((item: any) => item.selected = false)
          this.selectedPokemon = 0
          this.pokemonSer.pokemonBattle = []
        },
      );      
    }

    /**
     * Metodo que genera el listado completo de los pokemon a renderizar en pantalla
     */
    async listAllData() {
      this.showLoading = true

      const result:any = await this.pokemonSer.getInfo("/api/v2/pokemon?limit=150")
      if(!result.error){
        this.listMenu = [...result.data.results]

        this.listMenu.forEach(async (item:any) => {
          const dataPokemon:any = await this.pokemonSer.getInfo(item.url)
          item.id = dataPokemon.data.id;
          
          if(!dataPokemon.error){
              
            let types:any = []
            dataPokemon.data.types.forEach((type: any) => {
                types.push(type.type.name)
            });
            
            item.type = types.join(" / ");
            item.nameTypes = [...types];
            item.listType = [...dataPokemon.data.types]
            
            let codImage = "";
            
            if (item.id > 9 && item.id < 100) {
                codImage = `0${item.id}`
            } else if (item.id < 10){
                codImage = `00${item.id}`
            } else{
                codImage = `${item.id}`
            }
            item.image = `../../../assets/images/${codImage}.png`
            item.showoptions = false;
            item.selected = false;
            item.stats = [...dataPokemon.data.stats]
          }
            
        });
      }
      this.showLoading = false        
    }
  }