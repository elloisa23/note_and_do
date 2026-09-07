const state = {
  page: "home",
  notes: JSON.parse(localStorage.getItem("noteDoNotes") || "[]"),
  selectedDate: new Date(),
  month: new Date()
};

const screen = document.getElementById("screen");
const backBtn = document.getElementById("backBtn");
const menuBtn = document.getElementById("menuBtn");
const toast = document.getElementById("toast");

function save(){ localStorage.setItem("noteDoNotes", JSON.stringify(state.notes)); }

function showToast(msg){
  toast.textContent=msg; toast.classList.add("show");
  setTimeout(()=>toast.classList.remove("show"),1800);
}

function formatDate(d){
  return new Intl.DateTimeFormat("pt-BR",{day:"2-digit",month:"2-digit",year:"numeric"}).format(d);
}

function render(){
  document.querySelectorAll(".nav-item").forEach(b=>b.classList.toggle("active",b.dataset.go===state.page));
  const pages = {home:homePage, notes:notesPage, add:addPage, calendar:calendarPage, profile:profilePage};
  screen.innerHTML = (pages[state.page]||homePage)();
  bindPage();
}

function homePage(){
  const recent = state.notes.slice(-3).reverse();
  return `
    <section class="hero">
      <h1>NOTE &amp; DO</h1>
      <p>Organize suas ideias, tarefas e compromissos.</p>
    </section>
    <h2>Olá! 👋</h2>
    <p class="subtitle">O que você precisa organizar hoje?</p>
    <div class="section-title"><h3>Resumo</h3></div>
    <div class="card">
      <strong style="color:var(--pink);font-size:24px">${state.notes.length}</strong>
      <span style="font-size:12px;color:var(--muted)"> notas salvas</span>
    </div>
    <div class="section-title"><h3>Notas recentes</h3><button class="link" data-action="notes">Ver todas</button></div>
    <div class="note-list">
      ${recent.length ? recent.map(noteCard).join("") : `<div class="card empty">Você ainda não criou nenhuma nota.<br>Toque no <b>+</b> para começar.</div>`}
    </div>`;
}

function noteCard(n){
  return `<article class="note" data-id="${n.id}">
    <div><h3>${escapeHtml(n.title)}</h3><p>${escapeHtml(n.text).slice(0,90)}${n.text.length>90?"…":""}</p></div>
    <span class="note-date">${n.date||""}</span>
  </article>`;
}

function notesPage(){
  return `<h1>Minhas notas</h1><p class="subtitle">Tudo o que você precisa lembrar.</p>
    <div class="note-list">
      ${state.notes.length ? state.notes.slice().reverse().map(noteCard).join("") : `<div class="card empty">Nenhuma nota cadastrada.</div>`}
    </div>
    <button class="primary" style="margin-top:16px" data-action="add">+ Nova nota</button>`;
}

function addPage(){
  return `<h1>Nova nota</h1><p class="subtitle">Adicione uma nova tarefa ou lembrete.</p>
    <form id="noteForm" class="card">
      <div class="field"><label>Título</label><input id="title" required placeholder="Ex.: Estudar para a prova"></div>
      <div class="field"><label>Descrição</label><textarea id="text" placeholder="Escreva os detalhes da sua nota..."></textarea></div>
      <div class="field"><label>Data</label><input id="date" type="date" value="${new Date().toISOString().slice(0,10)}"></div>
      <button class="primary">Salvar nota</button>
      <button type="button" class="secondary" data-action="home">Cancelar</button>
    </form>`;
}

function calendarPage(){
  const y=state.month.getFullYear(), m=state.month.getMonth();
  const first=new Date(y,m,1).getDay();
  const total=new Date(y,m+1,0).getDate();
  const monthName=new Intl.DateTimeFormat("pt-BR",{month:"long",year:"numeric"}).format(state.month);
  let days="";
  for(let i=0;i<first;i++) days+=`<span></span>`;
  for(let d=1;d<=total;d++){
    const today=new Date(); const isToday=d===today.getDate()&&m===today.getMonth()&&y===today.getFullYear();
    days+=`<button class="day ${isToday?"today":""}" data-day="${d}">${d}</button>`;
  }
  return `<h1>Calendário</h1><p class="subtitle">Organize seus compromissos por data.</p>
    <div class="calendar">
      <div class="cal-head"><button data-action="prevMonth">‹</button><div class="cal-title">${monthName}</div><button data-action="nextMonth">›</button></div>
      <div class="week">${["Dom","Seg","Ter","Qua","Qui","Sex","Sáb"].map(x=>`<span>${x}</span>`).join("")}</div>
      <div class="days">${days}</div>
    </div>
    <div class="section-title"><h3>Notas deste mês</h3></div>
    <div class="note-list">${state.notes.filter(n=>{
      if(!n.iso) return false; const d=new Date(n.iso+"T00:00:00"); return d.getMonth()===m&&d.getFullYear()===y;
    }).map(noteCard).join("") || `<div class="card empty">Nenhuma nota para este mês.</div>`}</div>`;
}

function profilePage(){
  return `<section class="profile">
    <div class="avatar">N</div><h1>Note &amp; Do</h1><p class="subtitle">Seu espaço para organizar o dia.</p>
    <div class="card" style="text-align:left">
      <div class="section-title" style="margin-top:0"><h3>Preferências</h3></div>
      <button class="secondary" data-action="clear">Apagar todas as notas</button>
    </div>
  </section>`;
}

function escapeHtml(s=""){return s.replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]));}

function bindPage(){
  const form=document.getElementById("noteForm");
  if(form) form.addEventListener("submit",e=>{
    e.preventDefault();
    const date=document.getElementById("date").value;
    state.notes.push({
      id:Date.now(),
      title:document.getElementById("title").value.trim(),
      text:document.getElementById("text").value.trim(),
      iso:date,
      date: date ? new Intl.DateTimeFormat("pt-BR").format(new Date(date+"T00:00:00")) : ""
    });
    save(); showToast("Nota salva!"); state.page="notes"; render();
  });

  screen.querySelectorAll("[data-action]").forEach(el=>el.addEventListener("click",()=>{
    const a=el.dataset.action;
    if(a==="add"||a==="notes"||a==="home") state.page=a;
    if(a==="prevMonth") state.month=new Date(state.month.getFullYear(),state.month.getMonth()-1,1);
    if(a==="nextMonth") state.month=new Date(state.month.getFullYear(),state.month.getMonth()+1,1);
    if(a==="clear"){
      if(confirm("Apagar todas as notas?")){state.notes=[];save();showToast("Notas apagadas");}
    }
    render();
  }));
}

document.querySelectorAll("[data-go]").forEach(b=>b.addEventListener("click",()=>{state.page=b.dataset.go;render();}));
backBtn.addEventListener("click",()=>{state.page="home";render()});
menuBtn.addEventListener("click",()=>document.getElementById("menu")?.classList.toggle("show"));
render();
