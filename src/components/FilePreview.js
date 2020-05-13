import React, { useEffect, useState } from "react";
import { Media } from "reactstrap";
import profilePhotoTwo from "../assets/img/mock_imgs/user_mock.jpg";
import { FileIcon } from "../assets/img/icons";

const UploadFileButton = ({
  file,
  uploadHandler,
  uploadState,
  setFileUploaded,
  createProjectDeliverableMaterial
}) => {
  const [progressValue, setProgressValue] = useState(0);
  const [isProgressing, setIsProgressing] = useState(false);

  useEffect(() => {
    if (isProgressing && progressValue < 100) {
      const interval = setInterval(() => {
        setProgressValue(previousValue => previousValue + 1);
      }, 10);

      return () => {
        clearInterval(interval);
      };
    } else {
      setIsProgressing(false);
    }
  }, [progressValue, isProgressing]);

  useEffect(() => {
    if (progressValue === 100 && !isProgressing) {
      setFileUploaded(true);
    }
  }, [isProgressing]);

  return (
    <>
      {uploadState ? (
        <progress max={100} value={progressValue} />
      ) : (
        <button
          className={["btn-primary", "btn", "mr-3", "px-5"].join(" ")}
          onClick={() => {
            setIsProgressing(true);
            createProjectDeliverableMaterial(file);
            uploadHandler();
          }}
        >
          Upload
        </button>
      )}
    </>
  );
};

const FilePreview = props => {
  const {
    id,
    img,
    name,
    file,
    preview,
    createProjectDeliverableMaterial,
    deleteProjectDeliverableMaterials,
    isPreview,
    showUploadButton,
    linkStyle,
    fileUploaded
  } = props;

  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const imageType = ["jpg", "jpeg", "gif", "png"];

  const startUpload = () => {
    setUploading(uploadState => !uploadState);
  };

  const setFileUploaded = state => {
    setUploaded(state);
    fileUploaded(state);
  };

  return (
    <Media className={["file-preview"].join(" ")}>
      <Media left bottom>
        {imageType.includes(name.split(".").slice(-1)[0]) ? (
          <Media
            object
            src={preview || profilePhotoTwo}
            alt="Generic placeholder image"
          />
        ) : (
          <div className="d-flex justify-content-center mt-3">
            <FileIcon />
          </div>
        )}
      </Media>
      <Media
        body
        className={[
          "p-2",
          "position-relative",
          "justify-content-between",
          "file-preview-button-section",
          `${uploaded ? "flex-column" : "align-items-center"}`,
          `${!isPreview ? "" : "d-inline-flex"}`
        ].join(" ")}
      >
        <p className="h7 font-weight-bold">
          {name.length ? name : "Document Name.docx"}
        </p>

        {!isPreview || uploaded ? (
          <div className="file-actions d-inline-flex">
            <a
              href="#"
              className={["text-link", "mr-2", "h7"].join(" ")}
              style={linkStyle ? linkStyle : {}}
              onClick={e => e.preventDefault()}
            >
              Preview
            </a>
            <a
              href={preview}
              download={name}
              className={["text-link", "h7"].join(" ")}
              style={linkStyle ? linkStyle : {}}
            >
              Download
            </a>
            {deleteProjectDeliverableMaterials && !isPreview ? (
              <a
                className={[
                  "text-link",
                  "ml-2",
                  "h7",
                  "cursor-pointer delete-preview"
                ].join(" ")}
                onClick={e => deleteProjectDeliverableMaterials(id)}
              >
                Delete
              </a>
            ) : deleteProjectDeliverableMaterials && uploaded ? (
              <a
                className={[
                  "text-inline-grayed",
                  "ml-2",
                  "h7",
                  "cursor-pointer delete-preview"
                ].join(" ")}
                onClick={e => deleteProjectDeliverableMaterials(id)}
              >
                Delete
              </a>
            ) : (
              ""
            )}
          </div>
        ) : (
          showUploadButton !== false && (
            <UploadFileButton
              file={file}
              uploadHandler={startUpload}
              uploadState={uploading}
              setFileUploaded={setFileUploaded}
              createProjectDeliverableMaterial={
                createProjectDeliverableMaterial
              }
            />
          )
        )}
        <div className="card__corner">
          <div className="card__corner-triangle" />
        </div>
      </Media>
    </Media>
  );
};

export default FilePreview;
