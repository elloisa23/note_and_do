/* ===========================================================
   Note & Do — dados de demonstração
=========================================================== */

function todayISO(){
  return new Date().toISOString().slice(0,10);
}

function addDays(iso, days){
  const d = new Date(iso + "T00:00:00");
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0,10);
}

const NOTEDO_SEED = {
  user: {
    name: "D'avylla",
    fullName: "D'avylla Rocha",
    course: "Ciência da Computação"
  },
  tasks: [
    { id: "t1", title: "Cortar o Cabelo", date: todayISO(), status: "concluida" },
    { id: "t2", title: "Comprar presente para o Victor", date: todayISO(), status: "concluida" },
    { id: "t3", title: "Pagar cartão de crédito", date: todayISO(), status: "pendente" },
    { id: "t4", title: "Entregar atividade de IA", date: todayISO(), status: "pendente" },
    { id: "t5", title: "Fazer Atividade de Programação Móvel", date: addDays(todayISO(), -2), status: "pendente" }
  ],
  notifications: [
    { time: "Hoje às 09:12", text: "Você tem 2 tarefas pendentes para hoje. Bora conquistar!" },
    { time: "Ontem às 18:40", text: "Tarefa \"Cortar o Cabelo\" concluída. Mandou bem!" },
    { time: "Ontem às 08:05", text: "Nova tarefa adicionada: Pagar cartão de crédito." }
  ]
};

function loadNoteState(){
  let raw = localStorage.getItem("notedo_state");
  if(!raw){
    localStorage.setItem("notedo_state", JSON.stringify(NOTEDO_SEED));
    raw = localStorage.getItem("notedo_state");
  }
  return JSON.parse(raw);
}

function saveNoteState(state){
  localStorage.setItem("notedo_state", JSON.stringify(state));
}

function formatDateBR(iso){
  const [y,m,d] = iso.split("-");
  return `${d}/${m}`;
}

function formatDateFull(iso){
  const [y,m,d] = iso.split("-");
  return `${d}/${m}/${y}`;
}

function taskStatus(task){
  if(task.status === "concluida") return "concluida";
  if(task.date < todayISO()) return "atrasada";
  return "pendente";
}
