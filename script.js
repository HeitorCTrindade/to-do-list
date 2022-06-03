const botaoNTarefa = document.getElementById('criar-tarefa');
const novaTarefaTexto = document.getElementById('texto-tarefa');
const listaTarefas = document.getElementById('lista-tarefas');

botaoNTarefa.addEventListener('click', function() {
  console.log('cheguei');
  const novaTarefa = document.createElement('li');
  novaTarefa.innerText = novaTarefaTexto.value;
  novaTarefaTexto.value = '';
  listaTarefas.appendChild(novaTarefa);
});
