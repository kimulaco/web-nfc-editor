import React, { ReactNode } from 'react'
import Head from 'next/head'
import AppHeader from '../AppHeader/'
import AppMain from '../AppMain/'

type Props = {
  children?: ReactNode
  title?: string
}

const AppLayout: React.FC<Props> = ({
  children,
  title = 'Web NFC Editor'
}: Props) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0,width=device-width" />
      </Head>

      <AppHeader />

      <AppMain>
        {children}
      </AppMain>
    </div>
  )
}

export default AppLayout
