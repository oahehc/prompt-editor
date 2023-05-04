import { useState } from "react";
import { Button, ButtonProps } from "antd";
import { CopyOutlined } from "@ant-design/icons";

interface Props extends ButtonProps {
  content: string;
  btnText: string;
  copiedText?: string;
}

export const CopyButton = ({
  content,
  btnText,
  copiedText = "Copied",
  ...res
}: Props) => {
  const [isClicked, setIsClicked] = useState(false);
  function onClick() {
    navigator.clipboard.writeText(content);
    setIsClicked(true);

    setTimeout(() => {
      setIsClicked(false);
    }, 2000);
  }

  return (
    <Button icon={<CopyOutlined />} onClick={onClick} {...res}>
      {isClicked ? copiedText : btnText}
    </Button>
  );
};
