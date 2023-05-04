import { useState } from "react";
import { NextPageContext } from "next";
import Head from "next/head";
import { Inter } from "next/font/google";
import { Editor } from "@/components/Editor";
import { Result } from "@/components/Result";

const inter = Inter({ subsets: ["latin"] });

type Props = {
  d?: string;
};

function Home({ d }: Props) {
  const [res, setRes] = useState<string[][]>([]);

  return (
    <>
      <Head>
        <title>Prompt Editor</title>
      </Head>
      <main
        className={`flex min-h-screen flex-col items-center justify-between p-2 ${inter.className}`}
      >
        <Editor onChange={setRes} initValue={d} />
        <Result data={res} />
      </main>
    </>
  );
}

Home.getInitialProps = ({ query }: NextPageContext) => {
  const { d } = query;

  return { d };
};

export default Home;
