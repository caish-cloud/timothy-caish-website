import { Providers } from '@/app/providers';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { generateMetaData } from '@/helpers';
import { i18n } from '@/services/localization';
import { Flex } from '@chakra-ui/react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = generateMetaData();

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout(props: RootLayoutProps) {
  return (
    <html lang={i18n.locale}>
      <body className={inter.className}>
        <Providers>
          <Flex direction="column" h="100%">
            {/* Navigation bar */}
            <Navbar />

            {props.children}

            {/* Footer */}
            <Footer />
          </Flex>
        </Providers>
      </body>
    </html>
  );
}
