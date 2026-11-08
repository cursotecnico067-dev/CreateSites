# CreateSites — Site institucional

**Sua ideia. Nosso desenvolvimento.**

Site profissional da CreateSites, feito apenas com **HTML5, CSS3 e JavaScript puro**.
Sem Node.js, npm, frameworks ou banco de dados: basta abrir o `index.html`.

## Estrutura

```
createsites/
├── index.html            # página principal
├── .nojekyll             # evita processamento do Jekyll no GitHub Pages
├── css/style.css         # estilos (cores da marca em :root)
├── js/
│   ├── config.js         # ✏️ WhatsApp, Instagram e PORTFÓLIO (edite aqui)
│   └── main.js           # menu, animações, portfólio, formulário
└── assets/img/           # logo, favicon e imagens dos projetos
```

## Como configurar o WhatsApp

Abra `js/config.js` e preencha `whatsappNumber` com código do país + DDD + número, só números:

```js
whatsappNumber: "5531999999999",
```

Enquanto estiver vazio, os botões de WhatsApp levam ao Instagram da CreateSites.

## Como adicionar um projeto ao portfólio

1. Coloque a imagem em `assets/img/` (`.jpg`, `.png`, `.webp` ou `.svg`).
2. Em `js/config.js`, copie um bloco dentro de `projects` e edite:

```js
{
  title: "Nome do projeto",
  category: "Loja virtual",
  description: "Descrição curta do trabalho.",
  image: "assets/img/meu-projeto.jpg",
  tags: ["Loja virtual", "Responsivo"],
  demo: false,            // true = mostra o selo "Demonstração"
  url: "https://site-do-cliente.com.br"   // opcional
}
```

Os projetos atuais são **demonstrações** (`demo: true`) e não representam clientes reais.
Ao publicar trabalhos reais, use `demo: false` e, se possível, o link do site.

## Trocar a logo

Substitua `assets/img/logo.svg` e `assets/img/favicon.svg` pela logo oficial
(mantenha os mesmos nomes de arquivo, ou ajuste os caminhos no `index.html`).

## Publicar no GitHub Pages (grátis)

1. Crie um repositório no GitHub (ex.: `createsites`).
2. Envie **o conteúdo desta pasta** (com `index.html` na raiz do repositório).
3. Vá em **Settings → Pages**.
4. Em **Build and deployment**, escolha **Deploy from a branch**, branch `main`, pasta `/ (root)`.
5. Salve. Em alguns minutos o site estará em `https://SEU-USUARIO.github.io/createsites/`.

Todos os caminhos são relativos, então funcionam tanto no GitHub Pages quanto abrindo o arquivo direto no computador.

## Cores da marca

| Cor | Hex |
|---|---|
| Preto | `#050914` |
| Azul elétrico | `#087DF5` |
| Azul claro | `#19A5FF` |
| Branco | `#FFFFFF` |

As fontes (Space Grotesk, Inter e JetBrains Mono) vêm do Google Fonts; sem internet, o site usa fontes do sistema.
