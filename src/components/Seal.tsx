import Image from 'next/image';

export function Seal() {
  return <footer className="seal"><Image src="/brand/selo-mostarda.svg" alt="Selo Allê Ebrahim, Experiência em Vendas" width={106} height={106} loading="eager" unoptimized /></footer>;
}

