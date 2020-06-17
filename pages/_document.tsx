import Document, { Head, Main, NextScript } from 'next/document'
import { GA_TRACKING_ID } from '../utils/ga'

const { WEB_NFC_TRIAL_TOKEN } = process.env

export default class MyDocument extends Document {
  render() {
    return (
      <html>
        <Head>
          <meta
            http-equiv="origin-trial"
            content={WEB_NFC_TRIAL_TOKEN}
          />
          <script
            async
            src={
              `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`
            }
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_TRACKING_ID}', {
                  page_path: window.location.pathname,
                });
              `,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
