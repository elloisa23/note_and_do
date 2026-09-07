# Note & Do — Organizador de Tarefas

Protótipo funcional do Note & Do, um app de organização de tarefas com foco
em estudantes. Construído em HTML, CSS e JavaScript puros (sem frameworks
nem build step), pronto para publicar direto no GitHub Pages.

## Telas incluídas

- **Splash** (`index.html`) — logo animado com borboletas e call-to-action
- **Início** (`home.html`) — o coração do app:
  - saudação personalizada e busca de tarefas
  - lista "O que tem para hoje?" com tarefas do dia
  - marcar/desmarcar tarefa como concluída (toque no círculo)
  - remover tarefa (ícone de lixeira)
  - filtro por status: Todas / Concluídas / Pendentes / Atrasadas
  - modal "Adicione sua tarefa" com validação de campos, calendário
    para escolher a data, confirmação ao cancelar e aviso de sucesso
- **Meu Perfil** (`perfil.html`) — dados do usuário e estatísticas de tarefas
- **Notificações** (`notificacoes.html`) — avisos recentes

## Como rodar localmente

```bash
python3 -m http.server 8000
# depois abra http://localhost:8000
```

Ou simplesmente abra `index.html` direto no navegador.

Os dados exibidos são simulados em `js/data.js` e guardados no
`localStorage` do navegador — as tarefas que você adicionar, concluir ou
apagar continuam salvas mesmo se fechar e reabrir o app.

## Como publicar no GitHub Pages

1. Crie um repositório no GitHub e suba esta pasta:
   ```bash
   git init
   git add .
   git commit -m "Note & Do — protótipo funcional"
   git branch -M main
   git remote add origin https://github.com/SEU-USUARIO/note-and-do.git
   git push -u origin main
   ```
2. No repositório, vá em **Settings → Pages**.
3. Em "Build and deployment", selecione **Deploy from a branch**, escolha a
   branch `main` e a pasta `/ (root)`.
4. Aguarde alguns segundos — o link (algo como
   `https://SEU-USUARIO.github.io/note-and-do/`) aparece no topo da página.

## Estrutura do projeto

```
notedo/
├── index.html              Splash
├── home.html                 Lista de tarefas (tela principal)
├── perfil.html                Meu Perfil
├── notificacoes.html           Notificações
├── assets/                     Imagens (borboletas)
├── css/styles.css              Design system (tokens, componentes)
└── js/
    ├── data.js                 Dados simulados + estado (localStorage)
    └── app.js                  Ícones SVG e helpers de UI compartilhados
```

## Próximos passos sugeridos

- Trocar `js/data.js` por chamadas reais a uma API/backend.
- Adicionar autenticação real de usuário.
- Notificações push para tarefas próximas do prazo.
