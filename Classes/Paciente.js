import { DateTime, Interval } from 'luxon';

export class Paciente{
    /**
     * 
     * @param {*} cpf -- identificador único, 11 caracteres
     * @param {*} nome -- nome do paciente, mais de 5 caracteres
     * @param {*} dataNasc -- data de nascimento do paciente, no formato dd/MM/yyyy
     */
    constructor(cpf, nome, dataNasc){
        if(cpf.length!=11){
            throw new Error("CPF inválido");
        }
        this.cpf = cpf;

        if(nome.length<5){
            throw new Error("Nome deve possuir mais de 5 caracteres");
        }
        this.nome = nome;

        let data = DateTime.fromFormat(dataNasc, 'dd/MM/yyyy');
        if(!data.isValid){
            throw new Error("Data inválida");
        }
        let i = Interval.fromDateTimes(data, DateTime.now());
        let idade = Math.trunc(i.length('years'));
        if(idade < 13){
            throw new Error("O dentista não atende menores de 13 anos");
        }
        this.idade = idade;
        this.dataNasc = data.toFormat('dd/MM/yyyy');
    }


}