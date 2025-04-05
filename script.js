let clientes = [];
let construtoras = [];

function cadastrarCliente() {
    const nome = document.getElementById("nomeCliente").value;
    const endereco = document.getElementById("enderecoCliente").value;
  
    if (!nome || !endereco) {
      alert("Preencha todos os campos do cliente.");
      return;
    }
  
    const option = document.createElement("option");
    option.text = nome;
    option.value = nome;
    document.getElementById("selectCliente").add(option);
  
    resetCamposCliente();
    alert("Cliente cadastrado com sucesso!");
  }
  
  function cadastrarConstrutora() {
    const nome = document.getElementById("nomeConstrutora").value;
    const cnpj = document.getElementById("cnpjConstrutora").value;
    const maoDeObra = document.getElementById("maoDeObra").value;
    const prazo = document.getElementById("prazo").value;
  
    if (!nome || !cnpj || !maoDeObra || !prazo) {
      alert("Preencha todos os campos da construtora.");
      return;
    }
  
    const option = document.createElement("option");
    option.text = nome;
    option.value = JSON.stringify({ nome, cnpj, maoDeObra, prazo });
    document.getElementById("selectConstrutora").add(option);
  
    resetCamposConstrutora();
    alert("Construtora cadastrada com sucesso!");
  }
  
  // 🧼 Funções para limpar os campos
  function resetCamposCliente() {
    document.getElementById("nomeCliente").value = "";
    document.getElementById("enderecoCliente").value = "";
  }
  
  function resetCamposConstrutora() {
    document.getElementById("nomeConstrutora").value = "";
    document.getElementById("cnpjConstrutora").value = "";
    document.getElementById("maoDeObra").value = "";
    document.getElementById("prazo").value = "";
  }
  

function atualizarClientes() {
  const select = document.getElementById("selectCliente");
  select.innerHTML = "";
  clientes.forEach((c, i) => {
    const option = document.createElement("option");
    option.value = i;
    option.text = `${c.nome} - ${c.endereco}`;
    select.appendChild(option);
  });
}


function atualizarConstrutoras() {
  const select = document.getElementById("selectConstrutora");
  select.innerHTML = "";
  construtoras.forEach((c, i) => {
    const option = document.createElement("option");
    option.value = i;
    option.text = `${c.nome} - ${c.cnpj}`;
    select.appendChild(option);
  });
}

function gerarCusto() {
  const local = document.getElementById("localProjeto").value;
  const tipo = document.getElementById("tipoProjeto").value;
  const construtora = construtoras[document.getElementById("selectConstrutora").value];
  let base = 0;
  if (local === "Casa") base = 1000;
  else if (local === "Apartamento") base = 800;
  else if (local === "Sitio") base = 1200;

  let fator = tipo === "Construção" ? 4 : tipo === "Reforma" ? 3 : 5;
  const custo = base * fator * construtora.custo;
  alert(`Custo estimado: R$ ${custo.toFixed(2)}`);
}

function gerarPrazo() {
  const prazo = construtoras[document.getElementById("selectConstrutora").value].prazo;
  const inicio = new Date(document.getElementById("dataInicio").value);
  const fim = new Date(inicio);
  fim.setDate(fim.getDate() + prazo);
  alert(`Data prevista de término: ${fim.toLocaleDateString()}`);
}

function gerarRelatorio() {
  const cliente = clientes[document.getElementById("selectCliente").value];
  const construtora = construtoras[document.getElementById("selectConstrutora").value];
  const tipo = document.getElementById("tipoProjeto").value;
  const local = document.getElementById("localProjeto").value;
  const dataInicio = document.getElementById("dataInicio").value;
  const relatorio = `
    <h3>Relatório do Projeto</h3>
    <p><strong>Cliente:</strong> ${cliente.nome}</p>
    <p><strong>Construtora:</strong> ${construtora.nome}</p>
    <p><strong>Tipo:</strong> ${tipo}</p>
    <p><strong>Local:</strong> ${local}</p>
    <p><strong>Data de Início:</strong> ${new Date(dataInicio).toLocaleDateString()}</p>
  `;
  document.getElementById("relatorio").innerHTML = relatorio;
}
