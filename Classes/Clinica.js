import { Paciente } from './paciente.js';
import { Consulta } from './Consulta.js';

import { DateTime } from 'luxon';

export class Clinica {
    #pacientes = []; //array de pacientes (objeto) da clínica
    #consultas = []; //array de consultas (objeto) da clínica
    /**
     * 
     * @param {*} nome -- nome da clínica
     * @param {*} endereço -- endereço da clínica
     * @param {*} telefone -- telefone da clínica
     */
    constructor(nome, endereço, telefone) {
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
    addPaciente(cpf, nome, dataNasc) {
        let i = this.#pacientes.findIndex(p => p.cpf == cpf);
        if (i != -1) {
            throw new Error("CPF já cadastrado");
        }
        else {
            let paciente = new Paciente(cpf, nome, dataNasc);
            this.#pacientes.push(paciente);
        }
    }

    /**
     * 
     * @param {*} cpf -- identificador único do paciente para remoção
     * Remove um paciente do array de pacientes da clínica
     */
    removePaciente(cpf) {
        let i = this.#pacientes.findIndex(p => p.cpf == cpf);
        let j = this.#consultas.findIndex(c => c.cpf == cpf);
        if (i != -1 && j == -1) {
            this.#pacientes.splice(i, 1);
        }
        else if (j != -1) {
            throw new Error("Paciente possuí consultas agendadas");
        }
        else {
            throw new Error("CPF não encontrado");
        }
    }
    /**
     * Lista os pacientes cadastrados na clínica em ordem crescente alfabética de nome
     * 
     */
    listarPacientesNome() {
        this.#pacientes.sort((a, b) => a.nome.localeCompare(b.nome));

        // Essa parte do código é responsável por formatar a saída de acordo com o tamanho dos campos de dados
        // O método Math.max() retorna o maior número de um ou mais números, nesse caso, o maior comprimento de CPF, nome, dataNasc e idade
        // Contando com o tamanho do titulo da coluna no cabeçalho
        const maxTamanhoNome = Math.max(...this.#pacientes.map(p => p.nome.length), 4);
        const linhaCabecalho = `${'CPF'.padEnd(11)} | ${'Nome'.padEnd(maxTamanhoNome)} | ${'Dt.Nasc.'.padEnd(10)} | ${'Idade'.padEnd(5)}`;
        const linhaDivisoria = '-'.repeat(linhaCabecalho.length);

        console.log(linhaDivisoria);
        console.log(linhaCabecalho);
        console.log(linhaDivisoria);

        this.#pacientes.forEach(p => {

            console.log(
                `${p.cpf.padEnd(11)} | ${p.nome.padEnd(maxTamanhoNome)} | ${p.dataNasc.padEnd(10)} | ${p.idade.toString().padStart(5)}`
            );

            const consultasDoPaciente = this.#consultas.filter(c => c.cpf === p.cpf);
            consultasDoPaciente.forEach(c => {
                console.log(`  Agendado para: ${c.dataConsulta.toFormat('dd/MM/yyyy')}`);
                console.log(`  ${c.horaInicial} às ${c.horaFinal}`);
            });
        });

        console.log(linhaDivisoria);
    }


    /**
     * Lista os pacientes cadastrados na clínica em ordem crescente de CPF
     * 
     */
    listarPacientesCpf() {
        this.#pacientes.sort((a, b) => a.cpf.localeCompare(b.cpf));

        const maxTamanhoNome = Math.max(...this.#pacientes.map(p => p.nome.length), 4);
        const linhaCabecalho = `${'CPF'.padEnd(11)} | ${'Nome'.padEnd(maxTamanhoNome)} | ${'Dt.Nasc.'.padEnd(10)} | ${'Idade'.padEnd(5)}`;
        const linhaDivisoria = '-'.repeat(linhaCabecalho.length);

        console.log(linhaDivisoria);
        console.log(linhaCabecalho);
        console.log(linhaDivisoria);

        this.#pacientes.forEach(p => {

            console.log(
                `${p.cpf.padEnd(11)} | ${p.nome.padEnd(maxTamanhoNome)} | ${p.dataNasc.padEnd(10)} | ${p.idade.toString().padStart(5)}`
            );

            const consultasDoPaciente = this.#consultas.filter(c => c.cpf === p.cpf);
            consultasDoPaciente.forEach(c => {
                console.log(`  Agendado para: ${c.dataConsulta.toFormat('dd/MM/yyyy')}`);
                console.log(`  ${c.horaInicial} às ${c.horaFinal}`);
            });
        });

        console.log(linhaDivisoria);
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
    agendarConsulta(cpf, dataConsulta, horaInicial, horaFinal) {
        let i = this.#pacientes.findIndex(p => p.cpf == cpf);
        let j = this.#consultas.findIndex(c => c.dataConsulta.toFormat('dd/MM/yyyy') == dataConsulta && ((horaInicial >= c.horaInicial && horaInicial < c.horaFinal) ||
            (horaFinal > c.horaInicial && horaFinal <= c.horaFinal) ||
            (horaInicial <= c.horaInicial && horaFinal >= c.horaFinal)));
        console.log(j);
        if (i != -1 && j == -1) {
            let consulta = new Consulta(cpf, dataConsulta, horaInicial, horaFinal);
            this.#consultas.push(consulta);
        }
        else if (i == -1) {
            throw new Error("Paciente não encontrado");
        }
        else if (j != -1) {
            throw new Error("Horário indisponível");
        }
    }

    /**
     * 
     * @param {*} cpf 
     * @param {*} data 
     * @param {*} horaInicial 
     * Cancelar uma consulta agendada, acessando a classe Consulta e removendo do array de consultas
     */
    cancelarConsulta(cpf, data, horaInicial) {
        let i = this.#consultas.findIndex(c => c.cpf == cpf && c.dataConsulta.toFormat('dd/MM/yyyy') == data && c.horaInicial == horaInicial);
        if (i != -1) {
            this.#consultas.splice(i, 1);
        }
        else {
            throw new Error("Consulta não encontrada");
        }
    }

    /**
     * Lista as consultas agendadas para um determinado dia, em ordem crescente de horário
     */
    listarConsultas(dataInicio, dataFim) {
        let consultas = this.#consultas;
        if (dataInicio && dataFim) {
            dataInicio = DateTime.fromFormat(dataInicio, 'dd/MM/yyyy');
            dataFim = DateTime.fromFormat(dataFim, 'dd/MM/yyyy');
            if (!dataInicio.isValid || !dataFim.isValid) {
                throw new Error('Data inválida');
            }
            consultas = consultas.filter(c => c.dataConsulta >= dataInicio && c.dataConsulta <= dataFim);
        }
        const maxTamanhoNome = Math.max(...this.#pacientes.map(p => p.nome.length), 4);
        const linhaCabecalho = `${'CPF'.padEnd(11)} | ${'Nome'.padEnd(maxTamanhoNome)} | ${'Data'.padEnd(10)} | ${'Hora Inicial'.padEnd(12)} | ${'Hora Final'.padEnd(10)} | ${'Duração'.padEnd(7)}`;
        const linhaDivisoria = '-'.repeat(linhaCabecalho.length);

        console.log(linhaDivisoria);
        console.log(linhaCabecalho);
        console.log(linhaDivisoria);

        consultas.sort((a, b) => a.dataConsulta.toFormat('dd/MM/yyyy').localeCompare(b.dataConsulta.toFormat('dd/MM/yyyy')));
        consultas.forEach(c => {
            
            // Formatação da hora, que vem em valor inteiro
            const formatarHora = (hora) => {
                const horaStr = hora.toString().padStart(4, '0');
                return `${horaStr.slice(0, 2)}:${horaStr.slice(2)}`; 
            };

            let horaInicial = formatarHora(c.horaInicial);
            let horaFinal = formatarHora(c.horaFinal);

            horaInicial = DateTime.fromFormat(horaInicial, 'HH:mm');
            horaFinal = DateTime.fromFormat(horaFinal, 'HH:mm');


            let duracao = horaFinal.diff(horaInicial, 'minutes').minutes;

            // Passa os minutos pro formato HH:mm
            const formatarDuracao = (minutos) => {
                const horas = Math.floor(minutos / 60);
                const minutosRestantes = minutos % 60;
                return `${horas.toString().padStart(2, '0')}:${minutosRestantes.toString().padStart(2, '0')}`;
            };

            duracao = formatarDuracao(duracao);

            const p = this.#pacientes.find(p => p.cpf === c.cpf);
            
            console.log(
                `${c.cpf.padEnd(11)} | ${p.nome.padEnd(maxTamanhoNome)} | ${c.dataConsulta.toFormat('dd/MM/yyyy').padEnd(10)} | ${horaInicial.toFormat('HH:mm').toString().padEnd(12)} | ${horaFinal.toFormat('HH:mm').toString().padEnd(10)} | ${duracao.toString().padEnd(7)}`);
        });
    }

}