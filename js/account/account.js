
function login() {
    div_buttons.style.display = 'none';
    div_login1.style.display = 'block';
}

function logar() {
    var nome = login_input_login.value;
    var senha = senha_input_login.value;

    if(nome == 'reis278' && senha == '1234'){

        window.location.href = '../index.html#i';
        user_logado.innerHTML = nome;
    }
    else{
        alert('Login ou senha incorretos!');
    }
}

function cadastro() {
    div_buttons.style.display = 'none';
    div_idcadastro.style.display = 'block';
}

function cadastrar(){
    div_buttons.style.display = 'none';
    div_login1.style.display = 'block';
    div_idcadastro.style.display = 'none';
    
}

function backarrow(){
    div_buttons.style.display = 'block';
    div_login1.style.display = 'none';
    div_idcadastro.style.display = 'none';
}