/* =====================================================
   CreateSites — CONFIGURAÇÕES DO SITE
   Edite apenas este arquivo para trocar o WhatsApp,
   o Instagram e adicionar/remover projetos do portfólio.
   ===================================================== */

window.CREATESITES_CONFIG = {
  /* ---------- CONTATO ----------
     WhatsApp: somente números, com código do país (55) + DDD + número.
     Exemplo: "5531999999999"
     Enquanto estiver vazio, os botões de WhatsApp levam para o Instagram. */
  whatsappNumber: "",

  whatsappMessage: "Olá, CreateSites! Gostaria de solicitar um orçamento.",

  instagramUser: "_create__sites",
  instagramUrl: "https://www.instagram.com/_create__sites/",

  /* ---------- PORTFÓLIO ----------
     Para adicionar um projeto, copie um bloco abaixo e preencha.
       title:       nome do projeto
       category:    tipo (Loja virtual, Landing page, Institucional...)
       description: texto curto
       image:       caminho da imagem (ex.: "assets/img/projeto-novo.svg" ou .jpg/.png/.webp)
       tags:        tecnologias / recursos
       demo:        true  -> mostra o selo "Demonstração" (projeto ilustrativo)
                    false -> projeto real
       url:         link do site publicado (opcional). Se vazio, abre uma janela de detalhes.
  */
  projects: [
    {
      title: "Nova Estética — Demonstração",
      category: "Site institucional",
      description: "Modelo de site institucional para clínica de estética: apresentação, serviços, equipe e agendamento por WhatsApp.",
      image: "assets/img/projeto-institucional.svg",
      tags: ["Institucional", "Responsivo", "WhatsApp"],
      demo: true,
      url: ""
    },
    {
      title: "Loja Modelo — Demonstração",
      category: "Loja virtual",
      description: "Modelo de vitrine virtual com catálogo de produtos, carrinho de compras e destaque para ofertas.",
      image: "assets/img/projeto-loja.svg",
      tags: ["Loja virtual", "Catálogo", "Carrinho"],
      demo: true,
      url: ""
    },
    {
      title: "Lançamento Digital — Demonstração",
      category: "Landing page",
      description: "Modelo de landing page de alta conversão, com chamada principal, benefícios, prova social e formulário.",
      image: "assets/img/projeto-landing.svg",
      tags: ["Landing page", "Conversão", "Formulário"],
      demo: true,
      url: ""
    },
    {
      title: "Studio Fit — Demonstração",
      category: "Site institucional",
      description: "Modelo de site para academia ou estúdio: planos, horários, modalidades e contato rápido.",
      image: "assets/img/projeto-fitness.svg",
      tags: ["Planos", "Horários", "Mobile first"],
      demo: true,
      url: ""
    },
    {
      title: "Painel Online — Demonstração",
      category: "Solução personalizada",
      description: "Modelo de painel com indicadores, gráficos e áreas de acesso, para soluções digitais sob medida.",
      image: "assets/img/projeto-painel.svg",
      tags: ["Dashboard", "Personalizado", "JavaScript"],
      demo: true,
      url: ""
    },
    {
      title: "Cardápio Digital — Demonstração",
      category: "Landing page",
      description: "Modelo de cardápio online para restaurantes e lanchonetes, com categorias e pedido via WhatsApp.",
      image: "assets/img/projeto-cardapio.svg",
      tags: ["Cardápio", "Pedido", "WhatsApp"],
      demo: true,
      url: ""
    }
  ]
};
