import Document, { Html, Head, Main, NextScript } from "next/document";

class PageDocument extends Document {
  render() {
    const ohNoDontDoIt = `
      function getUserTheme() {
        const isUserSaved = window.localStorage.getItem("theme");
        const isUserPrefers = window.matchMedia("(prefers-color-scheme: dark)");

        if (isUserSaved) {
          return isUserSaved;
        } else {
          return isUserPrefers.matches ? "dark" : "light";
        }
      }

      document.body.dataset.theme = getUserTheme();
    `;

    return (
      <Html>
        <Head>
          <meta name="robots" content="index, follow" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Work+Sans:wght@400;700&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <script dangerouslySetInnerHTML={{ __html: ohNoDontDoIt }} />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default PageDocument;
