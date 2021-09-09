import styled from "styled-components";
import CloseIcon from "@material-ui/icons/Close";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
export const Container = styled.div`
  display: flex;
  z-index: 1;
  width: 100%;
  height: 100vh;
  max-width: 1300px;
  margin-right: auto;
  margin-left: auto;
`;

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const FixedArea = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  p {
    font-size: 1.15rem;
    font-weight: bold;
  }
`;

export const CustomedArea = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  p {
    font-size: 1.15rem;
    font-weight: bold;
  }
`;

export const TextArea = styled.div`
  /* width: 150px;

  p {
    font-size: 1.15rem;
    font-weight: bold;
  } */
`;

export const CustomFileContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 300px;
  flex-wrap: wrap;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  margin-top: 10px;
`;

export const CustomFileWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  align-content: flex-start;
`;

export const CustomFileItem = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 5px;
  padding: 5px 10px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  height: 30px;
`;

export const ClosedIcon = styled(CloseIcon)`
  cursor: pointer;
  &:hover {
    transform: scale(1.2);
    transition: transform 0.5s;
  }
`;

export const FileUploadWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  /* height: 100%; */
`;

export const FileUploadFormWrapper = styled.div`
  justify-content: flex-end;
  display: flex;
  align-items: center;
  margin: 45px 0px 0px 0px;
`;

export const FileUploadListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  min-height: 300px;
  margin-left: 10px;
  margin-top: 10px;
`;

export const FileUploadListItem = styled.div`
  display: flex;
  align-items: center;
  margin: 5px;
`;

export const FileIcon = styled(InsertDriveFileIcon)`
  cursor: pointer;
  color: #333;
  &:hover {
    transform: scale(1.2);
    transition: transform 0.5s;
  }
`;

export const DotLoaderContainer = styled.div`
  display: flex;
  height: 100vh;

  align-items: center;
  justify-content: center;
  z-index: 100;
`;

const DotLoaderWrapper = styled.div`
  .lds-grid {
    display: inline-block;
    position: relative;
    width: ${(props) => props.size || 80}px;
    height: ${(props) => props.size || 80}px;
  }
  .lds-grid div {
    position: absolute;
    width: ${(props) => (props.size || 80) / 5 || 16}px;
    height: ${(props) => (props.size || 80) / 5 || 16}px;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.4);
    animation: lds-grid 1.2s linear infinite;
  }
  .lds-grid div:nth-child(1) {
    top: ${(props) => (props.size || 80) / 10}px;
    left: ${(props) => (props.size || 80) / 10}px;
    animation-delay: 0s;
  }
  .lds-grid div:nth-child(2) {
    top: ${(props) => (props.size || 80) / 10}px;
    left: ${(props) => ((props.size || 80) / 10) * 4}px;
    animation-delay: -0.4s;
  }
  .lds-grid div:nth-child(3) {
    top: ${(props) => (props.size || 80) / 10}px;
    left: ${(props) => ((props.size || 80) / 10) * 7}px;
    animation-delay: -0.8s;
  }
  .lds-grid div:nth-child(4) {
    top: ${(props) => ((props.size || 80) / 10) * 4}px;
    left: ${(props) => (props.size || 80) / 10}px;
    animation-delay: -0.4s;
  }
  .lds-grid div:nth-child(5) {
    top: ${(props) => ((props.size || 80) / 10) * 4}px;
    left: ${(props) => ((props.size || 80) / 10) * 4}px;
    animation-delay: -0.8s;
  }
  .lds-grid div:nth-child(6) {
    top: ${(props) => ((props.size || 80) / 10) * 4}px;
    left: ${(props) => ((props.size || 80) / 10) * 7}px;
    animation-delay: -1.2s;
  }
  .lds-grid div:nth-child(7) {
    top: ${(props) => ((props.size || 80) / 10) * 7}px;
    left: ${(props) => (props.size || 80) / 10}px;
    animation-delay: -0.8s;
  }
  .lds-grid div:nth-child(8) {
    top: ${(props) => ((props.size || 80) / 10) * 7}px;
    left: ${(props) => ((props.size || 80) / 10) * 4}px;
    animation-delay: -1.2s;
  }
  .lds-grid div:nth-child(9) {
    top: ${(props) => ((props.size || 80) / 10) * 7}px;
    left: ${(props) => ((props.size || 80) / 10) * 7}px;
    animation-delay: -1.6s;
  }
  @keyframes lds-grid {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }
`;

export const DotLoader = ({ ...props }) => (
  <DotLoaderWrapper {...props}>
    <div className="lds-grid">
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
    </div>
  </DotLoaderWrapper>
);
