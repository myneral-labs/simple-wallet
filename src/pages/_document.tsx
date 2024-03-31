import NextDocument, { Html, Head, Main, NextScript } from 'next/document';
import { ColorModeScript } from '@chakra-ui/react';


export default class Document extends NextDocument {
  render() {
    return (
      <Html>
        <Head>
          {/* <title>Wellmax Credit - Wallet</title> */}

          {/* Favicon */}
          <link rel='apple-touch-icon' sizes='180x180' href='/img/favicon/apple-touch-icon.png' />
          <link rel='icon' type='image/png' sizes='32x32' href='/img/favicon/favicon-32x32.png' />
          <link rel='icon' type='image/png' sizes='16x16' href='/img/favicon/favicon-16x16.png' />
          <link rel='manifest' href='/manifest.webmanifest' />
          <link rel='mask-icon' href='/img/favicon/safari-pinned-tab.svg' color='#111111' />
          <meta name='msapplication-TileColor' content='#111111' />
          <meta name='theme-color' content='#111111' />

          {/* Metadata */}
          <meta
            name='description'
            content='Accepting assets has never been so easy. Receive credit payments in just 30 seconds.'
          />
          <meta name='robots' content='index,follow' />

          <meta property='og:title' content='Wellmax Credit - Wallet' />
          <meta property='og:description' content='Receive credit payments in just 30 seconds.' />
          <meta property='og:locale' content='es_ES' />
          <meta property='og:type' content='website' />
          <meta property='og:image' content='/img/social/facebook-1200x630.jpg' />
          <meta property='og:url' content='https://wellmax.app' />

          <meta name='twitter:title' content='Wellmax Credit - Wallet' />
          <meta name='twitter:description' content='Receive credit payments in just 30 seconds.' />
          <meta name='twitter:card' content='summary_large_image' />
          <meta name='twitter:image' content='/img/social/twitter-600x330.jpg' />
          <meta name='twitter:url' content='https://wellmax.app' />
          {/* Add padding to the top of the body on iOS devices */}
          {process.env.EXPORT == '1' && (
            <style>{`
              body {
                padding-top: 35px;
              }
            `}</style>
          )}
        </Head>
        <body>
          <ColorModeScript />
          <Main />
          <NextScript />

          {/* Global Site Tag (gtag.js) - Google Analytics */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
            `,
            }}
          />
        </body>
      </Html>
    );
  }
}
