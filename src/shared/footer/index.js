import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { faEnvelopeOpen } from "@fortawesome/free-solid-svg-icons";
import { faPhoneAlt } from "@fortawesome/free-solid-svg-icons";
import "./style.css";
import ReactWOW from "react-wow";
export default class Footer extends Component {
  render() {
    return (
      <footer>
        <div className="container">
          <div className="row">
            <div className="col-sm">
              <ReactWOW animation='zoomIn' data-wow-duration="2s" data-wow-delay="10s">
                <div className="item">
                  <h3 className="wow slideInLeft"> Abou Us</h3>
                  <hr />
                  <p>
                    Construction SRL works as international construction
                    services company and is a leading builder in diverse and
                    numerous market segments. Lorem ipsum dolor sit amet,
                    consectetur adipiscing elit,
                  </p>
                </div>
              </ReactWOW>
            </div>
            <div className="col-sm">
              <div className="item">
                <ReactWOW animation='zoomIn' data-wow-duration="2s" data-wow-delay="20s">
                <h3>Contact Us</h3>
                <hr />
                <FontAwesomeIcon className="icon" icon={faEnvelopeOpen} />
                <span> info@construction.com</span>
                <br />
                <FontAwesomeIcon className="icon" icon={faPhoneAlt} />
                <span>(+2) 0109 835 4184</span>
                <br />
                <FontAwesomeIcon className="icon" icon={faMapMarkerAlt} />
                <span>
                  PO Box 16122, Collins Street West, Victoria 8007, United
                  States
                </span>
                </ReactWOW>
              </div>
            </div>
            <div className="col-sm">
              <div className="item">
                <ReactWOW animation='zoomIn' data-wow-duration="2s" data-wow-delay="10s">
                <h3>Information</h3>
                <hr />
                <p>
                  Construction SRL works as international construction services
                  company and is a leading builder in diverse and numerous
                  market segments. Lorem ipsum dolor sit amet, consectetur
                  adipiscing elit,
                </p>
                </ReactWOW>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}
