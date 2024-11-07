//Menu Principal

import promptSync from 'prompt-sync';
const readline = promptSync();

import { Paciente } from "./Classes/paciente.js"
import { Clinica } from "./Classes/Clinica.js"

function menuPrincipal(){
    console.log('\n\n* Menu Principal* \n-------------------------------------------------------------------------------');
    console.log('1 - Cadastro de Paciente\n2 - Agenda\n3 - Fim');
    console.log('-------------------------------------------------------------------------------');
    let i = Number(readline('Escolha uma opção: '));
    if(i==1){
        menuPaciente(i);
    }
    else if(i==2){
        menuAgenda(i);
    }
    else if(i==3){
        console.log('Fim');
    }
    else{
        console.log('Opção inválida');
    }
}

function menuPaciente(i){
    console.log('\n\n* Menu do Cadastro de Pacientes *\n-------------------------------------------------------------------------------');
    console.log("1 - Cadastrar novo paciente\n2 - Excluir paciente\n3 - Listar pacientes por nome\n4 - Listar pacientes por CPF");
    console.log("5 - Voltar p/ menu principal");
    console.log('-------------------------------------------------------------------------------');

    let j = Number(readline('Escolha uma opção: '));

}

menuPrincipal();


