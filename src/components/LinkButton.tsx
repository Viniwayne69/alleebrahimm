import type { CSSProperties } from 'react';
import type { CardLink } from '@/data/links';
export function LinkButton({ link, index }: { link: CardLink; index: number }) {
  return <li className={link.somenteDesktop ? 'only-desktop' : undefined} style={{ '--index': index } as CSSProperties}>
    <a className={`link-button ${link.variante}`} href={link.href} target="_blank" rel="noopener noreferrer">
      <span className="button-copy"><span>{link.textoLinha1}</span>{(link.textoLinha2 || link.destaque) && <span>{link.textoLinha2}<strong>{link.destaque}</strong></span>}</span>
      {link.data && <span className="date">{link.data}</span>}
      <svg className="chevron" viewBox="0 0 12 22" fill="none" aria-hidden="true"><path d="m3 3 6 8-6 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
    </a>
  </li>;
}

