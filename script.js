const botaoNTarefa = document.getElementById('criar-tarefa');
const novaTarefaTexto = document.getElementById('texto-tarefa');
const listaTarefas = document.getElementById('lista-tarefas');

function mudaCorItemLista() {
  event.target.classList.add('selecionado');
  for (let i = 0; i < listaTarefas.childNodes.length; i += 1) {
    if (listaTarefas.childNodes[i] !== event.target) {
      listaTarefas.childNodes[i].classList.remove('selecionado');
      listaTarefas.childNodes[i].classList.add('nao-selecionado');//remover se não for necessario para os proximos requisitos
    }
  }
}

function riscaItemLista() {
  if (event.target.classList.contains('riscado') === true) {
    event.target.classList.remove('riscado');
  } else {
    event.target.classList.add('riscado');
  }
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
