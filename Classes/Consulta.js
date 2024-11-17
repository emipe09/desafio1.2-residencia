import { DateTime} from 'luxon';

export class Consulta{
    /**
     * 
     * @param {*} cpf -- identificador único do paciente para a consulta
     * @param {*} dataConsulta -- data da consulta no formato dd/MM/yyyy
     * @param {*} horaInicial -- hora de início da consulta no formato HHmm
     * @param {*} horaFinal -- hora de término da consulta no formato HHmm
     * Aplica as regras de validação para a criação de uma consulta 
     * e lança um erro caso a data ou horário inválido
     */
    constructor(cpf, dataConsulta, horaInicial, horaFinal){
        dataConsulta = DateTime.fromFormat(dataConsulta, 'dd/MM/yyyy');
        if((horaInicial>800 && horaInicial<1900) && (horaFinal>horaInicial)
            &&((dataConsulta.isValid && dataConsulta > DateTime.now()))
            &&((horaInicial%100)%15 == 0 && (horaFinal%100)%15 == 0)){    
                this.cpf = cpf;      
                this.dataConsulta = dataConsulta;
                this.horaInicial = horaInicial;
                this.horaFinal = horaFinal;
            }                
        else{
            throw new Error("Data ou horário inválido");
        } 
    }   
}