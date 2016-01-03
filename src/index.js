import React, {Component, PropTypes} from 'react';
import Draggable from 'react-draggable';
import Resizable from 'react-resizable-box';
import assign from 'react/lib/Object.assign';

export default class Label extends Component {
  constructor(props) {
    super(props);
    this.state = {isDraggable: true};
  }

  componentDidMount() {

  }

  handleStart (event, ui) {
    console.log('Event: ', event);
    console.log('Position: ', ui.position);
  }

  handleDrag (event, ui) {
    console.dir(ui.position);
  }

  handleStop (event, ui) {
    console.log('Event: ', event);
    console.log('Position: ', ui.position);
  }

  onResizeStart() {
    this.setState({isDraggable: false});
  }

  onResizeStop() {
    this.setState({isDraggable: true});
  }

  render() {
    const {customClass, customStyle, onClick, x, y} = this.props;
    const style = {
      width: '100px',
      height: '100px',
      position: 'absolute'
    };
    return (
      <Draggable
         axis="both"
         zIndex={100}
         disabled={!this.state.isDraggable}
         onStart={this.handleStart.bind(this)}
         onDrag={this.handleDrag.bind(this)}
         onStop={this.handleStop.bind(this)} >
        <div style={{width: '100%', height: '100%', cursor: "move"}}>
          <Resizable
             onResizeStart={this.onResizeStart.bind(this)}
             onResizeStop={this.onResizeStop.bind(this)}
             width={100}
             height={100}
             customStyle={style} >
            {this.props.children}
          </Resizable>
        </div>
      </Draggable>
    );
  }
}

Label.propTypes = {
  //onClick: PropTypes.func,
  //onDoubleClick: PropTypes.func
  //width: PropTypes.number.isRequired,
  //height: PropTypes.number.isRequired
};

