function cadastrarCliente() {
    const nome = document.getElementById("nomeCliente").value.trim();
    const endereco = document.getElementById("enderecoCliente").value.trim();
  
    if (!nome || !endereco) {
      alert("Preencha todos os campos do cliente antes de cadastrar.");
      return;
    }
  
    const selectCliente = document.getElementById("selectCliente");
    const option = document.createElement("option");
    option.text = nome;
    option.value = nome;
    option.selected = true;
    selectCliente.add(option);
  
    document.getElementById("nomeCliente").value = "";
    document.getElementById("enderecoCliente").value = "";
  
    alert("Cliente cadastrado com sucesso!");
  }
  
  function cadastrarConstrutora() {
    const nome = document.getElementById("nomeConstrutora").value.trim();
    const cnpj = document.getElementById("cnpjConstrutora").value.trim();
    const maoDeObra = parseFloat(document.getElementById("maoDeObra").value.trim());
    const prazo = parseInt(document.getElementById("prazo").value.trim());
  
    // Verifica se todos os campos estão preenchidos
    if (!nome || !cnpj || isNaN(maoDeObra) || isNaN(prazo)) {
      alert("Preencha todos os campos da construtora corretamente antes de cadastrar.");
      return;
    }
  
    // Verifica se mão de obra e prazo são positivos
    if (maoDeObra <= 0 || prazo <= 0) {
      alert("O custo da mão de obra e o prazo devem ser maiores que zero.");
      return;
    }
  
    const selectConstrutora = document.getElementById("selectConstrutora");
    const option = document.createElement("option");
    option.text = nome;
    option.value = JSON.stringify({ nome, cnpj, maoDeObra, prazo });
    option.selected = true;
    selectConstrutora.add(option);
  
    // Limpa os campos
    document.getElementById("nomeConstrutora").value = "";
    document.getElementById("cnpjConstrutora").value = "";
    document.getElementById("maoDeObra").value = "";
    document.getElementById("prazo").value = "";
  
    alert("Construtora cadastrada com sucesso!");
  }
    
  function validarCamposProjeto() {
    const cliente = document.getElementById("selectCliente").value;
    const construtora = document.getElementById("selectConstrutora").value;
    const tipo = document.getElementById("tipoProjeto").value;
    const local = document.getElementById("localProjeto").value;
    const dataInicio = document.getElementById("dataInicio").value;
  
    if (!cliente || !construtora || !tipo || !local || !dataInicio) {
      alert("Preencha todos os campos do projeto antes de continuar.");
      return false;
    }
  
    return true;
  }
  
  function gerarCusto() {
    if (!validarCamposProjeto()) return;
  
    const local = document.getElementById("localProjeto").value;
    const tipo = document.getElementById("tipoProjeto").value;
    const construtoraData = JSON.parse(document.getElementById("selectConstrutora").value);
    const maoDeObra = parseFloat(construtoraData.maoDeObra);
  
    let base = 0;
    if (local === "Casa") base = 1000;
    else if (local === "Apartamento") base = 800;
    else if (local === "Sitio") base = 1200;
  
    if (tipo === "Reforma") base *= 3;
    else if (tipo === "Construção") base *= 4;
    else if (tipo === "Extensão") base *= 5;
  
    const custo = base * maoDeObra;
    alert(`Custo estimado do projeto: R$ ${custo.toFixed(2)}`);
  }
  
  function gerarPrazo() {
    if (!validarCamposProjeto()) return;
  
    const prazo = JSON.parse(document.getElementById("selectConstrutora").value).prazo;
    const dataInicio = new Date(document.getElementById("dataInicio").value);
    dataInicio.setDate(dataInicio.getDate() + parseInt(prazo));
  
    alert("Data estimada de término: " + dataInicio.toLocaleDateString("pt-BR"));
  }
  
  function gerarRelatorio() {
    if (!validarCamposProjeto()) return;
  
    const cliente = document.getElementById("selectCliente").value;
    const construtora = JSON.parse(document.getElementById("selectConstrutora").value);
    const tipo = document.getElementById("tipoProjeto").value;
    const local = document.getElementById("localProjeto").value;
    const dataInicioInput = document.getElementById("dataInicio").value;
    const dataInicio = new Date(dataInicioInput);
  
    // Cálculo do custo
    let base = 0;
    if (local === "Casa") base = 1000;
    else if (local === "Apartamento") base = 800;
    else if (local === "Sitio") base = 1200;
  
    if (tipo === "Reforma") base *= 3;
    else if (tipo === "Construção") base *= 4;
    else if (tipo === "Extensão") base *= 5;
  
    const custo = base * parseFloat(construtora.maoDeObra);
  
    // Cálculo da data de término
    const prazo = parseInt(construtora.prazo);
    const dataTermino = new Date(dataInicio);
    dataTermino.setDate(dataInicio.getDate() + prazo);
  
    // Montagem do relatório
    const relatorio = `
      <h3>Relatório do Projeto</h3>
      <p><strong>Cliente:</strong> ${cliente}</p>
      <p><strong>Construtora:</strong> ${construtora.nome}</p>
      <p><strong>CNPJ:</strong> ${construtora.cnpj}</p>
      <p><strong>Tipo de Projeto:</strong> ${tipo}</p>
      <p><strong>Local do Projeto:</strong> ${local}</p>
      <p><strong>Data de Início:</strong> ${dataInicio.toLocaleDateString("pt-BR")}</p>
      <p><strong>Data Estimada de Término:</strong> ${dataTermino.toLocaleDateString("pt-BR")}</p>
      <p><strong>Custo Estimado:</strong> R$ ${custo.toFixed(2)}</p>
    `;
  
    document.getElementById("relatorio").innerHTML = relatorio;
  }
  
  