import React from "react";
import App, { AppContext } from "next/app";
import Head from "next/head";
import { Router } from "next/router";

import { IntlProvider } from "react-intl";

import ThemeContextProvider from "contexts/ThemeContext";
import { getLocale, getMessages } from "i18n";
import ThemeProvider from "theme/Provider";

class MyApp extends App<{
  locale: string;
  messages: any;
  router: Router;
}> {
  static async getStaticProps({
    Component,
    ctx,
  }: {
    Component: any;
    ctx: any;
  }): Promise<{
    pageProps: any;
    locale: string;
    messages: any;
  }> {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    const locale = (await getLocale(ctx)) || "en";
    const messages = await getMessages(locale);
    return {
      pageProps,
      locale,
      messages,
    };
  }

  static async getInitialProps(context: AppContext): Promise<any> {
    const fullProps = await App.getInitialProps(context);
    return fullProps;
  }

  render() {
    const {
      Component,
      pageProps: { ...pageProps },
      locale,
      messages,
    } = this.props;

    return (
      <>
        <Head>
          <title>Tomorrow Modal</title>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <ThemeContextProvider>
          <ThemeProvider>
            <IntlProvider locale={locale || "en"} messages={messages}>
              <Component {...pageProps} />
            </IntlProvider>
          </ThemeProvider>
        </ThemeContextProvider>
      </>
    );
  }
}

export default MyApp;
