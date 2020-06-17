import { useEffect } from 'react'
import Router from 'next/router'
import { sendPageview } from '../utils/ga'
import '../assets/scss/main.scss'

export default ({ Component, pageProps }: any) => {
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      sendPageview(url)
    }

    Router.events.on('routeChangeComplete', handleRouteChange)

    return () => {
      Router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [])

  return <Component {...pageProps} />
}
