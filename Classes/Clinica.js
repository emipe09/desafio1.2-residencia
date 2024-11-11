import { DateTime, Interval } from 'luxon';
import { Paciente } from './paciente.js';

export class Clinica{
    #pacientes = [];
    constructor(nome, endereço, telefone){
        this.nome = nome;
        this.endereço = endereço;
        this.telefone = telefone;
    }

    addPaciente(cpf, nome, dataNasc){
        let paciente = new Paciente(cpf, nome, dataNasc);
        this.#pacientes.push(paciente);
    }

    removePaciente(cpf){
        let i = this.#pacientes.findIndex(p => p.cpf == cpf);
        if(i != -1){
            this.#pacientes.splice(i, 1);
        }
    }

    listarPacientesNome(){
        this.#pacientes.sort((a, b) => a.nome.localeCompare(b.nome));
        console.log('-------------------------------------');
        console.log('CPF | Nome | Data de Nascimento | Idade');
        console.log('-------------------------------------');
        this.#pacientes.forEach(p => {
            console.log(`${p.cpf} | ${p.nome} | ${p.dataNasc} | ${p.idade}`);
        });

    }

    listarPacientesCpf(){
        this.#pacientes.sort((a, b) => a.cpf.localeCompare(b.cpf));
        console.log('-------------------------------------');
        console.log('CPF | Nome | Data de Nascimento | Idade');
        console.log('-------------------------------------');
        this.#pacientes.forEach(p => {
            console.log(`${p.cpf} | ${p.nome} | ${p.dataNasc} | ${p.idade}`);
        });
    }

    agendarConsulta(cpf, data, horaInicial, horaFinal){
        let i = this.#pacientes.findIndex(p => p.cpf == cpf);
        if((i != -1)&&(horaFinal>horaInicial)){
            let dataConsulta = DateTime.fromFormat(data, 'dd/MM/yyyy');
            //validando horario HHMM
            if((horaInicial<0)||(horaInicial>2359)||(horaFinal<0)||(horaFinal>2359)){
                throw new Error("Horário inválido");
            }
            if(dataConsulta.isValid){
                this.#pacientes[i].agendarConsulta(dataConsulta);
            }
            else{
                throw new Error("Data inválida");
            }
        }
    }


}