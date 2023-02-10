//funcao para escolher apenas uma das checkbox no HTML
function escolherFeminino(){
    if(document.getElementById("sexoMasculino").checked == true){
        document.getElementById("sexoMasculino").checked = false
    }
}
function escolherMasculino(){
    if(document.getElementById("sexoFeminino").checked == true){
        document.getElementById("sexoFeminino").checked = false
    }
}

//funcoes para alerts fofo
function alertaCadastro(){
    swal({
        position: 'center',
        icon: 'success',
        title: 'Cadastro realizado com sucesso',
        timer: 1500,
        buttons: false,
      })
}
function alertaApagado(){
    swal({
        position: 'center',
        icon: 'success',
        title: 'Cadastro apagado com sucesso',
        timer: 1500,
        buttons: false,
      })
}
function alertaErro(){
    swal({
        icon: 'error',
        title: 'Oops...',
        text: 'digite um CPF valido',
        footer: '<a href="">Why do I have this issue?</a>'
    })
}
function alertaVazio(){
    swal ({
      title: 'Ops,',
      text: "Ainda não há CPF cadastrados ",
      icon: 'warning',
      button: true,
      buttonColor: '#3085d6',
      cancelButtonColor: '#d33',
      buttonText: 'Yes, delete it!'
    })
}

//funcao para limpar o fomulario
function limparImputs(){
    document.getElementById("nome").value = "";
    document.getElementById("sobrenome").value = "";
    document.getElementById("cargo").value = "";
    document.getElementById("dataNascimento").value = "";
    document.getElementById("cpf").value = "";
    document.getElementById("sexoFeminino").checked = false;
    document.getElementById("sexoMasculino").checked = false;
    document.getElementById("telefone").value = "";
    document.getElementById("email").value = "";
    document.getElementById("senha").value = "";
}

//funcao para cadastrar e guardar jsons
var cadastrados = [];

function enviar(){
    if(document.getElementById("sexoFeminino").checked == true){
        var sexo = document.getElementById("sexoFeminino").value
    }else{
        var sexo = document.getElementById("sexoMasculino").value
    }

    var pessoa = new Object;
    pessoa.nome= document.getElementById("nome").value;
    pessoa.sobrenome= document.getElementById("sobrenome").value;
    pessoa.cargo= document.getElementById("cargo").value;
    pessoa.dataNascimento= document.getElementById("dataNascimento").value;
    pessoa.cpf= document.getElementById("cpf").value;
    pessoa.sexo= sexo;
    pessoa.telefone= document.getElementById("telefone").value;
    pessoa.email= document.getElementById("email").value;
    pessoa.senha= document.getElementById("senha").value;

    var jsonForm = JSON.stringify(pessoa.valueOf());

    const informacaoPessoa = JSON.parse(jsonForm);

    cadastrados.push(informacaoPessoa);
    console.log(informacaoPessoa)

    alertaCadastro()
    limparImputs()
}

//funcao para apagar o cadastro pesquisado
function apagarCadastro(i){
    mostrar.innerHTML = "";
    cadastrados.splice(i,1)
    document.getElementById("cpfBuscar").value = "";
    alertaApagado()
}

//funcao para buscar jsons de pessoas ja cadastradas e fazer com que as informacoes e a opcao de impressao aparecao para o usuario
function buscar(){
    var cpfBuscar= document.getElementById("cpfBuscar").value;
    console.log(cpfBuscar)
    
    for(i=0; i<cadastrados.length; i++){
        if(cadastrados[i].cpf == cpfBuscar){
            console.log('CPF encontrado')
            mostrar.innerHTML = "<div id='dados'><p>Nome: "+cadastrados[i].nome+"</p><p>Sobrenome: "+cadastrados[i].sobrenome+"</p><p>Cargo: "+cadastrados[i].cargo+"</p><p>Data de nascimento: "+cadastrados[i].dataNascimento+"</p><p>CPF: "+cadastrados[i].cpf+"</p><p>Sexo: "+cadastrados[i].sexo+"</p><p>Telefone: "+cadastrados[i].telefone+"</p><p>E-mail: "+cadastrados[i].email+"</p></div><form><button type='button' value='Imprimir Dados' onClick='window.print()' id='btnImprimir'>Imprimir Dados</button> <button value='Apagar Dados' onClick='apagarCadastro("+i+")' id='btnApagar'>Apagar Dados</button></form>"
            break;
        }else{
            if(i==cadastrados.length-1){
                console.log('CPF não cadastrado')
                mostrar.innerHTML = "";
                alertaErro()
            }
        }
    }
    if(cadastrados.length == 0){
        console.log('CPF não cadastrado')
        mostrar.innerHTML = "";   
        alertaVazio()
    }
}
