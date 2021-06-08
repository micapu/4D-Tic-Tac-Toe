
import './App.css';
import {TTBoard,TBoard} from "./TTBoard"
import GameMenu from "./GameMenu";
import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import { Button } from '@material-ui/core';


function App() {
    return (
            <Router>
                <link rel="stylesheet"
                      href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
                      integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z"
                      crossOrigin="anonymous"/>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />

                <div className="App">
                    <div style={{display:'flex', margin:50}}>
                        <div style={{flex: 1}}>
                            <h1 className={"text-large"}>4D Tic Tac Toe</h1>
                            <h5>Battle your friends in 2 more Ds!</h5>
                        </div>
                    </div>

                    <div style={{flex: 1}}>
                        <Switch>
                            <Route path={'/game/:id'} component={()=>(<TTBoard ai={false} online={true} title={"Online Game"}/>)}/>
                            <Route path={'/singleplayer/'} component={()=>(<TTBoard ai={true} title={"Singleplayer"}/>)}/>
                            <Route path={'/'} component={GameMenu}/>
                        </Switch>
                    </div>
                </div>
            </Router>
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
