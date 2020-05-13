import React, { Component } from "react";
import Dropzone, { useDropzone } from "react-dropzone";
import {
  DownloadIcon,
  FileIcon,
  FilePlusIcon,
  ImageIcon,
  TrashIcon
} from "../assets/img/icons";
import { isSuperAdmin } from "../lib/helper";

class DragAndDropField extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showDropzone:
        this.props.data && this.props.data.length > 0
          ? true
          : !this.props.hiddenDropzone,
      placeholderImageURL: null,
      numberOfLocalFiles: null,
      previewFiles: this.props.data || []
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.data.length !== this.props.data.length) {
      this.setState({
        previewFiles: this.props.data,
        showDropzone:
          this.props.data.length > 0 ? true : !this.props.hiddenDropzone
      });
    }
  }

  setShowDropzone = () => {
    this.setState({ showDropzone: !this.state.showDropzone });
  };

  showImageOnSelection = acceptedFiles => {
    acceptedFiles.forEach(file => {
      const reader = new FileReader();

      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        this.setState({
          placeholderImageURL: reader.result
        });
      };
      reader.readAsDataURL(file);
    });
  };

  setLocalFiles = acceptedFiles => {
    let { data } = this.props;
    let previewFiles = [...this.state.previewFiles];

    // Remove last file change from array
    if (data && data.length !== previewFiles.length) {
      previewFiles.splice(-1, 1);
    }
    const fineName = acceptedFiles.length > 0 && acceptedFiles[0].name;
    fineName && previewFiles.push({ name: fineName });

    this.setState({
      numberOfLocalFiles: acceptedFiles.length,
      previewFiles
    });
  };

  render() {
    const {
      label,
      name,
      hiddenDropzone,
      btnLabel,
      acceptedFileTypes,
      multiple,
      imageDropzone,
      data,
      onFileDelete
    } = this.props;
    const imageType = ["jpg", "jpeg", "gif", "png"];
    const {
      showDropzone,
      placeholderImageURL,
      numberOfLocalFiles,
      previewFiles
    } = this.state;

    const files = this.props.files || "";

    return (
      <>
        {hiddenDropzone && !showDropzone && (
          <a
            href={"javascript:void(0)"}
            className="btn btn-link d-inline-flex px-0 text-underline"
            onClick={this.setShowDropzone}
          >
            {btnLabel}
          </a>
        )}
        {showDropzone && label && <label>{label}</label>}
        <Dropzone
          onDrop={acceptedFiles => {
            if (imageDropzone) {
              this.showImageOnSelection(acceptedFiles);
            }
            this.setLocalFiles(acceptedFiles);
            this.props.onFileChange(acceptedFiles);
          }}
          multiple={false}
        >
          {({ getRootProps, getInputProps }) => (
            <div className="">
              <div
                className={`${
                  showDropzone ? "d-flex" : "d-none"
                } dropzone-wrapper`}
              >
                <div
                  {...getRootProps({
                    className:
                      "dropzone text-center d-flex flex-column align-items-center justify-content-center"
                  })}
                >
                  <input
                    {...getInputProps({
                      name: name,
                      accept: acceptedFileTypes
                    })}
                  />
                  {(imageDropzone && placeholderImageURL === null) ||
                  (!imageDropzone && numberOfLocalFiles === null) ? (
                    <>
                      <div className="icon-wrapper mb-3">
                        <FilePlusIcon />
                      </div>
                      <p className="mb-0">Drag & Drop Files to Upload</p>
                      <span className="d-block text-grayed h6">
                        (or click to select)
                      </span>
                    </>
                  ) : (
                    <>
                      {!imageDropzone && (
                        <>
                          <div className="icon-wrapper mb-3">
                            <FilePlusIcon />
                          </div>
                          <p className="mb-0">
                            {numberOfLocalFiles}{" "}
                            {numberOfLocalFiles > 1 ? "Files" : "File"} selected
                          </p>
                        </>
                      )}

                      {imageDropzone && (
                        <p className="mb-1">
                          <img
                            src={placeholderImageURL}
                            alt=""
                            style={{ maxWidth: "130px" }}
                          />
                        </p>
                      )}
                      <span className="d-block text-grayed h6">
                        (click to select or replace with new{" "}
                        {imageDropzone ? "image" : "files"})
                      </span>
                    </>
                  )}
                </div>
              </div>
              {/* Supporting material list */}
              {previewFiles.length > 0 ? (
                <div className="supporting-materials supporting-material-preview">
                  {previewFiles.map(file => (
                    <div className={"d-flex p-2 ml-n1"}>
                      <div className="icon mr-2">
                        {imageType.includes(
                          file.name.split(".").slice(-1)[0]
                        ) ? (
                          <ImageIcon />
                        ) : (
                          <FileIcon />
                        )}
                      </div>
                      <div className="name ellipsis mr-1">{file.name}</div>
                      {isSuperAdmin() && file.fileUrl && (
                        <div className="left-align">
                          <div className="d-inline-block mr-3">
                            <a href={file.fileUrl} download={file.name}>
                              <DownloadIcon />
                            </a>
                          </div>
                          <div className="d-inline-block cursor-pointer">
                            <a onClick={() => onFileDelete(file.id)}>
                              <TrashIcon />
                            </a>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                ""
              )}
            </div>
          )}
        </Dropzone>
      </>
    );
  }
}

DragAndDropField.defaultProps = {
  name: "dropzone_name_placeholder",
  hiddenDropzone: false,
  acceptedFileTypes: ".docx, .doc, application/*, image/*, text/*",
  onFileChange: () => {
    console.log("uploadHandler");
  },
  imageDropzone: false,
  multiple: true
};

export default DragAndDropField;
