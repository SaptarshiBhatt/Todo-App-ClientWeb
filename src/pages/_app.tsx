import '@/styles/globals.css'
import { NextUIProvider } from '@nextui-org/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { AppProps } from 'next/app'
import { Inconsolata } from "next/font/google";
import { useRouter } from 'next/router';

const cardo = Inconsolata({subsets: ['latin'], weight: "400"})

// Create a client
const queryClient = new QueryClient()


export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  return (
    <QueryClientProvider client={queryClient}>
      <NextUIProvider navigate={router.push}>
        <main className={cardo.className}>
              <Component {...pageProps} />
        </main>
      </NextUIProvider>
    </QueryClientProvider>
  )
}
