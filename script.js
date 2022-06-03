const botaoNTarefa = document.getElementById('criar-tarefa');
const botaoApagaTarefas = document.getElementById('apaga-tudo');
const botaoApagaTarefasFinalizadas = document.getElementById('remover-finalizados');
const botaoMoverCima = document.getElementById('mover-cima');
const botaoMoverBaixo = document.getElementById('mover-baixo');
const botaoRemoverSelecionado = document.getElementById('remover-selecionado');
const botaoSalvarTarefas = document.getElementById('salvar-tarefas');

const novaTarefaTexto = document.getElementById('texto-tarefa');
const listaTarefas = document.getElementById('lista-tarefas');

function mudaCorItemLista() {
  event.target.classList.add('selecionado');
  for (let i = 0; i < listaTarefas.childNodes.length; i += 1) {
    if (listaTarefas.childNodes[i] !== event.target) {
      listaTarefas.childNodes[i].classList.remove('selecionado');
      listaTarefas.childNodes[i].classList.add('nao-selecionado'); //remover se não for necessario para os proximos requisitos
    }
  }
}

function riscaItemLista() {
  if (event.target.classList.contains('completed') === true) {
    event.target.classList.remove('completed');
  } else {
    event.target.classList.add('completed');
  }
}

function apagaItens (classe) {
  const tamanhoLista = listaTarefas.children.length;
  const listaTarefasFinalizadas = document.querySelectorAll(classe);
  if (classe === undefined) {
    for (let i = 0; i < tamanhoLista; i += 1) {
      listaTarefas.removeChild(listaTarefas.children[0]);
    }
  } else {
    for (let i = 0; i < listaTarefasFinalizadas.length; i += 1) {
      listaTarefas.removeChild(listaTarefasFinalizadas[i]);
    }
  }
}

function salvaTarefaLocalStorage() {
  const tarefasLocaisTemp = JSON.parse(localStorage.getItem('tarefas'));
  const estaConcluida = [];
  for (let i = 0; i < listaTarefas.children.length; i += 1) {
    tarefasLocaisTemp.push(listaTarefas.children[i].innerText);
    if (listaTarefas.children[i].classList.contains('completed') === true) {
      estaConcluida.push('completed');
    } else {
      estaConcluida.push('unCompleted');
    }
  }
  localStorage.setItem('tarefas', JSON.stringify(tarefasLocaisTemp));
  localStorage.setItem('classe', JSON.stringify(estaConcluida));
}

botaoNTarefa.addEventListener('click', () => {
  const novaTarefa = document.createElement('li');
  novaTarefa.innerText = novaTarefaTexto.value;
  novaTarefaTexto.value = '';
  novaTarefa.classList.add('nao-selecionado'); //remover se não for necessario para os proximos requisitos
  novaTarefa.addEventListener('click', mudaCorItemLista);
  novaTarefa.addEventListener('dblclick', riscaItemLista);
  listaTarefas.appendChild(novaTarefa);
});

botaoApagaTarefas.addEventListener('click', () => {
  apagaItens();
});

botaoApagaTarefasFinalizadas.addEventListener('click', () => {
  apagaItens('.completed');
});

botaoSalvarTarefas.addEventListener('click', () => {
  salvaTarefaLocalStorage();
});

window.onload = function() {
  if (localStorage.getItem('tarefas') === null) {
    localStorage.setItem('tarefas', JSON.stringify([]));
    localStorage.setItem('classe', JSON.stringify([]));
  } else {
    const tarefasLocaisSalvas = JSON.parse(localStorage.getItem('tarefas'));
    const tarefasClasseSalvas = JSON.parse(localStorage.getItem('classe'));
    for (let i = 0; i < tarefasLocaisSalvas.length; i += 1) {
      const novaTarefa = document.createElement('li');
      novaTarefa.innerText = tarefasLocaisSalvas[i];
      novaTarefaTexto.value = '';
      novaTarefa.classList.add('nao-selecionado'); //remover se não for necessario para os proximos requisitos
      novaTarefa.classList.add(tarefasClasseSalvas[i]);
      novaTarefa.addEventListener('click', mudaCorItemLista);
      novaTarefa.addEventListener('dblclick', riscaItemLista);
      listaTarefas.appendChild(novaTarefa);
    }
  }
};
