export type CardLink = {
  id: string;
  textoLinha1: string;
  textoLinha2?: string;
  destaque?: string;
  data?: string;
  variante: 'wine' | 'orange' | 'gold' | 'cream' | 'outline';
  href: string;
};

export const links: CardLink[] = [
  { id: 'virada', textoLinha1: 'Quero participar da', destaque: 'VIRADA DE VENDAS', data: '04/11', variante: 'wine', href: 'https://viradadevendas.vercel.app/' },
  { id: 'empresa', textoLinha1: 'Quero treinamento só', textoLinha2: 'para a minha empresa', variante: 'orange', href: 'https://wa.me/558199369935?text=Ol%C3%A1!%20Quero%20um%20treinamento%20s%C3%B3%20para%20a%20minha%20empresa.' },
  { id: 'vendedores', textoLinha1: 'Próximo treinamento', textoLinha2: 'para ', destaque: 'VENDEDORES', data: '11/11', variante: 'gold', href: '#' }, // TODO: colar URL real
  { id: 'garcons', textoLinha1: 'Próximo treinamento', textoLinha2: 'para ', destaque: 'GARÇONS', data: '16/11', variante: 'cream', href: '#' }, // TODO: colar URL real
  { id: 'duvidas', textoLinha1: 'Quero tirar dúvidas', variante: 'outline', href: 'https://wa.me/558199369935?text=Ol%C3%A1!%20Gostaria%20de%20tirar%20algumas%20d%C3%BAvidas.' },
];

