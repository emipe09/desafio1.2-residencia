import { DateTime, Interval } from 'luxon';

export class Consulta{

    constructor(cpf, data, horaInicial, horaFinal){
        
        this.cpf = cpf;
        this.data = data;
        this.horaInicial = horaInicial;
        this.horaFinal = horaFinal;
    }

}