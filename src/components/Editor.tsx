import { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Button, Form, Input } from "antd";
import {
  MinusOutlined,
  CaretDownOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { generateArray } from "@/utils/arrayUtils";

type Props = {
  onChange: (res: string[][]) => void;
  initValue?: string;
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

const MIN_GROUP_NUM = 2;

export const Editor = ({ onChange, initValue }: Props) => {
  const router = useRouter();
  const [groupNum, setGroupNum] = useState(MIN_GROUP_NUM);
  const [tempRes, setTempRes] = useState<string[][]>([]);

  function onFieldsChange(changedFields: FieldData[], allFields: FieldData[]) {
    const res = allFields.map(({ value }) => value?.split("\n") ?? []);

    setTempRes(res);

    // Update URL
    router.replace({
      pathname: router.pathname,
      query: { d: JSON.stringify(res) },
    });
  }
  function addGroup() {
    setGroupNum((prev) => prev + 1);
  }
  function removeGroup() {
    setGroupNum((prev) => {
      const newGroupNum = Math.max(prev - 1, MIN_GROUP_NUM);
      removeFormItem(newGroupNum);

      return newGroupNum;
    });
  }
  function removeFormItem(num: number) {
    form.setFieldValue(`group-${num}`, undefined);
    setTempRes((res) => res.slice(0, num));
  }

  useEffect(() => {
    onChange(tempRes);
  }, [tempRes]);

  const [form] = Form.useForm();
  const [formInitialValues, setFormInitialValues] = useState({});
  useEffect(() => {
    if (initValue && form) {
      try {
        // load initial values from URL
        const parsed = JSON.parse(initValue);
        setGroupNum(parsed.length);
        const init: Record<string, string> = parsed.reduce(
          (acc: Record<string, string>, cur: string[], i: number) => {
            acc[`group-${i}`] = cur.join("\n");
            return acc;
          },
          {}
        );
        setFormInitialValues(init);
        setTempRes(Object.values(init).map((v) => v.split("\n")));
      } catch (error) {
        console.error("query-string parse fail:", error);
      }
    }
  }, []);
  useEffect(() => {
    // reset the form to initial values
    form.resetFields();
  }, [formInitialValues]);

  return (
    <Form
      form={form}
      onFieldsChange={onFieldsChange}
      initialValues={formInitialValues}
    >
      <div className="flex flex-col items-center gap-2">
        {generateArray(groupNum).map((i) => (
          <Fragment key={i}>
            {i > 0 && <CaretDownOutlined />}
            <Form.Item name={`group-${i}`} noStyle>
              <Input.TextArea
                rows={4}
                cols={140}
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
