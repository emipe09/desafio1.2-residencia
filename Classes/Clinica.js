import { DateTime, Interval } from 'luxon';
import { Paciente } from './paciente.js';s

export class Clinica{
    constructor(nome, endereço, telefone){
        this.nome = nome;
        this.endereço = endereço;
        this.telefone = telefone;
        this.pacientes = [];
    }

    addPaciente(p){
        if(p){
            this.pacientes.push(p);
        }
    }

    removePaciente(cpf){
        let i = this.pacientes.findIndex(p => p.cpf == cpf);
        if(i != -1){
            this.pacientes.splice(i, 1);
        }
    }

    listarPacientesNome(){
        this.pacientes.sort((a, b) => a.nome.localeCompare(b.nome));
        console.log('-------------------------------------');
        console.log('CPF | Nome | Data de Nascimento | Idade');
        console.log('-------------------------------------');
        this.pacientes.forEach(p => {
            console.log(`${p.cpf} | ${p.nome} | ${p.dataNasc} | ${p.idade}`);
        });

    }

    listarPacientesCpf(){
        this.pacientes.sort((a, b) => a.cpf.localeCompare(b.cpf));
        console.log('-------------------------------------');
        console.log('CPF | Nome | Data de Nascimento | Idade');
        console.log('-------------------------------------');
        this.pacientes.forEach(p => {
            console.log(`${p.cpf} | ${p.nome} | ${p.dataNasc} | ${p.idade}`);
        });
    }
}