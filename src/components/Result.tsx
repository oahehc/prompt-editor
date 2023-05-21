import Head from "next/head";
import { useEffect, useState } from "react";
import { List, Badge } from "antd";
import { CopyButton } from "@/components/CopyButton";
import { removeEmpty } from "@/utils/arrayUtils";

type Props = {
  data?: string[][];
};

export const Result = ({ data }: Props) => {
  const [res, setRes] = useState<string[]>([]);

  useEffect(() => {
    if (data) {
      let merged: string[] = [];
      for (const keywords of data) {
        if (merged.length === 0) {
          merged = removeEmpty(keywords);
        } else {
          merged = merged
            .map((s) => removeEmpty(keywords).map((k) => `${s}, ${k}`))
            .flat();
        }
      }
      setRes(merged);
    }
  }, [data]);

  return (
    <div className="w-full mt-2">
      {res.length > 0 && (
        <Head>
          <title>{res[0]}</title>
        </Head>
      )}
      <List
        header={
          res.length > 0 ? (
            <div className="flex justify-end items-center">
              <Badge count={res.length} className="mx-2" color="#52c41a" />
              <CopyButton
                type="primary"
                btnText="Copy All"
                content={res.join("\n")}
              />
            </div>
          ) : undefined
        }
        bordered
        dataSource={res}
        renderItem={(item) => (
          <List.Item
            actions={[
              <CopyButton
                key={item}
                size="small"
                btnText=""
                copiedText=""
                content={item}
              />,
            ]}
          >
            {item}
          </List.Item>
        )}
      />
    </div>
  );
};
