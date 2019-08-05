import React from "react";
import { Media } from "reactstrap";
import { IconContext } from "react-icons";
import { MdStar } from "react-icons/md";

class MediaComment extends React.Component {
  returnStars = () => {
    var rate = this.props.commentObj.rate;

    switch (rate) {
      case 1:
        return (
          <h2>
            <IconContext.Provider value={{ color: "red", size: "40px" }}>
              <div style={{ marginRight: 0 }}>
                <MdStar style={{ paddingBottom: "2px" }} />
              </div>
            </IconContext.Provider>
          </h2>
        );
      case 2:
        return (
          <h2>
            <IconContext.Provider value={{ color: "red", size: "40px" }}>
              <div>
                Rating: <MdStar style={{ paddingBottom: "2px" }} />
                <MdStar style={{ paddingBottom: "2px" }} />
              </div>
            </IconContext.Provider>
          </h2>
        );
      case 3:
        return (
          <h2>
            <IconContext.Provider value={{ color: "gold", size: "40px" }}>
              <div style={{ marginRight: 0 }}>
                Rating: <MdStar style={{ paddingBottom: "2px" }} />
                <MdStar style={{ paddingBottom: "2px" }} />
                <MdStar style={{ paddingBottom: "2px" }} />
              </div>
            </IconContext.Provider>
          </h2>
        );
      case 4:
        return (
          <h2>
            <IconContext.Provider value={{ color: "gold", size: "40px" }}>
              <div style={{ marginRight: 0 }}>
                Rating: <MdStar style={{ paddingBottom: "2px" }} />
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
            <IconContext.Provider value={{ color: "gold", size: "40px" }}>
              <div style={{ marginRight: 0 }}>
                Rating: <MdStar style={{ paddingBottom: "2px" }} />
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

    /*  return <h1><IconContext.Provider value={{ color: this.props.commentObj.rate >2 ? "gold" : "red", size:"40px"}}>
  <div style={{marginRight:0}}>
  Rating: {this.props.commentObj.rate}<MdStar style={{paddingBottom:"2px"}}/>
  </div>
</IconContext.Provider> 
</h1> */
  };

  render() {
    return (
      <Media left>
        {this.returnStars()}
        <Media className="bg-info py-2 px-2" body>
          <h4 className="text-white">{this.props.commentObj.comment}</h4>
        </Media>
      </Media>
    );
  }
}

export default MediaComment;
