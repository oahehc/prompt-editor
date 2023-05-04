import { Inter } from "next/font/google";
import Head from "next/head";
import { Editor } from "@/components/Editor";
import { Result } from "@/components/Result";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [res, setRes] = useState<string[][]>([]);

  return (
    <>
      <Head>
        <title>Prompt Editor</title>
      </Head>
      <main
        className={`flex min-h-screen flex-col items-center justify-between p-2 ${inter.className}`}
      >
        <Editor onChange={setRes} />
        <Result data={res} />
      </main>
    </>
  );
}
