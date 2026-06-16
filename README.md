# Dashboard FPF — Classificação ao vivo

Lê os dados diretamente da Federação Paulista de Futebol e exibe a classificação por grupo, com busca por time e destaque de classificados.

## Como publicar (5 minutos)

### 1. Criar conta no GitHub
- Acesse https://github.com e crie uma conta gratuita

### 2. Criar repositório
- Clique em **New repository**
- Nome: `fpf-dashboard`
- Deixe **Public** marcado
- Clique em **Create repository**

### 3. Fazer upload dos arquivos
- Na página do repositório, clique em **uploading an existing file**
- Arraste os 3 arquivos/pastas:
  - `api/classificacao.js`
  - `public/index.html`
  - `vercel.json`
- Clique em **Commit changes**

### 4. Criar conta na Vercel
- Acesse https://vercel.com
- Clique em **Sign up** → **Continue with GitHub**
- Autorize a Vercel a acessar o GitHub

### 5. Fazer o deploy
- Clique em **Add New → Project**
- Selecione o repositório `fpf-dashboard`
- Clique em **Deploy**
- Aguarde ~1 minuto

### 6. Pronto!
A Vercel vai gerar uma URL pública, tipo:
```
https://fpf-dashboard.vercel.app
```

Toda vez que alguém acessar, o proxy busca os dados frescos da FPF.

---

## Estrutura dos arquivos

```
fpf-dashboard/
├── api/
│   └── classificacao.js   ← proxy serverless (busca FPF sem CORS)
├── public/
│   └── index.html         ← dashboard completo
└── vercel.json            ← configuração da Vercel
```

## Atualizar parâmetros

Se quiser apontar para outro campeonato, edite a URL do `public/index.html`:

```js
const ENDPOINT = '/api/classificacao?idCampeonato=125&idFase=7972&ano=2026&idCategoria=80';
```

Ou altere os valores padrão em `api/classificacao.js`.
