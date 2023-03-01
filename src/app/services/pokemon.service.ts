import { Injectable } from '@angular/core';
import { RestService } from './rest.service';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  pokemonBattle:any = []

  constructor(private rest: RestService) { }

  /**
   * Metodo para consumir el servicio de obtener los datos acerca de los pokemon
   *
   * @param   {string}  url   URL del servicio
   * @param   {any}     data  Datos que se pasan como parametro. Si no hay se envio un objeto vacio
   *
   * @return  {Promise<Object>}        Retorna una promesa con un objeto, el cual contiene la respuesta del servicio y un atributo para indicar si se genero error
   */
  getInfo = (url:string, data: any = {}) => {
    return this.rest.connectionGET(url, data);
  }

  /**
   * Metodo para realizar la simulacion de una batalla entre dos pokemon
   *
   * @return  {any[]}  Listado con el resultado de la simulacion
   */
  async simulateBattle() {
    let restultBattle:any = [{
      first: "",
      second: ""
    },
    {
      first: "",
      second: ""
    },
    {
      first: "",
      second: "",
      firstNumber: 0,
      secondNumber: 0,
      classFirst: "",
      classSecond: ""
    }];
    
    const arrayFrom = ["double_damage_from", "half_damage_from", "no_damage_from"]
    const arrayTo = ["double_damage_to", "half_damage_to", "no_damage_to"]
    
    // Se verifica el resultado del primer turno cuando el segundo pokemon ataca y cuando defiendo
    await this.pokemonBattle[1].nameTypes.map(async (nameType:any) => {

      this.pokemonBattle[0].listType.map(async ({type}:any) => {
         
        const result:any = await this.getInfo(type.url)
        if(!result.error){
          
          arrayFrom.map((dataFrom: any) => {
            const dataDamage = result.data.damage_relations[dataFrom].find((damage:any) => damage.name == nameType);
            let numberText = 0;
            if(dataDamage) {         

              switch(dataFrom) {
                case "double_damage_from":
                  numberText = 70;
                  break;
                case "half_damage_from":
                  numberText = 30;
                  break;
                case "no_damage_from":
                  numberText = 0;
                  break;
              }
              
              if(restultBattle[0].first == "") {
                restultBattle[0].first = `${numberText > 0 ? '-': ''}${numberText} PTS ${dataFrom} ${nameType}`                          
                restultBattle[2].firstNumber = (numberText > 0 ? (numberText * -1) : numberText) + restultBattle[2].firstNumber;
              }
              
            }            
          })
          if(restultBattle[0].first == "") {
            restultBattle[0].first = `0 PTS no_damage_to ${nameType}`
          }
          arrayTo.map((dataFrom: any) => {
            const dataDamage = result.data.damage_relations[dataFrom].find((damage:any) => damage.name == nameType);
            let numberText = 0;
            if(dataDamage) {              

              switch(dataFrom) {
                case "double_damage_to":
                  numberText = 70;
                  break;
                case "half_damage_to":
                  numberText = 30;
                  break;
                case "no_damage_to":
                  numberText = 0;
                  break;
              }
              
              if(restultBattle[1].first == "") {
                restultBattle[1].first = `${numberText > 0 ? '+': ''}${numberText} PTS ${dataFrom} ${nameType}`                          
                restultBattle[2].firstNumber = numberText + restultBattle[2].firstNumber;
              }
            }            
          })
          if(restultBattle[1].first == "") {
            restultBattle[1].first = `0 PTS no_damage_to ${nameType}`
          }

          
          restultBattle[2].first = `${restultBattle[2].firstNumber > 0 ? '+' : ''}${restultBattle[2].firstNumber} Puntos`;
          restultBattle[2].second = `${restultBattle[2].secondNumber > 0 ? '+' : ''}${restultBattle[2].secondNumber} Puntos`;

          restultBattle[2].classFirst = restultBattle[2].firstNumber <= 0 ? 'pokemon-lose' : '';
          restultBattle[2].classSecond = restultBattle[2].secondNumber <= 0 ? 'pokemon-lose' : '';
        } 
      });
    });

    // Se verifica el resultado del segundo turno cuando el primer pokemon ataca y cuando defiendo
    await this.pokemonBattle[0].nameTypes.map(async (nameType:any) => {

      this.pokemonBattle[1].listType.map(async ({type}:any) => {
         
        const result:any = await this.getInfo(type.url)
        if(!result.error){
          
          arrayTo.map((dataFrom: any) => {
            const dataDamage = result.data.damage_relations[dataFrom].find((damage:any) => damage.name == nameType);
            let numberText = 0;
            if(dataDamage) {
              

              switch(dataFrom) {
                case "double_damage_to":
                  numberText = 70;
                  break;
                case "half_damage_to":
                  numberText = 30;
                  break;
                case "no_damage_to":
                  numberText = 0;
                  break;
              }
              if(restultBattle[0].second == "") {
                restultBattle[0].second = `${numberText > 0 ? '+': ''}${numberText} PTS ${dataFrom} ${nameType}`                                               
                restultBattle[2].secondNumber = numberText + restultBattle[2].secondNumber;
              }
            }            
          })
          if(restultBattle[0].second == "") {
            restultBattle[0].second = `0 PTS no_damage_to ${nameType}`
          }
          arrayFrom.map((dataFrom: any) => {
            const dataDamage = result.data.damage_relations[dataFrom].find((damage:any) => damage.name == nameType);
            let numberText = 0;
            if(dataDamage) {
              

              switch(dataFrom) {
                case "double_damage_from":
                  numberText = 70;
                  break;
                case "half_damage_from":
                  numberText = 30;
                  break;
                case "no_damage_from":
                  numberText = 0;
                  break;
              }
              if(restultBattle[1].second == "") {
                restultBattle[1].second = `${numberText > 0 ? '-': ''}${numberText} PTS ${dataFrom} ${nameType}`                          
                restultBattle[2].secondNumber = (numberText > 0 ? (numberText * -1) : numberText) + restultBattle[2].secondNumber;
              }
              
            }            
          })
          if(restultBattle[1].second == "") {
            restultBattle[1].second = `0 PTS no_damage_to ${nameType}`
          }
          restultBattle[2].first = `${restultBattle[2].firstNumber > 0 ? '+' : ''}${restultBattle[2].firstNumber} Puntos`;
          restultBattle[2].second = `${restultBattle[2].secondNumber > 0 ? '+' : ''}${restultBattle[2].secondNumber} Puntos`;

          restultBattle[2].classFirst = restultBattle[2].firstNumber <= 0 ? 'pokemon-lose' : '';
          restultBattle[2].classSecond = restultBattle[2].secondNumber <= 0 ? 'pokemon-lose' : '';
        } 
      });
    });

    return restultBattle;
  }
  
}
