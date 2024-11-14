import { DateTime, Interval } from 'luxon';
import { Paciente } from './paciente.js';
import { Consulta } from './Consulta.js';

export class Clinica{
    #pacientes = [];
    #consultas = [];
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
        else{
            throw new error("Paciente não encontrado");
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

    agendarConsulta(cpf, dataConsulta, horaInicial, horaFinal){
        let i = this.#pacientes.findIndex(p => p.cpf == cpf);
        if(i != -1){
            let consulta = new Consulta(cpf, dataConsulta, horaInicial, horaFinal);
            this.#consultas.push(consulta);
        }
        else{
            throw new error("Paciente não encontrado");
        }
    }
        

    cancelarConsulta(cpf, data, horaInicial){
        let i = this.#consultas.findIndex(p => p.cpf == cpf && p.dataConsulta == data && p.horaInicial == horaInicial);
        if(i != -1){
            this.#consultas.splice(i, 1);
        }
        else{
            throw new error("Consulta não encontrada");
        }
    }

    listarConsultas(){
        this.#consultas.sort((a, b) => a.data.localeCompare(b.data));
        console.log('-------------------------------------');
        console.log('CPF | Data | Hora Inicial | Hora Final');
        console.log('-------------------------------------');
        this.#consultas.forEach(c => {
            console.log(`${c.cpf} | ${c.dataConsulta} | ${c.horaInicial} | ${c.horaFinal}`);
        });
    }

}