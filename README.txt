EST! EST!! EST!!! — SITE
========================

COMO ABRIR
- Dê dois cliques em index.html (precisa de internet só para carregar as fontes do Google: Fraunces e Jost).

ESTRUTURA
index.html          página (hero, história, cardápio, reserva, rodapé)
css/style.css       todos os estilos, cores e tamanhos
js/main.js          menu, animações, cardápio e bebidas, formulário de reserva
images/             fotos, pratos, ícones e imagem de compartilhamento
  pratos/           pratos do cardápio e da reserva (webp com fundo transparente)
  hero-prato-*.webp pratos da primeira tela
  salao.webp        foto de "Nosso espaço" (tela cheia)
  fachada.webp      foto de "Nossa história"
  og-image.jpg      imagem de pré-visualização (WhatsApp, redes)
  favicon-32.png, apple-touch-icon.png, icon-512.png   ícones do site (garfo da logo)
  logo-garfo.png    logo do garfo (referência; no site ela já está dentro do CSS)

COMO EDITAR
- Trocar uma foto: substitua o arquivo em images/ mantendo o mesmo nome.
- Cardápio e preços: js/main.js, nos blocos "var F=" (pratos) e "var B=" (bebidas).
  Cada linha é: nome;preço;observação (a observação é opcional).
- WhatsApp das reservas: js/main.js, procure 553125265852.
- Horários: aparecem em index.html (barra "Nossa história", rodapé e dados do Google no fim do <head>)
  e em js/main.js (var H=, usado para validar a reserva).

PARA PUBLICAR
1. Envie a pasta inteira para a hospedagem (mantendo as pastas css, js e images).
2. Em index.html, troque content="images/og-image.jpg" por o endereço completo,
   por exemplo https://seudominio.com/images/og-image.jpg (redes sociais exigem endereço completo).
3. Opcional: adicione a URL do site e o link do Instagram aos dados do Google (bloco application/ld+json).
