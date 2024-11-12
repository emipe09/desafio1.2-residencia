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
            console.log("Paciente não encontrado");
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
        let dataConsulta = DateTime.fromFormat(data, 'dd/MM/yyyy');
        if(i != -1){
            if((horaInicial<800)||(horaInicial>1900) &&(horaFinal>horaInicial)
                &&((dataConsulta.isValid)&&(dataConsulta > DateTime.now()))
                &&((horaInicial%100)%15 != 0 || (horaFinal%100)%15 != 0)){    
                    let consulta = new Consulta(cpf, data, horaInicial, horaFinal);
                    this.#consultas.push(consulta); 
                }            
            else{
                console.log("Data ou horário inválida");
            }
        }
        else{
            console.log("Paciente não encontrado");
        }
    }
        

    cancelarConsulta(cpf, data, horaInicial, horaFinal){
        let i = this.#consultas.findIndex(p => p.cpf == cpf);
        if(i != -1){
            this.#consultas.splice(i, 1);
        }
        else{
            console.log("Consulta não encontrada");
        }
    }

    listarConsultas(){
        this.#consultas.sort((a, b) => a.data.localeCompare(b.data));
        console.log('-------------------------------------');
        console.log('CPF | Data | Hora Inicial | Hora Final');
        console.log('-------------------------------------');
        this.#consultas.forEach(p => {
            console.log(`${p.cpf} | ${p.data} | ${p.horaInicial} | ${p.horaFinal}`);
        });
    }

}