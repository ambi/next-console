import { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from 'react-query'
import Layout from '../components/layout'
import 'bulma/css/bulma.css'

const queryClient = new QueryClient()

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </QueryClientProvider>
  )
}
