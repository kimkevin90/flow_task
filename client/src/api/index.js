import Axios from "axios";

const FileManager_URL = "/apis/filemanager";
const FileUpload_URL = "/apis/fileupload";
const DOWNLOADS3_URL = "/apis/fileupload/download/";

export const getAllFixedFileExe = async () => {
  try {
    const fixedFileExe = await Axios.get(
      FileManager_URL + "/getfiexdextensions"
    );
    return fixedFileExe.data;
  } catch (e) {
    console.error(e);
  }
};

export const getAllCustomedFileExe = async () => {
  try {
    const customedFileExe = await Axios.get(
      FileManager_URL + "/getcustomedextensions"
    );
    return customedFileExe.data;
  } catch (e) {
    console.error(e);
  }
};

export const getUploadedFile = async () => {
  try {
    const customedFileExe = await Axios.get(FileUpload_URL + "/getfilelist");
    return customedFileExe.data;
  } catch (e) {
    console.error(e);
  }
};

export const updateFixedFileExe = async (id, data) => {
  try {
    const updatedFileExe = await Axios.patch(
      FileManager_URL + `/editextensions/${id}`,
      data
    );
    return updatedFileExe.data;
  } catch (e) {
    console.error(e);
  }
};

export const createCustomedFileExe = async (data) => {
  const createFileExe = await Axios.post(
    FileManager_URL + `/registerFileExe`,
    data
  )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
  // console.log(createFileExe);
  return createFileExe;
};

export const deleteCustomedFileExe = async (id) => {
  try {
    const updatedFileExe = await Axios.delete(
      FileManager_URL + `/deleteFileExe/${id}`
    );
    return updatedFileExe.data;
  } catch (e) {
    console.error(e);
  }
};

export const uploadFile = async (formData) => {
  try {
    const result = await Axios({
      method: "post",
      url: FileUpload_URL,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response.data;
      });
    return result;
  } catch (e) {
    console.log(e);
  }
};

export async function downloadS3UploadedFile(filename) {
  try {
    const result = await Axios({
      method: "get",
      url: DOWNLOADS3_URL + filename,
      responseType: "arraybuffer",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return result;
  } catch (e) {
    console.log(e);
  }
}
