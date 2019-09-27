import React, { Component } from "react";
import originalImage from './img/originalImage.jpg';


class App extends Component {
    state = {
      pieces: [],
      shuffled: [],
      solved: []
    };
  
    componentDidMount() {
      const pieces = [...Array(35)]
        .map((_, i) => (
          {
            img: `cme_${('0' + (i + 1)).substr(-2)}.jpg`,
            order: i,
            board: 'shuffled'
          }
        ));
  
      this.setState({
        pieces,
        shuffled: this.shufflePieces(pieces),
        solved: [...Array(35)]
      });
    }
  
    handleDrop(e, index, targetName) {
      let target = this.state[targetName];
      if (target[index]) return;
  
      const pieceOrder = e.dataTransfer.getData('text');
      const pieceData = this.state.pieces.find(p => p.order === +pieceOrder);
      const origin = this.state[pieceData.board];
  
      if (targetName === pieceData.board) target = origin;
      origin[origin.indexOf(pieceData)] = undefined;
      target[index] = pieceData;
      pieceData.board = targetName;
  
      this.setState({ [pieceData.board]: origin, [targetName]: target })
    }
  
    handleDragStart(e, order) {
      const dt = e.dataTransfer;
      dt.setData('text/plain', order);
      dt.effectAllowed = 'move';
    }
  
    render() {
      return (
        <div className="jigsaw">
          <ul className="jigsaw__shuffled-board">
            {this.state.shuffled.map((piece, i) => this.renderPieceContainer(piece, i, 'shuffled'))}
          </ul>
          <div className="jigsaw__solved-board" style={{ backgroundImage: `url(${originalImage})` }}>
            {this.state.solved.map((piece, i) => this.renderPieceContainer(piece, i, 'solved'))}
          </div>
        </div>
      );
    }
  
    renderPieceContainer(piece, index, boardName) {
      return (
        <li
          key={index}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => this.handleDrop(e, index, boardName)}>
          {
            //eslint-disable-next-line 
            piece && <img
              draggable
              onDragStart={(e) => this.handleDragStart(e, piece.order)}
              src={require(`./img/${piece.img}`)} />
          }
        </li>
      );
    }
    
  
    
  
    shufflePieces(pieces) {
      const shuffled = [...pieces];
  
      for (let i = shuffled.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let tmp = shuffled[i];
        shuffled[i] = shuffled[j];
        shuffled[j] = tmp;
      }
  
      return shuffled;
    }
  }
  
  export default App