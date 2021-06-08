import React, {useState, useEffect} from 'react';
import {Button, TextField, Input, Slider, withStyles} from '@material-ui/core';
import Carousel from 'react-bootstrap/Carousel'
import {TBoard} from "./TTBoard";
import cube1 from './3dLine.png';
import cube2 from './3dline21.png';
import cube41 from './4d1.png';
import cube42 from './4d2.png';
import cube43 from './4d3.png';
const axios = require('axios');


function getEndpoint(point) {
    return `${point}`
}

const CustomSlider = withStyles({
    root: {
        color: "#6f8eff",
        height: 3,
        padding: "13px 0",
    },
    track: {
        height: 4,
        borderRadius: 2,
    },
    markLabel:{
        color:"gray"
    },
    markLabelActive:{
        color:"white"
    },
    thumb: {
        height: 20,
        width: 20,
        backgroundColor: "#fff",
        border: "1px solid currentColor",
        marginTop: -9,
        marginLeft: -11,
        boxShadow: "#ebebeb 0 2px 2px",
        "&:focus, &:hover, &$active": {
            boxShadow: "#ccc 0 2px 3px 1px",
        },
        color: "#fff",
    },
})(Slider);

class GameItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hovering: false
        }
    }

    render() {
        var [gameName, _] = this.props.data
        return <div style={{
            width: 500,
            height: 100,
            cursor: 'pointer',
            background: (!this.state.hovering ? "#8558b7" : '#b590de'),
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center'
        }}
                    onMouseEnter={() => {
                        this.setState({hovering: true})
                    }}
                    onMouseLeave={() => {
                        this.setState({hovering: false})
                    }}
            //onClick={/*this.props.joinGame(gameName)*/}
        >
            <p style={{flex: 1, textAlign: 'left', marginLeft: 10}}>{gameName}</p>
            <svg style={{width: 100, height: 80}} id="Capa_1" enable-background="new 0 0 512 512" height="512"
                 viewBox="0 0 512 512" width="512" xmlns="http://www.w3.org/2000/svg">
                <g>
                    <path
                        d="m437.02 74.98c-48.353-48.351-112.64-74.98-181.02-74.98s-132.667 26.629-181.02 74.98c-48.351 48.353-74.98 112.64-74.98 181.02s26.629 132.667 74.98 181.02c48.353 48.351 112.64 74.98 181.02 74.98s132.667-26.629 181.02-74.98c48.351-48.353 74.98-112.64 74.98-181.02s-26.629-132.667-74.98-181.02zm-181.02 407.02c-124.617 0-226-101.383-226-226s101.383-226 226-226 226 101.383 226 226-101.383 226-226 226z"/>
                    <path
                        d="m374.782 243.84-180-130c-4.566-3.298-10.596-3.759-15.611-1.195s-8.171 7.722-8.171 13.355v260c0 5.633 3.156 10.791 8.171 13.355 2.154 1.102 4.495 1.645 6.827 1.645 3.097 0 6.179-.958 8.784-2.84l180-130c3.904-2.82 6.218-7.344 6.218-12.16s-2.312-9.34-6.218-12.16zm-173.782 112.824v-201.328l139.381 100.664z"/>
                </g>
            </svg>
        </div>
    }
}

const btnStyle = {padding: 20, borderRadius: "20px", flex: 1, margin: 10}

function PlayButton(props){
    return <Button {...props} style={{...btnStyle, margin: 0, marginTop: 10, padding: 2}}
                   onClick={() => {
                       window.location.href = props.href
                   }}>Start Game</Button>
}
/*

    const {showText, metaBoard, pos: [w, x]} = props
    const {turn, lastTurn} = props.gameState;
    const nextMove = turnOrder[turn]
 */
//<Button onClick={props.onBack} style={{display:"inline",color:"white"}}> Back </Button>
function HowToPlay(props){
    return <div style={{width:800}}>
        <Button style={{color:"white"}} onClick={props.return}>Back</Button>
        <Carousel style={{width:800,padding:40}} interval={null} wrap={false} >
            <Carousel.Item>
                The concept of a line in is that for a set of points which form a line: A,B,C <br/><br/> A->B = B->C<br/>
                <TBoard style={{marginLeft:"auto",marginRight:"auto",marginTop:30}} dummyBoard={[[0,0,"X"],[1,1,"X"],[2,2,"X"]]} />
                <h4>
                    To get from the top left X to the middle, you must <br/> "Go down one cell and go right one cell".<br/><br/> You apply the same rule to get from the middle to the bottom right corner
                </h4>
            </Carousel.Item>
            <Carousel.Item>
                <h3>Let's make a line in 3D!</h3>
                <div style={{display:"flex",flexDiretion:"row",marginTop:20}}>
                    <TBoard style={{margin:"auto",width:300,display:"block"}} dummyBoard={[[0,2,"X"]]} />
                    <TBoard style={{margin:"auto",width:300,display:"block"}} dummyBoard={[[0,2,"X"]]} />
                    <TBoard style={{margin:"auto",width:300,display:"block"}} dummyBoard={[[0,2,"X"]]} />
                </div>
                <br/>
                <p style={{fontSize:26}}>
                    3D is played with 3 boards. To understand why this is a line you can apply the earlier rule.<br/><br/>
                    To get from (1)->(2) and (2)->(3), we go 0 cells down, 0 cells right and 1 board rightwards. That's 3 directions we keep track of so 3D.

                </p>
            </Carousel.Item>
            <Carousel.Item>
                <h2>Or equivalently, envision the layers stacking on top of each-other to make a cube</h2>
                <img src={cube1}/>
            </Carousel.Item>
            <Carousel.Item>
                <h3>How about another!</h3>
                <div style={{display:"flex",flexDiretion:"row",marginTop:20}}>
                    <TBoard style={{margin:"auto",width:300,display:"block"}} dummyBoard={[[0,2,"X"]]} />
                    <TBoard style={{margin:"auto",width:300,display:"block"}} dummyBoard={[[1,2,"X"]]} />
                    <TBoard style={{margin:"auto",width:300,display:"block"}} dummyBoard={[[2,2,"X"]]} />
                </div>
                <br/>
                <img src={cube2}/>
            </Carousel.Item>
            <Carousel.Item>
                <h3>Anything that's a line in 2D, is still a line in 3D</h3>
                <div style={{display:"flex",flexDiretion:"row",marginTop:20}}>
                    <TBoard style={{margin:"auto",width:300,display:"block"}} dummyBoard={[[0,2,"X"],[0,1,"X"],[0,0,"X"],]} />
                    <TBoard style={{margin:"auto",width:300,display:"block"}} dummyBoard={[[1,2,"X"]]} />
                    <TBoard style={{margin:"auto",width:300,display:"block"}} dummyBoard={[[2,2,"X"]]} />
                </div>
            </Carousel.Item>
            <Carousel.Item>
                <h3> That's the most of it! 4D is a simple extension. <br/><br/>It is played on 9 boards - or better thought of as a "board of boards"
                </h3>
            </Carousel.Item>
            <Carousel.Item>
                <h4>
                    This is a line in 4D. In each step, we are
                </h4>
                <h5>
                Going down one cell, Going right one cell, Going down one board, Going right one board
                </h5>
                <img src={cube41} />
            </Carousel.Item>

            <Carousel.Item>
                <h3>A second way to think about it is to try and take a "line of boards" ie. the top three boards, the side boards or each diagonal line of boards.
                    <br/><br/> For each possible line of boards we can extract, we apply the earlier 3D rules as if they are stacked on top of eachother.
                    <br/><br/> If we take the diagonal of boards from the previous example, we end up with the following 3D board.<br/><br/>
                    <img src={cube42}/>
                </h3>
            </Carousel.Item>
            <Carousel.Item>
                <h4>Some lines in 4D can be hard to spot.
                    <br/> Here are 4 color coded example lines on a single board.
                    <img src={cube43}/>
                </h4>
            </Carousel.Item>
            <Carousel.Item>
                <h3>What else is different?</h3>
                <h4>We don't stop when someone has a line, we keep a score of the number of lines and count them at the end to find the winner.</h4>
                <h4>Every turn, as well as playing a piece, you also play a block piece. The shape for this piece is a triangle. Nobody can make a line with a triangle inside.</h4>
            </Carousel.Item>
            <Carousel.Item>
                <h3>Advice</h3>
                <h4>Not all cells are equal by a long shot. The corners cells are powerful in the corner boards, the side cells are powerful in the side boards.</h4>
                <h4>The middle is <b>powerful</b>. It starts off as a block piece in multiplayer and on normal difficulty. All 81 cells can form a line with it.</h4>
                <h4>Allowing yourself to make 2 lines next turn can still both be blocked by a perceptive opponent on their turn using a block piece. Line up 3 at a time.</h4>
                <Button variant="contained" onClick={props.return}>I'm Ready</Button>
            </Carousel.Item>
        </Carousel>

    </div>
}

class GameMenu extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            games: [],
            creating: false,
            name: "",
            difficulty:50
        }
        this.getGames()
    }

    getGames() {
        fetch(getEndpoint('games/'))
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result)
                    this.setState((state) => {
                        state.games = result
                        return state
                    })
                },
                (error) => {

                }
            )
    }

    joinGame(gameName) {
        axios.post(getEndpoint('games/'), {
            gameName
        })
            .then(response => {
                //this.props.joinedGame(gameName)
                this.setState({gameName})
            });

    }

    render() {
        console.log(this.state)
        const difficultyMarks = [
            {
                value:0,
                label:'Random'
            },
            {
                value:25,
                label:'Easy'
            },
            {
                value:50,
                label:'Challenging'
            },
            {
                value:75,
                label:'Experienced'
            },
            {
                value:100,
                label:'Impossible'
            },
        ]
        return <div>
            {
                this.state.creating ?
                    <div>
                    <Button onClick={()=>{this.setState({creating:false})}} style={{marginBottom:20, color:"white"}}> Back </Button>
                        {this.state.singleplayer ? <div style={{display:"flex",flexDirection:"column"}}>
                                <CustomSlider
                                    style={{width:400,display:"block"}}
                                    defaultValue={50}
                                    aria-labelledby="discrete-slider-small-steps"
                                    step={1}
                                    min={0}
                                    marks={difficultyMarks}
                                    max={100}
                                    onChange={(event, difficulty) => {
                                        this.setState({difficulty})
                                    }}
                                    valueLabelDisplay="auto"
                                />
                                <Button variant="contained" color="primary"  style={{...btnStyle, margin: 0, marginTop: 10, padding: 2}}
                                        onClick={() => {
                                            window.location.href = `singleplayer?difficulty=${this.state.difficulty}`
                                        }}>Start Game</Button>

                        </div>


                            :  <div style={{display: "flex", flexDirection: "column", background: "white", borderRadius: 20}}>

                            <PlayButton href={`/game/${Math.floor(Math.random() * 10000000)}?role=host&name=${this.state.name}`}/>
                        </div>}
                   </div>
                    : this.state.howtoplay  ? <HowToPlay return={()=>{this.setState({howtoplay:false})}} />: <div style={{flexDirection: "column", display: 'flex'}}>

                        <Button style={btnStyle} variant="contained" color="primary" onClick={()=>{this.setState({creating:true,singleplayer:true})}}>
                            Play Alone
                        </Button>
                        <Button style={btnStyle} variant="contained" color="primary" onClick={()=>{window.location.href = `/game/${Math.floor(Math.random() * 10000000)}?role=host`}} style={btnStyle}>
                            Create Online Game
                        </Button>
                        <Button style={btnStyle} variant="contained" color="primary" onClick={()=>{this.setState({howtoplay:true})}} style={btnStyle}>
                            How to Play
                        </Button>
                    </div>
            }
            <div style={{display: 'flex', flexDirection: 'column'}}>
                {
                    this.state.games.map((data) => {
                        return <GameItem data={data} joinGame={this.joinGame()}/>
                    })
                }
            </div>
        </div>
    }
}

export default GameMenu
