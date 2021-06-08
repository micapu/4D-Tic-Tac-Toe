import React, {useState, useEffect} from 'react';
import GameMenu from "./GameMenu";
import {colors, IconButton} from '@material-ui/core';
import AssignmentIcon from '@material-ui/icons/Assignment';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import {io} from "socket.io-client";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import withStyles from "@material-ui/core/styles/withStyles";
import green from "@material-ui/core/colors/green";
import Card from "@material-ui/core/Card";
import InfoIcon from '@material-ui/icons/Info';
import VisibilityIcon from '@material-ui/icons/Visibility';


function X(lineProps) {
    lineProps = lineProps.lineProps;
    return (
        <svg style={{zIndex: 100, position: "relative", height: "70px", width: "70px"}}
             xmlns="http://www.w3.org/2000/svg">
            <line x1="10" y1="10" x2="60" y2="60"  {...lineProps} />
            <line x1="60" y1="10" x2="10" y2="60"  {...lineProps} />
        </svg>)
}

function O(lineProps) {
    lineProps = lineProps.lineProps;
    return (
        <svg style={{zIndex: 100, position: "relative", height: "70px", width: "70px"}}
             xmlns="http://www.w3.org/2000/svg">
            <circle cx="35" cy="35" r="30" fill="none" {...lineProps} />
        </svg>)
}

function MiniX(lineProps) {
    lineProps = lineProps.lineProps;
    return (
        <svg xmlns="http://www.w3.org/2000/svg">
            <line x1="2" y1="2" x2="12" y2="12"  {...lineProps} />
            <line x1="12" y1="2" x2="2" y2="12"  {...lineProps} />
        </svg>)
}

function MiniO(lineProps) {
    lineProps = lineProps.lineProps;
    return (
        <svg xmlns="http://www.w3.org/2000/svg">
            <circle cx="7" cy="7" r="6" fill="none" {...lineProps} />
        </svg>)
}

function B(lineProps) {
    lineProps = lineProps.lineProps;
    return (
        <svg style={{zIndex: 100, position: "relative", height: "70px", width: "70px"}}
             xmlns="http://www.w3.org/2000/svg">
            <line x1="35" y1="12" x2="60" y2="60"  {...lineProps} />
            <line x1="35" y1="12" x2="10" y2="60"  {...lineProps} />
            <line x1="12" y1="60" x2="60" y2="60"  {...lineProps} />
        </svg>)
}

function getSvg(toDisplay, lineProps) {
    switch (toDisplay) {
        case "X" :
            return (<X lineProps={lineProps}/>)
        case "O" :
            return (<O lineProps={lineProps}/>)
        case "B" :
            return (<B lineProps={lineProps}/>)
    }
}

const standardLine = {stroke: "black", strokeWidth: "4", strokeLinecap: "round"};

function Tile(props) {
    const [hover, setHover] = useState(false);
    const lineProps = hover && props.onHover !== "" && props.onHover !== undefined ?
        {stroke: "gray", strokeWidth: "4", strokeLinecap: "round"}
        : standardLine
    ;
    const toDisplay = (hover && props.onHover) || props.display
    return (
        <div onClick={props.onClick}

             onMouseEnter={() => setHover(true)}
             onMouseLeave={() => setHover(false)}

             style={{
                 width: '70px', height: '70px', color: 'black',
                 justifyContent: 'center',
                 alignContent: 'center',
                 margin: 2,
                 padding: 0,
                 position: 'relative',
                 background: "white"
             }}>
            <div style={{
                width: "100%",
                height: "100%",
                position: "absolute",
                display: "flex",
                opacity: props.background.length > 0 ? 0.7 : 0,
                flexDirection: "row"
            }}>
                {props.background.sort().map((color) => {
                    console.log("color is", color)
                    return <div style={{background: color, flex: 1, height: "100%"}}>
                    </div>
                })}

            </div>
            {getSvg(toDisplay, lineProps)
            }
            {props.showText ?
                <p style={{
                    margin: 0, marginTop: 'auto', marginBottom: 'auto', display: 'block', position: 'absolute',
                    bottom: ({
                        X: 2,
                        O: '50%'
                    }[toDisplay])
                    , right: 'auto', left: '50%', transform: 'translateX(-50%)',
                    textAlign: 'center',
                }}>
                    {props.showText}
                </p> : null
            }

        </div>
    )
}

function createBoard() {
    return
}

function empty2DBoard(f) {
    const board = [];
    for (var y = 0; y < 3; y++) {
        board[y] = []
        for (var z = 0; z < 3; z++) {
            board[y][z] = f();
        }
    }
    return board;
}


function TBoard(props) {
    if (!props.dummyBoard) {
        var {metaBoard, pos: [w, x], board, playMove} = props
        var {turn, lastTurn} = props.gameState;
        var nextMove = turnOrder[turn]
    } else {
        var metaBoard = emptyBoard(() => ({showText: null}))
        var board = empty2DBoard(() => "E")
        props.dummyBoard.forEach(([x, y, item]) => {
            board[x][y] = item
        })
        var w = x = 0
        var turn = lastTurn = ""
        var nextMove = null
        var playMove = () => {
        }
    }
    return (<div style={{marginTop: 7, marginBottom: 7, width: 230, display: "block", ...props.style}}>
            {
                [0, 1, 2].map((z) => (
                    <div key={z} style={{display: 'flex', flexDirection: 'row'}}>
                        {[0, 1, 2].map((y) => {
                            const item = board[y][z];
                            return (
                                <Tile showText={metaBoard[w][x][y][z].showText} display={item} key={y}
                                      onHover={item === "E" ? nextMove : ""} background={
                                    (lastTurn.includes(strRep(w, x, y, z)) ?
                                        ["#FF7F7F"] : []).concat((metaBoard[0][0][0][0].colors || []).filter(([[ww, xx, yy, zz]]) => (ww === w && yy === y && zz === z && xx === x)).map(([_, color]) => (color))
                                    )}
                                      onClick={() => {
                                          if (item === "E") {
                                              playMove(w, x, y, z, nextMove);
                                          }
                                      }}/>
                            )
                        })}
                    </div>

                ))
            }
            {/*
        <div style={{display:'flex',flexDirection:'row'}}>
            <Tile display="X"/>
            <Tile display="O"/>
            <Tile display="X"/>
        </div>
        <div style={{display:'flex',flexDirection:'row'}}>
            <Tile display="O"/>
            <Tile display="B"/>
            <Tile display="O"/>
        </div>
        <div style={{display:'flex',flexDirection:'row'}}>
            <Tile display="X"/>
            <Tile display="O"/>
            <Tile display="X"/>
        </div>*/}
        </div>
    )
}

var allcells = null;

function allCells() {
    if (allcells !== null)
        return allcells
    const cells = []
    for (var w = 0; w < 3; w++) {
        for (var x = 0; x < 3; x++) {
            for (var y = 0; y < 3; y++) {
                for (var z = 0; z < 3; z++) {
                    cells.push([w, x, y, z])
                }
            }
        }
    }
    allcells = cells
    return cells;
}


function emptyBoard(f) {
    const board = [];
    for (var w = 0; w < 3; w++) {
        board[w] = []
        for (var x = 0; x < 3; x++) {
            board[w][x] = []
            for (var y = 0; y < 3; y++) {
                board[w][x][y] = []
                for (var z = 0; z < 3; z++) {
                    board[w][x][y][z] = f();
                }
            }
        }
    }
    return board;
}

function reverseVel([w, x, y, z]) {
    return [-w, -x, -y, -z];
}


function inGameBounds() {
    return arguments.slice.call(arguments).every((n) => (n >= 0 && n <= 2))
}

function inVelocityBounds() {
    return arguments.slice.call(arguments).every((n) => (n >= -1 && n <= 1))
}

function getPotentialLine(v1, v2) {
    const dif = vectorSub(v2, v1);
}

function vectorSub(v1, v2) {
    return [v1[0] - v2[0], v1[1] - v2[1], v1[2] - v2[2], v1[3] - v2[3]]
}

function vectorAdd(v1, v2) {
    return [v1[0] + v2[0], v1[1] + v2[1], v1[2] + v2[2], v1[3] + v2[3]]
}


const seenLines = {}

function strRep(w, x, y, z) {
    return `${w}${x}${y}${z}`
}

function possibleLines(w, x, y, z) {
    const key = strRep(w, x, y, z)
    if ((key in seenLines)) {
        return seenLines[key]
    }

    function inRange(vec) {
        return vec.every((x) => (x < 3 && x >= 0))
    }

    const point = [w, x, y, z];
    const lines = []
    const seen = new Set()
    for (let w = -1; w < 2; w++) {
        for (let x = -1; x < 2; x++) {
            for (let y = -1; y < 2; y++) {
                linetest:for (let z = -1; z < 2; z++) {
                    if (w === 0 && z === 0 && y === 0 && x === 0)
                        continue;
                    const id = `${w}${x}${y}${z}`
                    const direction = [w, x, y, z];
                    const line = [point];

                    if (seen.has(id)) {
                        continue;
                    }
                    seen.add(id)
                    for (let fa in [0, 1]) {
                        let next = [vectorSub, vectorAdd][fa](point, direction);
                        if (inRange(next)) {
                            line.push(next);
                            if (line.length === 3) {
                                lines.push(line);
                                continue linetest;
                            }
                            let nextNext = [vectorSub, vectorAdd][fa](next, direction);
                            if (inRange(nextNext)) {
                                line.push(nextNext);
                                lines.push(line);
                                continue linetest;
                            }
                        }
                    }
                }
            }
        }
    }
    seenLines[key] = lines
    return lines
}

function boardCopy(boardOriginal) {
    const board = emptyBoard(() => "E")
    allCells().forEach(([w, x, y, z]) => {
        board[w][x][y][z] = boardOriginal[w][x][y][z]
    })
    return board
}

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

const loadingGif = '<?xml version="1.0" encoding="utf-8"?>\n' +
    '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: rgba(255, 255, 255, 0); display: inline; shape-rendering: auto;" width="40px" height="40px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">\n' +
    '<circle cx="50" cy="50" fill="none" stroke="#ffffff" stroke-width="10" r="35" stroke-dasharray="164.93361431346415 56.97787143782138">\n' +
    '  <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform>\n' +
    '</circle>\n' +
    '<!-- [ldio] generated by https://loading.io/ --></svg>'

const turnOrder = ["X", "B", "O", "B"];


class TTBoard extends React.Component {
    componentDidMount() {
        this.emitMove = (w, x, y, z, item) => {
        }
        if (this.state.online) {
            const {gameID, name, role} = this.state
            const socket = io(window.location.host.split(":")[0] + ":9000", {query: {gameID, name, role}})
            socket.on("joined", data => {
                if (data.role !== role) {
                    this.setState({
                        opponentJoined: true,
                        yourTurn: role === "host"
                    })
                }
            });
            socket.on("already_exists", data => {
                console.log("already_exists")

            })
            socket.on("move", ({w, x, y, z, item}) => {
                if (this.state.board[w][x][y][z] !== item) {
                    this.setIndex(w, x, y, z, item)
                    this.toggleTurn()
                }
            })
            this.emitMove = (w, x, y, z, item) => {
                socket.emit("move", {w, x, y, z, item, role})
            }
        }
    }

    constructor(props) {
        super(props);
        const params = new URLSearchParams(window.location.search)
        const defaultMeta = () => ({
            score: 0
        })
        var paramstart = window.location.href.indexOf("?")
        paramstart = paramstart < 0 ? undefined : paramstart
        const gameID = window.location.href.slice(window.location.href.indexOf("/game/") + 6, paramstart)
        const meta = emptyBoard(defaultMeta)
        meta[0][0][0][0].colors = []
        const yourPiece = this.props.online && params.get("role") !== "host" ? "O" : "X"
        this.state = {
            board: emptyBoard(() => ("E")),
            metaBoard: meta,
            role: params.get("role") || "other",
            name: params.get("name"),
            yourPiece,
            blockPiece: yourPiece === "X" ? "O" : "X",
            otherName: null,
            online: this.props.online,
            gameID,
            difficulty: params.get("difficulty") || 50,
            opponentJoined: null,
            yourTurn: !this.props.online,
            gameState: {
                turn: 0,
                linesp1: 0,
                linesp2: 0,
                lastTurn: []
            }

        }
        document.title = props.title || "4D3T - Play"
    }

    gameHeader() {
        const shareLink = window.location.host + "/game/" + this.state.gameID
        if (this.props.online) {
            return <div style={{display: "flex", flexDirection: "row", flex: 1, alignItems: "center"}}>
                {this.state.opponentJoined ? `Playing Online Game as ${this.state.role === "host" ? "X" : "O"}` :
                    [<span style={{marginRight: 10}}>Waiting for opponent
                        </span>,
                        <div style={{display: "inline"}}
                             dangerouslySetInnerHTML={{__html: loadingGif}}></div>,
                        <span style={{marginLeft: "auto", marginRight: 10}}>Share the link</span>,
                        <input ref={(textarea) => this.textArea = textarea}
                               type="text" value={shareLink}
                               style={{width: 200, height: 30, fontSize: 16, borderRadius: 20}} readOnly/>,
                        <IconButton color="primary" onClick={() => {
                            this.setState({copied: true})
                            this.textArea.select()
                            document.execCommand('copy')

                        }}>
                            {!this.state.copied ? <AssignmentIcon/> : <AssignmentTurnedInIcon/>}
                        </IconButton>]
                }


            </div>
        }
        if (this.props.ai) {
            return <div style={{display: "flex", flexDirection: "row", flex: 1}}>
                <h5>
                    Playing Singleplayer Game as X with difficulty {this.state.difficulty}/100
                </h5>
            </div>
        }


    }

    render() {

        const {board, metaBoard, gameState} = this.state

        const {ai} = this.props

        const xs = []
        const os = []


        const blockOrder = ["O", "O", "X", "X"]
        const helpOrder = ["X", "X", "O", "O"]
        const blockingPiece = blockOrder[this.state.gameState.turn]


        const setMeta = (w, x, y, z, key, value) => {
            this.setState((state) => {
                state.metaBoard[w][x][y][z][key] = value
                return state
            })
        }
        const toggleTurn = (then = () => {
        }) => {
            this.setState((state) => {
                const newTurn = ((state.gameState.turn + 1) % 4)
                return {
                    ...state,
                    yourTurn: !state.online || newTurn < 2 && state.role === "host" || newTurn >= 2 && state.role === "other",
                    gameState: {...state.gameState, turn: newTurn}
                }
            }, then)
        }
        this.toggleTurn = toggleTurn

        var boardScore = (piece, helping, blocking, board, setMetaHere = false, forTheirLines, forYourLines) => {
            const currentPieces = {X: xs, O: os}[piece];
            let totalScore = 0;
            let lines = 0;
            const cellscores = {}
            const bScore = {cellscores, piece, blocking}

            var yourLines = 0
            var theirLines = 0
            const yourComplete = [];
            const theirComplete = [];
            const yourClose = [];
            const theirClose = [];

            const linescores = []
            shuffle(allCells()).forEach((place) => {
                const pLines = possibleLines(...place)
                pLines.forEach((line) => {
                    var sameCount = 0;
                    let blockPieces = 0;
                    let blocked = 1;
                    let themblocked = 1;
                    line.forEach(([w, x, y, z]) => {
                        const cell = board[w][x][y][z]
                        if (cell === helping) {
                            sameCount += 1
                            themblocked = 0
                        } else if (cell === blocking) {
                            blockPieces += 1
                            blocked = 0
                        } else if (cell === "B") {
                            blocked = 0
                            themblocked = 0
                        }
                    });
                    if (sameCount === 3)
                        yourComplete.push(line)
                    else if (sameCount === 2)
                        yourClose.push(line)
                    if (blockPieces === 3)
                        theirComplete.push(line)
                    else if (blockPieces === 2)
                        theirClose.push(line)
                    const yourLine = sameCount * blocked;
                    const theirLine = themblocked * blockPieces;
                    var lineScore = (yourLine ** 4) - (theirLine ** 4)
                    if (theirLine === 3) {
                        theirLines += 1
                        forTheirLines?.(line)
                    }
                    if (yourLine === 3) {
                        yourLines += 1
                        forYourLines?.(line)
                    }
                    if (lineScore > 30) {
                        //console.log(place, line, lineScore, piece, blockingPiece, sameCount, blockPieces, blocked, themblocked, "AAAAAAAAAAAAA")
                    }

                    //if (line[0][0] === 0 && line[1][0] === 0)
                    //    linescores.push({lineScore, line, sameCount, blockPieces, blocked, themblocked})

                    linescores.push([yourLine, theirLine])
                })
                //cellscores[place.toString()] = {lines:linescores, placeScore}
                //totalScore += placeScore
                //if(setMetaHere && false)
                //    setMeta(place[0],place[1],place[2],place[3],"showText",placeScore)
            })
            //console.log([lines,totalScore],bScore)
            yourLines /= 6
            theirLines /= 6

            if (setMetaHere) {
                setMeta(0, 0, 0, 0, "boardScore", totalScore)
                console.log(yourLines, theirLines, "set")
                setMeta(0, 0, 0, 0, "X", blocking === "O" ? yourLines : theirLines)
                setMeta(0, 0, 0, 0, "O", blocking !== "O" ? yourLines : theirLines)
                setMeta(0, 0, 0, 0, "X_close", blocking === "O" ? yourClose : theirClose)
                setMeta(0, 0, 0, 0, "O_close", blocking !== "O" ? yourClose : theirClose)
                const colors = []

                function hashCode(str) { // java String#hashCode
                    var hash = 0;
                    for (var i = 0; i < str.length; i++) {
                        hash = str.charCodeAt(i) + ((hash << 5) - hash);
                    }
                    return hash;
                }

                function intToRGB(i) {
                    const n = 8
                    return (i % (360 / n)) * n
                }

                const seenLines = new Set()
                const refreshSeen = () => {
                    seenLines.clear()
                }
                const lineCode = (line) => line.map(([w, x, y, z]) => (strRep(w, x, y, z))).sort().join("-")
                const randColor = (line) => (`hsl(${intToRGB(hashCode(lineCode(line)))}deg 100% 50%)`)//("#"+intToRGB(hashCode(lineCode(linestr))))

                const seenLine = (line) => {
                    const lineCodeStr = lineCode(line)
                    const seen = seenLines.has(lineCodeStr)
                    seenLines.add(lineCodeStr)
                    return seen
                }
                if (this.state.yourCLose)
                    yourClose.forEach((line) => {
                        if (!seenLine(line)) line.forEach(([w, x, y, z]) => {
                            if (board[w][x][y][z] === "E") {
                                colors.push([[w, x, y, z], "#FFD700"])
                            }
                        })
                    })
                refreshSeen()
                if (this.state.theirClose)
                    theirClose.forEach((line) => {
                        if (!seenLine(line)) line.forEach(([w, x, y, z]) => {
                            if (board[w][x][y][z] === "E") {
                                colors.push([[w, x, y, z], "#FF0000"])
                            }
                        })
                    })
                refreshSeen()
                if (this.state.showX)
                    (this.state.yourPiece === piece ? yourComplete : theirComplete).forEach((line) => {
                        const lineColor = randColor(line);
                        if (!seenLine(line)) line.forEach(([w, x, y, z]) => {
                            colors.push([[w, x, y, z], lineColor])
                        })
                    })
                refreshSeen()
                if (this.state.showO)
                    (this.state.yourPiece !== piece ? yourComplete : theirComplete).forEach((line) => {
                        const lineColor = randColor(line);
                        if (!seenLine(line)) line.forEach(([w, x, y, z]) => {
                            colors.push([[w, x, y, z], lineColor])
                        })
                    })
                console.log("colors is", colors)
                setMeta(0, 0, 0, 0, "colors", colors)

                /*this.setState((state)=>{
                    state.gameState[blockingPiece==="O" ?"linesp1" :"linesp2"] = lines
                })*/
            }

            totalScore = linescores.reduce((acc, [yourLine, theirLine]) => (acc + (yourLine ** (4)) - (theirLine ** (4))), 0)

            return [lines, totalScore]
        }
        // set before toggling turn!
        const setIndex = (w, x, y, z, newItem, then = () => {
        }) => {
            console.log("SETINDEX", w, x, y, z, newItem, this.state.gameState.turn)
            if (newItem === "X") {
                xs.push([w, x, y, z])
            } else if (newItem === "O") {
                os.push([w, x, y, z])
                os.push([w, x, y, z])
            }

            this.setState((state) => {
                state.board[w][x][y][z] = newItem
                return state
            }, then)
        }
        this.setIndex = setIndex

        function boardWith(board, placePieces) {
            let boardCopyA = boardCopy(board)
            placePieces.forEach(([w, x, y, z, p]) => {
                boardCopyA[w][x][y][z] = p
            })
            return boardCopyA
        }

        function playableMoves(forBoard) {
            return allCells().filter(([w, x, y, z]) => (
                forBoard[w][x][y][z] === "E"
            ))
        }

        const bestAIMove = () => {
            var max = -Infinity;
            var move = null
            const turn = this.state.gameState.turn
            const currentPiece = turnOrder[turn]
            const blockingPiece = blockOrder[turn]
            const currentSide = helpOrder[turn]
            const possibleMoves = []
            playableMoves(this.state.board).forEach(([w, x, y, z]) => {
                const score = boardScore(currentPiece, currentSide, blockingPiece, boardWith(this.state.board, [[w, x, y, z, currentPiece]]), false)
                const [lines, moveScore] = score
                possibleMoves.push({move: [w, x, y, z], score: moveScore})
                if (moveScore > max) {
                    max = moveScore
                    move = [w, x, y, z]
                }
            })
            possibleMoves.sort((a, b) => (a.score - b.score))
            const minBenefit = possibleMoves[0].score
            const maxBenefit = possibleMoves.slice(-1)[0].score
            const possibleMoveClasses = {}
            possibleMoves.forEach((m) => {
                m.score = (m.score - minBenefit) / (maxBenefit - minBenefit)
                possibleMoveClasses[m.score] = possibleMoveClasses[m.score] || []
                possibleMoveClasses[m.score].push(m)
            })
            const totalClassValue = Object.keys(possibleMoveClasses).reduce((a, b) => (Number(a) + Number(b)))
            var {difficulty} = this.state
            difficulty = Number(difficulty)
            if (difficulty > 90) {
                // To make it crystal perfect
                if (difficulty === 1) {
                    difficulty = 50
                } else {

                    difficulty += (difficulty - 0.9) * 25
                }
            }
            // My choice 0.16, beginner's choice 0.09
            const difficultyModifier = (score) => (1 / (1 + (Math.E ** (difficulty * 0.16 * (0.92 - score)))))
            console.log((1 + (Math.E ** (difficulty * 0.2 * (0.92 - 0.8)))), (difficulty * 0.2 * (0.92 - 0.8)), difficulty)
            const items = Object.keys(possibleMoveClasses).map((a) => ([(difficultyModifier(a)), possibleMoveClasses[a], a]))
            console.log(items)
            const mappedClassValue = items.map(([i]) => (i)).reduce((a, b) => (Number(a) + Number(b)))
            const probLoc = Math.random() * mappedClassValue
            let currLoc = 0
            for (let i in items) {
                const [weight, move, score] = items[i]
                currLoc += weight
                if (currLoc >= probLoc) {
                    console.log("chosen move of score", score)
                    return move[Object.keys(move)[Math.floor(Math.random() * Object.keys(move).length)]].move
                }
            }
            return move
        }
        const takeAITurn = () => {
            const piece = turnOrder[this.state.gameState.turn]
            //console.log("taking AI TURN for " + piece,this.state.gameState.turn)
            var t0 = performance.now()
            const turnLoc = bestAIMove(piece)
            console.log(`Picked move in ${performance.now() - t0} time`)
            this.setState((state) => {
                const lastTurn = this.state.gameState.lastTurn
                lastTurn.push(strRep(...turnLoc))

                if (lastTurn.length > 3) {
                    lastTurn.shift()
                }

                return state
            })
            playMove(...turnLoc, piece)
        }

        const isAITurn = (i) => {
            return ai && [2, 3].includes(i)
        }

        if (board[1][1][1][1] !== "B" && this.state.difficulty >= 20)
            setIndex(1, 1, 1, 1, "B")
        const playMove = (w, x, y, z, newItem, then = () => {
        }) => {
            if (!this.state.yourTurn) {
                return
            }
            setIndex(w, x, y, z, newItem, () => {
                toggleTurn(() => {
                    const turn = this.state.gameState.turn
                    boardScore(turnOrder[turn], helpOrder[turn], blockOrder[turn], this.state.board, true)
                    then()
                    if (isAITurn(turn))
                        takeAITurn()
                    if (this.state.online)
                        this.emitMove(w, x, y, z, newItem)

                })
            })


        }
        const reMeasure = () => {
            boardScore(this.state.yourPiece, this.state.yourPiece, this.state.blockPiece, board, true)
        }

        return (
            <div style={{flexDirection: "column", display: "flex"}}>
                <div style={{marginBottom: 20}}>{this.gameHeader()}</div>
                <div style={{flex: 1, flexDirection: "row", display: "flex"}}>
                    <div style={{display: "flex", flexDirection: "column", flex: 1}}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    onChange={(state) => {
                                        this.setState({yourCLose: state.target.checked}, reMeasure)
                                    }}
                                    name="checkedB"
                                    color="primary"
                                />
                            }
                            label="Show your close lines"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    onChange={(state) => {
                                        this.setState({theirClose: state.target.checked}, reMeasure)
                                    }}
                                    color="secondary"
                                />
                            }
                            label="Show enemy close lines"
                        />

                    </div>
                    <div>
                        {
                            [0, 1, 2].map((x) => (
                                <div style={{display: 'flex', justifyContent: 'center', flexDirection: "row"}} key={x}>
                                    {
                                        [0, 1, 2].map((w) => (
                                            <TBoard {...{playMove, gameState, metaBoard}} board={board[w][x]}
                                                    pos={[w, x]} {...(
                                                w === 1 ? {style: {marginRight: 7, marginLeft: 7}} : {}
                                            )} key={w}/>)
                                        )
                                    }
                                </div>
                            ))
                        }
                    </div>
                    <div style={{flex: 1, display: "flex", flexDirection: "column", width: "150px"}}>
                        <div style={{display: "flex", flexDirection: "row"}}>
                            <h4 style={{marginLeft: "20px", marginRight: "20px"}}>
                                Current Move
                            </h4>
                            <div style={{width: "70px", height: "70px", position: 'relative'}}>
                                {getSvg(turnOrder[this.state.gameState.turn], {...standardLine, stroke: "white"})}
                                {turnOrder[this.state.gameState.turn] === "B" || true ?
                                    <div style={{
                                        position: 'absolute',
                                        right: '-23px',
                                        top: "48px",
                                        height: '25px',
                                        width: '25px'
                                    }}>
                                        {{
                                            X: <MiniX lineProps={{...standardLine, stroke: "white"}}/>,
                                            O: <MiniO lineProps={{...standardLine, stroke: "white"}}/>
                                        }[turnOrder[this.state.gameState.turn - 1 % 4]]}

                                    </div>
                                    : null}
                            </div>
                        </div>
                        <h4>{this.currentMoveName()}</h4>

                        <div style={{height: "180px"}}/>
                        <Card onMouseEnter={() => {
                            this.setState({showX: true}, reMeasure)
                        }} onMouseLeave={() => {
                            this.setState({showX: false}, reMeasure)
                        }} raised={true}>

                            <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                                <div style={{width: "70px", height: "70px"}}>
                                    {getSvg("X", {...standardLine, stroke: "black"})}
                                </div>
                                <div style={{display: "flex", marginLeft: "20px", marginRight: "20px"}}>
                <span style={{
                    marginTop: "auto",
                    marginBottom: "auto",
                    textAlign: "center",
                    fontSize: "43px",
                    justifyContent: "center"
                }}>
                    {
                        metaBoard[0][0][0][0].X || 0
                    }
                </span>
                                </div>
                                {
                                    metaBoard[0][0][0][0].X || 0 !== 0 ? <VisibilityIcon/> : null
                                }
                            </div>
                        </Card>
                        <br/>
                        <Card onMouseEnter={() => {
                            this.setState({showO: true}, reMeasure)
                        }} onMouseLeave={() => {
                            this.setState({showO: false}, reMeasure)
                        }} raised={true}>

                            <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                                <div style={{width: "70px", height: "70px"}}>
                                    {getSvg("O", {...standardLine, stroke: "black"})}
                                </div>
                                <div style={{display: "flex", marginLeft: "20px", marginRight: "20px"}}>
                <span style={{marginTop: "auto", marginBottom: "auto", textAlign: "center", fontSize: "43px"}}>
                    {metaBoard[0][0][0][0].O || 0}
                </span>
                                </div>
                                {
                                    metaBoard[0][0][0][0].O || 0 !== 0 ? <VisibilityIcon/> : null
                                }
                            </div>

                        </Card>

                    </div>
                </div>
            </div>
        );
    }

    currentMoveName() {
        if (this.state.yourTurn) {
            if (this.state.gameState.turn === 1 || this.state.gameState.turn === 3)
                return "Place your block"
            else return "Place your piece"
        } else {
            if (this.state.gameState.turn === 1 || this.state.gameState.turn === 3)
                return "Enemy placing block"
            else return "Enemy placing piece"
        }
    }
}

export {TTBoard, TBoard}
