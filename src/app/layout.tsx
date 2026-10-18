import type { Metadata, Viewport } from 'next';
import { Fira_Sans } from 'next/font/google';
import '../../public/brand/cores.css';
import './globals.css';
const fira = Fira_Sans({ subsets: ['latin'], weight: ['400', '500', '700', '800'], variable: '--font-fira', display: 'swap' });
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? 'https://' + process.env.VERCEL_PROJECT_PRODUCTION_URL : 'http://localhost:3000')),
  title: 'Allê Ebrahim | Experiência em Vendas',
  description: 'Vender fica mais leve quando existe conexão. Conheça os treinamentos de vendas de Allê Ebrahim.',
  openGraph: { title: 'Allê Ebrahim | Experiência em Vendas', description: 'Vender fica mais leve quando existe conexão.', locale: 'pt_BR', type: 'website', images: [{ url: '/images/alle.jpg', width: 1200, height: 1121, alt: 'Allê Ebrahim' }] },
  icons: { icon: '/brand/catavento-mostarda.svg' },
};
export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#002D3C' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body className={fira.variable}>{children}</body></html>;
}



