import { Inter } from "next/font/google";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Prompt Editor</title>
      </Head>
      <main
        className={`flex min-h-screen flex-col items-center justify-between p-2 ${inter.className}`}
      ></main>
    </>
  );
}
