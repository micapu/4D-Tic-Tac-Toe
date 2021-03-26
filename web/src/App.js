import logo from './logo.svg';
import './App.css';
import './TTBoard'
import TTBoard from "./TTBoard";

var aoudighsaa = 0


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div style={{flex:1}}>
          <div style={{flex:1}}>
            <h1>4D Tic Tac Toe</h1>
            <h5>Battle in 2 more Ds!</h5>
          </div>
          <div>
            <TTBoard ai={true} />
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
