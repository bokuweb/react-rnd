import React, {Component, PropTypes} from 'react';
import assign from 'react/lib/Object.assign';

export default class Label extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  render() {
    const {customClass, customStyle, onClick} = this.props;
    const style = {
      width: '100px',
      height: '100px',
      background: '#333'
    };
    return (
      <div
        className={customClass}
        style={assign({}, customStyle, style)}
        onClick={onClick} >
        {this.props.children}
      </div>
    );
  }
}

Label.propTypes = {
  onClick: PropTypes.func,
  onDoubleClick: PropTypes.func
  //width: PropTypes.number.isRequired,
  //height: PropTypes.number.isRequired
};

