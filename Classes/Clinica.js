import { Paciente } from './paciente.js';
import { Consulta } from './Consulta.js';

export class Clinica{
    #pacientes = []; //array de pacientes (objeto) da clínica
    #consultas = []; //array de consultas (objeto) da clínica
    /**
     * 
     * @param {*} nome -- nome da clínica
     * @param {*} endereço -- endereço da clínica
     * @param {*} telefone -- telefone da clínica
     */
    constructor(nome, endereço, telefone){
        this.nome = nome;
        this.endereço = endereço;
        this.telefone = telefone;
    }

    /**
     * 
     * @param {*} cpf 
     * @param {*} nome 
     * @param {*} dataNasc 
     * Adiciona um paciente ao array de pacientes da clínica, acessando a classe Paciente
     */
    addPaciente(cpf, nome, dataNasc){
        let i = this.#pacientes.findIndex(p => p.cpf == cpf);
        if(i != -1){
            throw new Error("CPF já cadastrado");
        }
        else{
            let paciente = new Paciente(cpf, nome, dataNasc);
            this.#pacientes.push(paciente);
        }
    }

    /**
     * 
     * @param {*} cpf -- identificador único do paciente para remoção
     * Remove um paciente do array de pacientes da clínica
     */
    removePaciente(cpf){
        let i = this.#pacientes.findIndex(p => p.cpf == cpf);
        if(i != -1){
            this.#pacientes.splice(i, 1);
        }
        else{
            throw new Error("Paciente não encontrado");
        }
    }

    /**
     * Lista os pacientes cadastrados na clínica em ordem alfabética de nome
     */
    listarPacientesNome(){
        this.#pacientes.sort((a, b) => a.nome.localeCompare(b.nome));
        console.log('-------------------------------------');
        console.log('CPF | Nome | Data de Nascimento | Idade');
        console.log('-------------------------------------');
        this.#pacientes.forEach(p => {
            console.log(`${p.cpf} | ${p.nome} | ${p.dataNasc} | ${p.idade}`);
        });

    }

    /**
     * Lista os pacientes cadastrados na clínica em ordem crescente de CPF
     */
    listarPacientesCpf(){
        this.#pacientes.sort((a, b) => a.cpf.localeCompare(b.cpf));
        console.log('-------------------------------------');
        console.log('CPF | Nome | Data de Nascimento | Idade');
        console.log('-------------------------------------');
        this.#pacientes.forEach(p => {
            console.log(`${p.cpf} | ${p.nome} | ${p.dataNasc} | ${p.idade}`);
        });
    }

    /**
     * 
     * @param {*} cpf 
     * @param {*} dataConsulta 
     * @param {*} horaInicial 
     * @param {*} horaFinal 
     * Agendar uma consulta para um paciente, acessando a classe Consulta e adicionando ao array de consultas
     * O paciente deve estar cadastrado na clínica e deve haver disponibilidade de horário
     * Além de respeitar os horários de atendimento da clínica (das 8h às 19h e de múltiplos de 15)
     */
    agendarConsulta(cpf, dataConsulta, horaInicial, horaFinal){
        let i = this.#pacientes.findIndex(p => p.cpf == cpf);
        let j = this.#consultas.findIndex(c => c.dataConsulta == dataConsulta && c.horaInicial == horaInicial);
        if(i != -1 && j == -1){
            let consulta = new Consulta(cpf, dataConsulta, horaInicial, horaFinal);
            this.#consultas.push(consulta);
        }
        else{
            throw new Error("Paciente não encontrado");
        }
    }
        
    /**
     * 
     * @param {*} cpf 
     * @param {*} data 
     * @param {*} horaInicial 
     * Cancelar uma consulta agendada, acessando a classe Consulta e removendo do array de consultas
     */
    cancelarConsulta(cpf, data, horaInicial){
        let i = this.#consultas.findIndex(p => p.cpf == cpf && p.dataConsulta == data && p.horaInicial == horaInicial);
        if(i != -1){
            this.#consultas.splice(i, 1);
        }
        else{
            throw new Error("Consulta não encontrada");
        }
    }

    /**
     * Lista as consultas agendadas na clínica em ordem crescente de data
     */
    listarConsultas(){
        this.#consultas.sort((a, b) => a.dataConsulta.localeCompare(b.dataConsulta));
        console.log('-------------------------------------');
        console.log('CPF | Data | Hora Inicial | Hora Final');
        console.log('-------------------------------------');
        this.#consultas.forEach(c => {
            console.log(`${c.cpf} | ${c.dataConsulta} | ${c.horaInicial} | ${c.horaFinal}`);
        });
    }

}