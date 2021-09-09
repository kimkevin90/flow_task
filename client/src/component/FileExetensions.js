import {
  CustomedArea,
  FixedArea,
  TextArea,
  CustomFileWrapper,
  CustomFileItem,
  ClosedIcon,
  DotLoader,
  DotLoaderContainer,
  CustomFileContainer,
} from "../layout/layout";
import { Form, useForm } from "../hooks/useForm";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Input from "../ui/Input";
import { useEffect, useState } from "react";

import Button from "../ui/Button";
import {
  createCustomedFileExe,
  deleteCustomedFileExe,
  getAllCustomedFileExe,
  getAllFixedFileExe,
  updateFixedFileExe,
} from "../api";

const initialValues = {
  fileExe: "",
};

function FileExetensions() {
  const [fixedFileExe, setFixedFileExe] = useState(null);
  const [customedFileExe, setCustomedFileExe] = useState(null);
  const [loading, setLoading] = useState(false);
  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(initialValues);

  const handleCheckdBoxChange = async (event, id) => {
    const response = await updateFixedFileExe(id, {
      isChecked: event.target.checked,
    });
    if (response) {
      const resultValues = fixedFileExe.map((item) => {
        if (item.id === response.id) {
          item.isChecked = response.isChecked;
        }
        return item;
      });
      setFixedFileExe(resultValues);
    } else {
      alert("고정확장자 수정 실패");
    }
  };

  const addCustomeFileExe = async () => {
    try {
      if (customedFileExe.length > 200) {
        alert("200개 이상 파일 추가할 수 업습니다.");
        return;
      }
      if (values.fileExe === "") {
        alert("확장자명을 입력해주세요");
        return;
      }

      const response = await createCustomedFileExe({ fileExe: values.fileExe });
      if (response.err === "unique violation") {
        alert("중복 확장자명 입니다.");
        return;
      }
      setCustomedFileExe(await getAllCustomedFileExe());
      setValues({ fileExe: "" });
    } catch (err) {
      console.log(err);
    }
  };

  const deleteFileExe = async (id) => {
    try {
      const response = await deleteCustomedFileExe(id);
      if (response) {
        setCustomedFileExe(await getAllCustomedFileExe());
      } else {
        alert("삭제 실패");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const fixedResponse = await getAllFixedFileExe();
        const customeresponse = await getAllCustomedFileExe();
        setFixedFileExe(fixedResponse);
        setCustomedFileExe(customeresponse);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);
  if (loading) {
    return (
      <DotLoaderContainer>
        <DotLoader />
      </DotLoaderContainer>
    );
  } else {
    return (
      <>
        <Form encType="multipart/form-data">
          <FixedArea>
            <TextArea>
              <p>고정확장자</p>
            </TextArea>
            <div>
              {fixedFileExe &&
                fixedFileExe.map((item) => {
                  return (
                    <FormControlLabel
                      key={item.id}
                      control={
                        <Checkbox
                          checked={item.isChecked}
                          onChange={(e) => handleCheckdBoxChange(e, item.id)}
                          color="primary"
                        />
                      }
                      label={`${item.fileExe}`}
                    />
                  );
                })}
            </div>
          </FixedArea>
          <CustomedArea>
            <TextArea>
              <p>커스텀확장자</p>
            </TextArea>

            <div style={{ display: "flex", alignItems: "center" }}>
              <Input
                isBig
                variant="outlined"
                type="text"
                name="fileExe"
                onChange={handleInputChange}
                value={values.fileExe}
              />
              <Button
                style={{ marginLeft: "5px" }}
                onClick={addCustomeFileExe}
                text="+ 추가"
              />
            </div>
          </CustomedArea>
        </Form>
        <CustomFileContainer>
          <div
            style={{ margin: "10px", fontWeight: "bold", color: "#333" }}
          >{`${customedFileExe?.length} / 200`}</div>
          <CustomFileWrapper style={{ display: "flex" }}>
            {customedFileExe &&
              customedFileExe.map((item) => (
                <CustomFileItem key={item.id}>
                  <p>{item.fileExe}</p>
                  <ClosedIcon onClick={() => deleteFileExe(item.id)} />
                </CustomFileItem>
              ))}
          </CustomFileWrapper>
        </CustomFileContainer>
      </>
    );
  }
}

export default FileExetensions;
