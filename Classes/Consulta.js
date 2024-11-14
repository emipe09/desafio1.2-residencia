import { DateTime, Interval } from 'luxon';

export class Consulta{

    constructor(cpf, dataConsulta, horaInicial, horaFinal){
        dataConsulta = DateTime.fromFormat(dataConsulta, 'dd/MM/yyyy');
        if((horaInicial>800 && horaInicial<1900) && (horaFinal>horaInicial)
            &&((dataConsulta.isValid && dataConsulta > DateTime.now()))
            &&((horaInicial%100)%15 == 0 && (horaFinal%100)%15 == 0)){    
                this.cpf = cpf;      
                dataConsulta = dataConsulta.toFormat('dd/MM/yyyy');
                this.dataConsulta = dataConsulta;
                this.horaInicial = horaInicial;
                this.horaFinal = horaFinal;
            }                
        else{
            throw new Error("Data ou horário inválido");
        } 
    }   
}