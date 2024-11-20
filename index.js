
import promptSync from 'prompt-sync';
const readline = promptSync();

import { Clinica } from "./Classes/Clinica.js"

// Instanciando a clinica
const clinica = new Clinica('Clinica Odontológica', 'Rua 1, 123', '1234-5678');

/**
 * Menu principal
 */

function menuPrincipal() {
    try {
        console.log('\n\n* Menu Principal* \n-------------------------------------------------------------------------------');
        console.log('1 - Cadastro de Paciente\n2 - Agenda\n3 - Fim');
        console.log('-------------------------------------------------------------------------------');
        let i = Number(readline('Escolha uma opção: '));
        if (i == 1) {
            menuPaciente();
        }
        else if (i == 2) {
            menuAgenda();
        }
        else if (i == 3) {
            console.log('Fim');
        }
        else {
            throw new Error('Opção inválida');
        }
    }
    catch (e) {
        console.log('Erro: ' + e.message);
        if(e.message == 'Opção inválida'){
            menuPrincipal();
        }
    }
}

/**
 * Menu do cadastro de pacientes
 */
function menuPaciente(){
    console.log('\n\n* Menu do Cadastro de Pacientes *\n-------------------------------------------------------------------------------');
    console.log("1 - Cadastrar novo paciente\n2 - Excluir paciente\n3 - Listar pacientes por nome\n4 - Listar pacientes por CPF");
    console.log("5 - Voltar p/ menu principal");
    console.log('-------------------------------------------------------------------------------');

    let j = Number(readline('Escolha uma opção: '));
    if (j == 1) {
        let cadastroRealizado = false;
        while (!cadastroRealizado) {
            try {
                let cpf = readline('Digite o CPF: ');
                let nome = readline('Digite o nome: ');
                let dataNasc = readline('Digite a data de nascimento: ');
                clinica.addPaciente(cpf, nome, dataNasc);
                console.log('Paciente cadastrado com sucesso!');
                cadastroRealizado = true;
            }
            catch (e) {
                console.log(e.message);
                console.log("Por favor, insira os dados novamente.\n");
            }
    }
        menuPaciente();
    }
    else if(j==2){
        try {
            let cpf = readline('Digite o CPF do paciente a ser excluído: ');
            clinica.removePaciente(cpf);
        }
        catch(e){
            console.log("Erro: " + e.message);
        }
        menuPaciente();
    }
    else if(j==3){
        clinica.listarPacientesNome();
        menuPaciente();
    }
    else if(j==4){
        clinica.listarPacientesCpf();
        menuPaciente();
    }
    else if(j==5){
        menuPrincipal();
    }
    else{
        throw new Error('Opção inválida');
    }

}
/**
 * Menu da agenda
 */
function menuAgenda(){
    console.log('\n\n* Menu da Agenda *\n-------------------------------------------------------------------------------');
    console.log("1 - Agendar consulta\n2 - Cancelar consulta\n3 - Listar agenda\n4 - Voltar p/ menu principal");
    console.log('-------------------------------------------------------------------------------');

    let j = Number(readline('Escolha uma opção: '));
    if(j==1){
        let consultaAgendada = false;
        while (!consultaAgendada) {
            try {
                let cpf = readline('Digite o CPF do paciente: ');
                let data = readline('Digite a data da consulta: ');
                let horaInicial = Number(readline('Digite a hora inicial: '));
                let horaFinal = Number(readline('Digite a hora final: '));
                clinica.agendarConsulta(cpf, data, horaInicial, horaFinal);     
                console.log("Consulta agendada com sucesso!");
                consultaAgendada = true;
            } catch (e) {
                console.log("Erro: " + e.message);
                console.log("Por favor, insira os dados novamente.\n");
            }
        }
        menuAgenda();
    }
    else if(j==2){
        let consultaCancelada = false;
        while (!consultaCancelada) {
            try {
                let cpf = readline('Digite o CPF do paciente da consulta: ');
                let data = readline('Digite a data da consulta: ');
                let horaInicial = Number(readline('Digite a hora inicial da consulta: '));
                clinica.cancelarConsulta(cpf, data, horaInicial);
                console.log("Consulta cancelada com sucesso!");
                consultaCancelada = true;
            }
            catch (e) {
                console.log("Erro: " + e.message);
                console.log("Por favor, insira os dados novamente.\n");
            }
        }
        menuAgenda();
    }
    else if(j==3){
        console.log('Apresentar a agenda toda (T) ou apenas um período de datas (P)?');
        let op = readline('Escolha uma opção: ');
        op = op.toUpperCase();
        if(op=='T'){
            clinica.listarConsultas();
        }
        else if(op=='P'){
            let dataInicio = readline('Digite a data de início: ');
            let dataFim = readline('Digite a data de fim: ');
            clinica.listarConsultas(dataInicio, dataFim);
        }
        menuAgenda();
    }
    else if(j==4){
        menuPrincipal();
    }
    else{
        throw new Error('Opção inválida');
    }

}

// Inicia a aplicação
try{
    menuPrincipal();
}
catch(e){
    console.log('Erro: ' + e.message);
}

