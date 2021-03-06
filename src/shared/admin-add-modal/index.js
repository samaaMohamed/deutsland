import React, { Component } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import { uploadImage } from "modules/news/services/uploadImage.service";

export default class AdminModal extends Component {
  state = {
    title: "",
    body: "",
    date: "",
    image: "",
    isImageUploading: false,
    isSubmitting: false,
    isSubmitted: false
  };

  removeImage = () => {
    this.setState({ image: "" });
  };

  formatDate = () => {
    let currentDateTime = new Date();
    let formattedDate =
      currentDateTime.getFullYear() +
      "-" +
      (currentDateTime.getMonth() + 1) +
      "-" +
      currentDateTime.getDate();

    this.setState({
      date: formattedDate
    });
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleImageInputChange = e => {
    this.setState({ isImageUploading: true });
    uploadImage(e.target.files[0]).then(res => {
      this.setState({ isImageUploading: false, image: res.data.secure_url });
    });
  };

  saveItem = e => {
    e.preventDefault();

    this.setState({
      isSubmitting: true
    });

    this.props.save(this.state).then(() => {
      this.props.updateParentState();
      this.setState({
        isSubmitting: false,
        isSubmitted: true
      });

      setTimeout(() => {
        this.setState({ isSubmitted: false, title: "", body: "", image: "" });
      }, 3000);
    });
  };

  componentDidMount() {
    this.formatDate();
  }

  render() {
    return (
      <div
        className="modal fade"
        id="addModal"
        tabIndex={-1}
        role="dialog"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add New Item</h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              {!this.state.isSubmitted ? (
                <form encType="multipart/form-data" onSubmit={this.saveItem}>
                  <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                      type="text"
                      name="title"
                      className="form-control"
                      value={this.state.title}
                      onChange={this.handleChange}
                      id="title"
                      placeholder="Add News Title"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="body">Body</label>
                    <textarea
                      name="body"
                      className="form-control"
                      onChange={this.handleChange}
                      value={this.state.body}
                      id="body"
                      rows={3}
                    />
                  </div>
                  {!this.state.image && !this.state.isImageUploading ? (
                    <div className="form-group">
                      <label htmlFor="image">Upload Image</label>
                      <input
                        type="file"
                        onChange={this.handleImageInputChange}
                        className="form-control-file"
                        id="image"
                        accept="image/*"
                      />
                    </div>
                  ) : (
                    this.state.image && (
                      <section className="img-preview">
                        <img
                          src={this.state.image}
                          className="d-block"
                          width="100%"
                          alt="Image Preview"
                        />
                        <span
                          onClick={this.removeImage}
                          className="preview-dismiss"
                        >
                          <FontAwesomeIcon icon={faTimes} />
                        </span>
                      </section>
                    )
                  )}
                  {this.state.isImageUploading ? (
                    <p>Wait for image to upload ...</p>
                  ) : (
                    ""
                  )}

                  {!this.state.isImageUploading ? (
                    <button type="submit" className="btn btn-primary">
                      {this.state.isSubmitting ? "Submitting ..." : "Save"}
                    </button>
                  ) : (
                    <button type="submit" disabled className="btn btn-primary">
                      Save
                    </button>
                  )}
                </form>
              ) : (
                <p className="alert alert-success">
                  {" "}
                  Form Submitted successfully, you can close the modal.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
