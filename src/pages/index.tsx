import { useState } from "react";
import { NextPageContext } from "next";
import Head from "next/head";
import { Inter } from "next/font/google";
import { Layout } from "antd";
import { Editor } from "@/components/Editor";
import { Result } from "@/components/Result";
import { CommonKeywords } from "@/components/CommonKeywords";

const inter = Inter({ subsets: ["latin"] });

type Props = {
  d?: string;
};

function Home({ d }: Props) {
  const [res, setRes] = useState<string[][]>([]);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      <Head>
        <title>Prompt Editor</title>
      </Head>
      <Layout>
        <Layout.Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          {!collapsed && <CommonKeywords />}
        </Layout.Sider>
        <Layout>
          <Layout.Content>
            <main
              className={`flex min-h-screen flex-col items-center justify-between p-2 ${inter.className}`}
            >
              <Editor onChange={setRes} initValue={d} />
              <Result data={res} />
            </main>
          </Layout.Content>
        </Layout>
      </Layout>
    </>
  );
}

Home.getInitialProps = ({ query }: NextPageContext) => {
  const { d } = query;

  return { d };
};

export default Home;
