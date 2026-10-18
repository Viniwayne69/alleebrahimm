# Revisão visual do cartão da Allê

Os arquivos oficiais substituíram o logo, o catavento, o selo e o pattern provisórios. A ordem dos blocos, os cinco textos e as datas foram preservados.

O botão de GARÇONS tem fundo #FFF8EE, texto e seta #002D3C, destaque com peso 800 e data com fundo #831417 e texto branco quente. O botão de dúvidas permanece transparente, com contorno branco quente.

## Capturas em 393 × 852

Antes:

![Antes em 393 por 852](<C:/Users/Viniciusriber/Downloads/Cartão de visita Alle/artifacts/visual-review/before-393x852.png>)

Depois:

![Depois em 393 por 852](<C:/Users/Viniciusriber/Downloads/Cartão de visita Alle/artifacts/visual-review/after-393x852.png>)

## Capturas em 1440 × 900

Antes:

![Antes em 1440 por 900](<C:/Users/Viniciusriber/Downloads/Cartão de visita Alle/artifacts/visual-review/before-1440x900.png>)

Depois:

![Depois em 1440 por 900](<C:/Users/Viniciusriber/Downloads/Cartão de visita Alle/artifacts/visual-review/after-1440x900.png>)

## Verificações

* Build e lint concluídos sem erros ou avisos.
* Lighthouse mobile sobre a versão de produção local: desempenho 94 e acessibilidade 100. A meta de desempenho 95 ainda não foi alcançada.
* Sem deslocamento de layout: CLS 0. O avatar recebe prioridade alta e os SVGs visíveis carregam imediatamente.
* Testes em 360 × 740, 393 × 852, 430 × 932, 768 × 1024 e 1440 × 900, sem rolagem horizontal. Em 393 × 852 todos os elementos cabem. Em 360 × 740 a página tem 984px de altura e permite rolagem vertical.
* Os arquivos de fonte efetivamente usados foram inspecionados no navegador: FiraSans-Regular, FiraSans-Medium, FiraSans-Bold e FiraSans-ExtraBold. Nenhuma versão condensada ou fonte de fallback renderiza os textos.
* Foco de teclado visível, áreas de toque de pelo menos 44px e animações desativadas com movimento reduzido.
* Os estilos calculados confirmam o fundo #002D3C, a divisória mostarda e as cores dos dois últimos botões. O arquivo pixel-check.json registra a verificação das cores nas capturas.
* Os quatro SVGs e cores.css são cópias dos arquivos fornecidos, com os desenhos originais preservados.

## Diferenças e pendências

A foto ainda é um placeholder, e os cinco links aguardam os endereços reais. O logo vertical e o selo reproduzem os arquivos oficiais, que diferem dos desenhos vistos no mockup inicial. As medidas e os espaçamentos são reduzidos proporcionalmente em telas intermediárias para manter tudo visível, conforme a preferência escolhida. O gradiente laranja é mais escuro para preservar contraste. A cor do quarto botão segue a nova solicitação.

Os relatórios completos estão em lighthouse-mobile.html, lighthouse-mobile.json e responsive-checks.json, nesta pasta.
