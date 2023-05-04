import { Fragment, useState } from "react";
import { Button, Form, Input } from "antd";
import {
  MinusOutlined,
  CaretDownOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { generateArray } from "@/utils/arrayUtils";

type Props = {
  onChange: (res: string[][]) => void;
};

type FieldData = {
  name: string | number | (string | number)[];
  value?: string;
  touched?: boolean;
  validating?: boolean;
  errors?: string[];
};

const placeholderMap = [
  "a dog selfie\na cat selfie",
  "in realistic style\nin cartoon style\nin anime style",
];

export const Editor = ({ onChange }: Props) => {
  const [groupNum, setGroupNum] = useState(2);

  function onFieldsChange(changedFields: FieldData[], allFields: FieldData[]) {
    const res = allFields.map(({ value }) => value?.split("\n") ?? []);

    onChange(res);
  }

  function addGroup() {
    setGroupNum((prev) => prev + 1);
  }
  function removeGroup() {
    setGroupNum((prev) => Math.max(prev - 1, 1));
  }

  return (
    <Form onFieldsChange={onFieldsChange}>
      <div className="flex flex-col items-center gap-2">
        {generateArray(groupNum).map((i) => (
          <Fragment key={i}>
            {i > 0 && <CaretDownOutlined />}
            <Form.Item name={`group-${i + 1}`} noStyle>
              <Input.TextArea
                rows={4}
                cols={50}
                placeholder={placeholderMap[i] || ""}
              />
            </Form.Item>
          </Fragment>
        ))}
        <Button.Group>
          <Button icon={<MinusOutlined />} onClick={removeGroup} />
          <Button icon={<PlusOutlined />} onClick={addGroup} />
        </Button.Group>
      </div>
    </Form>
  );
};
