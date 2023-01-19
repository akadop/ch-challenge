import * as React from 'react'
import Head from 'next/head'
import { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import '../styles/global.css'

export const queryCache = new QueryClient()

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Clubhouse - Online Users</title>
      </Head>
      <QueryClientProvider client={queryCache}>
        <div className="h-full w-full overflow-y-auto bg-eggshell p-4">
          <div className="mx-auto px-4 sm:px-6 md:max-w-2xl md:px-4 lg:max-w-6xl lg:px-0">
            <Component {...pageProps} />
          </div>
        </div>
      </QueryClientProvider>
    </>
  )
}
