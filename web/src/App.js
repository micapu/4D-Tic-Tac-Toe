
import logo from './logo.svg';
import './App.css';
import './TTBoard';
import GameMenu from "./GameMenu";
import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import TTBoard from "./TTBoard";


function App() {
    return (
        <>
                <link rel="stylesheet"
                      href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
                      integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z"
                      crossOrigin="anonymous"/>

                <div className="App">
                    <header className="App-header">
                        <div style={{flex: 1, margin:50}}>
                            <div style={{flex: 1}}>
                                <h1 className={"text-large"}>4D Tic Tac Toe</h1>
                                <h5>Battle in 2 more Ds!</h5>
                            </div>
                        </div>
                    </header>

                    <div>
                            <TTBoard ai={true}/>
                    </div>
                </div></>
    );
}


/*

class App extends React.Component {
    render(){
        return
        /*
        return <Router>
                <Switch>
                    <Route exact path="/" render={() => (
                        <Redirect to="/items" />
                    )} />
                    <Route path="/items" component={GameMenu} />
                </Switch>
            </Router>
    }
}
*/

export default App;
