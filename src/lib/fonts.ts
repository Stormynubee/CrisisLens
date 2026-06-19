import {
  Inter,
  JetBrains_Mono,
  Noto_Sans_Devanagari,
  Noto_Sans_Oriya,
  Source_Serif_4,
} from 'next/font/google';

export const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

export const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

export const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const notoOriya = Noto_Sans_Oriya({
  subsets: ['oriya'],
  variable: '--font-odia',
  display: 'swap',
});

export const notoDevanagari = Noto_Sans_Devanagari({
  subsets: ['devanagari'],
  variable: '--font-hindi',
  display: 'swap',
});

export const fontClassName = [
  inter.variable,
  sourceSerif.variable,
  jetbrainsMono.variable,
  notoOriya.variable,
  notoDevanagari.variable,
].join(' ');
