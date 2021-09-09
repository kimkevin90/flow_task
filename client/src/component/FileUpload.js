import Input from "../ui/Input";
import Button from "../ui/Button";
import {
  DotLoader,
  DotLoaderContainer,
  FileIcon,
  FileUploadFormWrapper,
  FileUploadListItem,
  FileUploadListWrapper,
  FileUploadWrapper,
} from "../layout/layout";
import { useForm, Form } from "../hooks/useForm";
import { getUploadedFile, uploadFile, downloadS3UploadedFile } from "../api";
import { useEffect, useState } from "react";

const initialValues = {
  fileCollection: undefined,
};
function FileUpload() {
  const [loading, setLoading] = useState(false);
  const [uploadedFileList, setUploadedFileList] = useState(null);
  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(initialValues);

  const fileHandler = (e) => {
    const { files } = e.target;

    setValues({
      ...values,
      fileCollection: files[0],
    });
  };

  const onSubmit = async () => {
    if (!values.fileCollection) {
      alert("파일을 추가해 주세요.");
      return;
    }

    setLoading(true);

    const formData = await new FormData();
    formData.append("fileCollection", values.fileCollection);
    const result = await uploadFile(formData);
    if (result.err) {
      alert("등록 불가능한 확장자 입니다.");
      setLoading(false);
      return;
    }
    setUploadedFileList(await getUploadedFile());
    setLoading(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const uploadedFileList = await getUploadedFile();
        setUploadedFileList(uploadedFileList);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  const downloadFile = async (filename) => {
    let encode = encodeURIComponent(filename);

    await downloadS3UploadedFile(encode)
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${filename}`); // or any other extension
        document.body.appendChild(link);
        link.click();
      })
      .catch((error) => console.log(error));
  };
  return (
    <Form encType="multipart/form-data">
      <FileUploadWrapper>
        <FileUploadFormWrapper>
          <Input
            type="file"
            name="fileCollection"
            onChange={(e) => fileHandler(e)}
            files="true"
          />
          <Button
            style={{ marginLeft: "5px" }}
            onClick={onSubmit}
            text="+ 업로드"
          />
        </FileUploadFormWrapper>
        <FileUploadListWrapper>
          {!loading ? (
            uploadedFileList &&
            uploadedFileList.map((item) => (
              <FileUploadListItem key={item.id}>
                {item.filename}
                <FileIcon
                  style={{ marginLeft: "5px" }}
                  onClick={() => {
                    downloadFile(item.filename);
                  }}
                />
              </FileUploadListItem>
            ))
          ) : (
            <div
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              업로드중..
            </div>
          )}
        </FileUploadListWrapper>
      </FileUploadWrapper>
    </Form>
  );
}

export default FileUpload;
