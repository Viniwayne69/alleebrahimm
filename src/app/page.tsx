import Image from 'next/image';
import { Avatar } from '@/components/Avatar';
import { Logo } from '@/components/Logo';
import { Pattern } from '@/components/Pattern';
import { LinkButton } from '@/components/LinkButton';
import { links } from '@/data/links';
export default function Home() {
  return <><Pattern /><main className="card">
    <Image className="hero-pinwheel" src="/brand/catavento-mostarda.svg" width={130} height={130} alt="" aria-hidden="true" loading="eager" unoptimized />
    <header className="intro"><Avatar /><Logo />
      <h1><span className="slogan-line">Vender fica mais leve</span><span className="slogan-line">quando existe <strong>conexão</strong></span></h1>
    </header>
    <div className="divider" aria-hidden="true" />
    <nav aria-label="Treinamentos e contato"><ul>{links.map((link, index) => <LinkButton key={link.id} link={link} index={index} />)}</ul></nav>
  </main></>;
}



