import React from "react";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import { IconContext } from "react-icons";
import { MdStar } from "react-icons/md";

class MediaComment extends React.Component {
  returnDate = () => {
    var myDate = new Date(this.props.commentObj.createdAt);
    return (
      myDate.getDate() +
      "-" +
      (myDate.getMonth() + 1) +
      "-" +
      myDate.getFullYear()
    );
  };

  returnStars = () => {
    var rate = parseInt(this.props.commentObj.rate);

    switch (rate) {
      case 1:
        return (
          <h2>
            <IconContext.Provider value={{ color: "red", size: "25px" }}>
              <div style={{ marginRight: 0 }}>
                <MdStar style={{ paddingBottom: "2px" }} />
              </div>
            </IconContext.Provider>
          </h2>
        );
      case 2:
        return (
          <h2>
            <IconContext.Provider value={{ color: "red", size: "25px" }}>
              <div>
                <MdStar style={{ paddingBottom: "2px" }} />
                <MdStar style={{ paddingBottom: "2px" }} />
              </div>
            </IconContext.Provider>
          </h2>
        );
      case 3:
        return (
          <h2>
            <IconContext.Provider value={{ color: "gold", size: "25px" }}>
              <div style={{ marginRight: 0 }}>
                <MdStar style={{ paddingBottom: "2px" }} />
                <MdStar style={{ paddingBottom: "2px" }} />
                <MdStar style={{ paddingBottom: "2px" }} />
              </div>
            </IconContext.Provider>
          </h2>
        );
      case 4:
        return (
          <h2>
            <IconContext.Provider value={{ color: "gold", size: "25px" }}>
              <div style={{ marginRight: 0 }}>
                <MdStar style={{ paddingBottom: "2px" }} />
                <MdStar style={{ paddingBottom: "2px" }} />
                <MdStar style={{ paddingBottom: "2px" }} />
                <MdStar style={{ paddingBottom: "2px" }} />
              </div>
            </IconContext.Provider>
          </h2>
        );
      case 5:
        return (
          <h2>
            <IconContext.Provider value={{ color: "gold", size: "25px" }}>
              <div style={{ marginRight: 0 }}>
                <MdStar style={{ paddingBottom: "2px" }} />
                <MdStar style={{ paddingBottom: "2px" }} />
                <MdStar style={{ paddingBottom: "2px" }} />
                <MdStar style={{ paddingBottom: "2px" }} />
                <MdStar style={{ paddingBottom: "2px" }} />
              </div>
            </IconContext.Provider>
          </h2>
        );
      default:
        return <h5>Something wrong with "rate" data</h5>;
    }
  };

  render() {
    return (
      <div className="card mb-1 mt-0">
        <div className="card-header py-0 mb-0 d-flex align-items-baseline justify-content-between">
          <span> {this.returnStars()}</span>
          <span className="text-muted ">
            <strong>Posted</strong>: {this.returnDate()}
            <FaEdit className="pb-1 pl-2" size="28px" cursor="pointer" />
            <FaTrashAlt
              className="pb-1 pl-2"
              size="24px"
              cursor="pointer"
              onClick={() =>
                this.props.deleteComment(
                  this.props.commentObj.elementId,
                  this.props.commentObj.imdbID
                )
              }
            />
          </span>
        </div>
        <div className="card-body pt-1">
          <blockquote className="blockquote pt-0 mb-0 text-dark text-left">
            <strong className="pt-0" style={{ fontSize: "17px" }}>
              {this.props.commentObj.comment.charAt(0).toUpperCase() +
                this.props.commentObj.comment.slice(1)}
            </strong>

            <footer className="blockquote-footer text-left pt-2">
              {this.props.commentObj.author.charAt(0).toUpperCase() +
                this.props.commentObj.author.slice(1)}
            </footer>
          </blockquote>
        </div>
      </div>
    );
  }
}

export default MediaComment;
