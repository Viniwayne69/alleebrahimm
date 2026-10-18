# Cartão digital da Allê Ebrahim

Next.js com App Router, React, TypeScript, Tailwind CSS e Fira Sans via next/font.

## Executar e publicar

Use `npm install` e `npm run dev`. Para produção: `npm run build` e `npm start`. Na Vercel, selecione o preset Next.js. Configure `NEXT_PUBLIC_SITE_URL` com a URL definitiva para o Open Graph, ou use a URL de produção fornecida automaticamente pela Vercel.

## Editar conteúdo

* Foto: a foto enviada está em `public/images/alle.jpg`. Para trocar, substitua o arquivo e atualize o alt em `src/components/Avatar.tsx`. Ajuste o enquadramento em `.avatar img`, no CSS.
* Links e datas: edite `src/data/links.ts`. Os endereços continuam como `#`; empresa e dúvidas devem receber o WhatsApp da Rosana.
* Marca: os quatro SVGs oficiais foram copiados de `Alle-brand-assets` para `public/brand`, preservando seus desenhos e proporções.
* Cores: `public/brand/cores.css` contém as variáveis oficiais e é importado no layout. Os estilos em `src/app/globals.css` usam essas variáveis.
* Botão de garçons: variante `cream`, com fundo branco quente, texto azul e data bordô. Dúvidas usa `outline`, sempre transparente.

## Composição responsiva

Em telas com pelo menos 375px de largura e altura entre 800px e 959px, as medidas são reduzidas proporcionalmente para acomodar o logo vertical oficial. As áreas de toque continuam com pelo menos 44px. Em 393 × 852 o cartão completo cabe sem rolagem; em 360 × 740 a composição permite rolagem vertical. A coluna tem largura máxima de 430px e o catavento pode ultrapassar sua borda no desktop.

O gradiente laranja foi escurecido para melhorar o contraste do texto com peso 500. A data do primeiro botão usa 19px em telas maiores para atender ao contraste exigido para texto em negrito. Nenhum conteúdo fica invisível aguardando animação, e movimento reduzido desativa as animações.

## Verificação

`npm run lint` valida os arquivos da aplicação e `npm run build` gera a versão de produção.

Para repetir os testes visuais, execute a versão de produção na porta 3001 (`npm run start` com a opção de porta do Next), instale o Chromium do Playwright se necessário e use `npm run test:visual`. A variável `CHROME_PATH` permite selecionar um Chrome já instalado. `PREVIEW_URL` altera o endereço de teste.

`npm run audit:mobile` mede performance e acessibilidade com o Lighthouse mobile na porta 3001. O script usa o Chrome instalado no Windows e aceita `CHROME_PATH` para outros caminhos.

As capturas antes e depois, os testes responsivos e os relatórios Lighthouse ficam em `artifacts/visual-review`.

## Pendências

A foto enviada já está aplicada, com enquadramento do rosto feito em CSS. Os cinco links precisam dos endereços reais. O logo vertical e o selo seguem os arquivos oficiais fornecidos, que diferem do mockup original. As dimensões compactas seguem a preferência por manter tudo visível em 393 × 852. A nota Lighthouse local pode variar no domínio publicado.

Última medição local: Lighthouse mobile com desempenho 94 e acessibilidade 100. A meta de desempenho 95 segue pendente. Consulte artifacts/visual-review/revisao.md para o comparativo completo.

