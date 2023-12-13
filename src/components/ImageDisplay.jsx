import * as React from "react";

class GameItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="image-div">
        <img src={this.props.value.image} alt="" />
      </div>
    );
  }
}

export default GameItem;
