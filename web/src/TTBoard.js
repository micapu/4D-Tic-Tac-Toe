import React, { useState,useEffect } from 'react';


function X(lineProps){
    lineProps = lineProps.lineProps;
    return (
        <svg xmlns="http://www.w3.org/2000/svg" >
            <line  x1="10" y1="10" x2="60" y2="60"  {...lineProps} />
            <line   x1="60" y1="10" x2="10" y2="60"  {...lineProps} />
        </svg>)
}
function O(lineProps){
    lineProps = lineProps.lineProps;
    return (
        <svg  xmlns="http://www.w3.org/2000/svg">
            <circle  cx="35" cy="35" r="30" fill="none" {...lineProps} />
        </svg>)
}
function MiniX(lineProps){
    lineProps = lineProps.lineProps;
    return (
        <svg xmlns="http://www.w3.org/2000/svg" >
            <line  x1="2" y1="2" x2="12" y2="12"  {...lineProps} />
            <line   x1="12" y1="2" x2="2" y2="12"  {...lineProps} />
        </svg>)
}
function MiniO(lineProps){
    lineProps = lineProps.lineProps;
    return (
        <svg  xmlns="http://www.w3.org/2000/svg">
            <circle  cx="7" cy="7" r="6" fill="none" {...lineProps} />
        </svg>)
}
function B(lineProps){
    lineProps = lineProps.lineProps;
    return (
        <svg xmlns="http://www.w3.org/2000/svg" >
            <line  x1="35" y1="12" x2="60" y2="60"  {...lineProps} />
            <line   x1="35" y1="12" x2="10" y2="60"  {...lineProps} />
            <line   x1="12" y1="60" x2="60" y2="60"  {...lineProps} />
        </svg>)
}

function getSvg(toDisplay, lineProps){
    switch(toDisplay){
        case "X" : return (<X lineProps={lineProps}/>)
        case "O" : return (<O lineProps={lineProps}/>)
        case "B" : return  (<B lineProps={lineProps}/>)
    }
}
const standardLine = {stroke:"black", strokeWidth:"4", strokeLinecap:"round"};

function Tile(props){
    const [hover, setHover] = useState(false);
    const lineProps = hover && props.onHover !== "" && props.onHover !== undefined  ?
        {stroke:"gray", strokeWidth:"4", strokeLinecap:"round"}
        : standardLine
    ;
    const toDisplay = (hover && props.onHover) || props.display
    return (
        <div onClick={props.onClick}

             onMouseEnter={() => setHover(true)}
             onMouseLeave={() => setHover(false)}

             style={{width:'70px',height:'70px', background:'white', color:'black',
            jusifyContent:'center',
            alignContent:'center',
            margin:2,
            padding:0,
                 position:'relative'
        }}>
            {getSvg(toDisplay, lineProps)
            }
            {props.showText ?
                <p style={{margin:0, marginTop:'auto',marginBottom:'auto',display:'block',position:'absolute',
                    bottom:({
                        X:2,
                        O:'50%'
                    }[toDisplay])
                    ,right:'auto',left:'50%',transform:'translateX(-50%)',
                    textAlign: 'center',}}>
                    {props.showText}
                </p> : null
            }

        </div>
    )
}

const turnOrder = ["X","B","O","B"];

function TBoard(props){
    const {showText,metaBoard, pos:[w,x]} = props
    const {turn} = props.gameState;
    const nextMove = turnOrder[turn]
    return (<div style={{...props.style,flex:1, marginTop:10,marginBottom:10 }}>
        {
            [0,1,2].map((z)=>(
                <div key={z} style={{display:'flex',flexDirection:'row'}}>
                    {[0,1,2].map((y) => {
                        const item = props.board[y][z];
                        return (
                        <Tile showText={metaBoard[w][x][y][z].showText} display={item} key={y}
                              onHover={item==="E"?nextMove:""}
                          onClick={()=>{
                            if(item==="E"){
                                props.playMove(w,x,y,z,nextMove);
                            }
                        }} />
                    )})}
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

function allCells(){
    const cells = []
    for(var w=0; w<3; w++){
        for(var x=0; x<3; x++){
            for(var y=0; y<3; y++){
                for(var z=0; z<3; z++){
                    cells.push([w,x,y,z])
                }
            }
        }
    }
    return cells;
}

function emptyBoard(f){
    const board = [];
    for(var w=0; w<3; w++){
        board[w] = []
        for(var x=0; x<3; x++){
            board[w][x] = []
            for(var y=0; y<3; y++){
                board[w][x][y] = []
                for(var z=0; z<3; z++){
                    board[w][x][y][z] = f();
                }
            }
        }
    }
    return board;
}

function reverseVel([w,x,y,z]){
    return [-w,-x,-y,-z];
}



function inGameBounds(){
    return arguments.slice.call(arguments).every((n)=>(n>=0 && n <= 2))
}
function inVelocityBounds(){
    return arguments.slice.call(arguments).every((n)=>(n>=-1 && n <= 1))
}

function getPotentialLine(v1,v2){
    const dif = vectorSub(v2,v1);
}

function vectorSub(v1,v2){
    return [v1[0] - v2[0], v1[1] - v2[1], v1[2] - v2[2], v1[3] - v2[3]]
}

function vectorAdd(v1,v2){
    return [v1[0] + v2[0], v1[1] + v2[1], v1[2] + v2[2], v1[3] + v2[3]]
}
function possibleLines(w,x,y,z){

    function inRange(vec){
        return vec.every((x)=>(x < 3 && x >= 0))
    }

    const point = [w,x,y,z];
    const lines = []
    const seen = new Set()
    for(let w=-1;w<2;w++){
        for(let x=-1;x<2;x++){
            for(let y=-1;y<2;y++){
                linetest:for(let z=-1;z<2;z++){
                    if(w===0 && z===0 && y===0 && x===0)
                        continue;
                    const id = `${w}${x}${y}${z}`
                    const direction = [w,x,y,z];
                    const line = [point];

                    if(seen.has(id)){
                        continue;
                    }
                    seen.add(id)
                    for(let fa in [0, 1]){
                        let next = [vectorSub,vectorAdd][fa](point,direction);
                        if(inRange(next)){
                            line.push(next);
                            if(line.length === 3){
                                lines.push(line);
                                continue linetest;
                            }
                            let nextNext =  [vectorSub,vectorAdd][fa](next,direction);
                            if(inRange(nextNext)){
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

    return lines
}

function boardCopy(boardOriginal){
    const board = emptyBoard(()=>"E")
    allCells().forEach(([w,x,y,z])=>{
        board[w][x][y][z] = boardOriginal[w][x][y][z]
    })
    return board
}

class TTBoard extends React.Component {

    constructor(props) {
        super(props);

        const defaultMeta = ()=>({
            score:0
        })

        this.state = {
            board:emptyBoard(()=>("E")),
            metaBoard:emptyBoard(defaultMeta),
            gameState:{
                turn:0,
                    linesp1:0,
                linesp2:0,
            }

        }
    }

    render() {

        const {board,metaBoard,gameState} = this.state

        const {ai} = this.props

        const xs = []
        const os = []

        const currentPiece = turnOrder[this.state.gameState.turn]
        const blockingPiece = ["O","O","X","X"][this.state.gameState.turn]



        const setMeta = (w,x,y,z,key,value) => {
            this.setState((state)=>{
                state.metaBoard[w][x][y][z][key] = value
                return state
            })
        }
        const toggleTurn = (then=()=>{})=>{
            this.setState((state)=>({...state, gameState:{...state.gameState, turn:((state.gameState.turn + 1) % 4)}}),()=>{
                console.log("here now ", this.state.gameState.turn)
                then()
            })
        }


        var boardScore = (piece, blocking,board,setMetaHere=false) => {
            const currentPieces = {X:xs,O:os}[piece];
            let totalScore = 0;
            let lines = 0;
            const cellscores = {}
            const bScore = {cellscores, piece,blocking}

            var yourLines = 0
            var theirLines = 0

            let myPossibleLines = 0;
            let theirPossibleLines = 0;

            allCells().forEach((place)=>{
                var placeScore = 0;
                const linescores = []
                    const pLines = possibleLines(...place)
                pLines.forEach((line) => {
                    var sameCount = 0;
                    let blockPieces = 0;
                    let blocked = 1;
                    let themblocked = 1;
                    line.forEach(([w, x, y, z]) => {
                        const cell = board[w][x][y][z]

                        if (cell === piece && piece !== "B") {
                            sameCount += 1
                            if(sameCount > 1){
                                console.log(cell,piece,w,x,y,z)
                            }
                            themblocked = 0
                        } else if (cell === blocking) {
                            blockPieces += 1
                            blocked = 0
                        } else if (cell === "B") {
                            blocked = 0
                            themblocked = 0
                        }
                    });
                    const yourLine = sameCount * blocked;
                    const theirLine = themblocked * blockPieces;
                    var lineScore = (yourLine ** 5) - (theirLine**4)
                    if(theirLine === 3){
                        theirLines += 1
                    }
                    if(yourLine === 3){
                        yourLines += 1
                    }
                    if(lineScore > 30){
                        console.log(place,line,lineScore, piece,blockingPiece,sameCount,blockPieces,blocked,themblocked,"AAAAAAAAAAAAA")
                    }
                    if (line[0][0] === 0 && line[1][0] === 0)
                        linescores.push({lineScore, line, sameCount, blockPieces, blocked, themblocked})
                    placeScore += lineScore
                })
                cellscores[place.toString()] = {lines:linescores, placeScore}
                totalScore += placeScore
                if(setMetaHere && false)
                    setMeta(place[0],place[1],place[2],place[3],"showText",placeScore)
            })
            //console.log([lines,totalScore],bScore)
            yourLines /= 6
            theirLines /= 6
            if(setMetaHere){
                setMeta(0,0,0,0,"boardScore", totalScore)
                setMeta(0,0,0,0,"X", blocking==="O" ? yourLines : theirLines)
                setMeta(0,0,0,0,"O", blocking!=="O" ? yourLines : theirLines)

            }


            return [lines,totalScore]
        }

        var setIndex = (w,x,y,z,newItem,then=()=>{}) =>{
            console.log("SETINDEX", w,x,y,z, newItem, this.state.gameState.turn)
            if(newItem === "X"){
                xs.push([w,x,y,z])
            } else if(newItem === "O"){
                os.push([w,x,y,z])
                os.push([w,x,y,z])
            }
            this.setState((state)=>{
                state.board[w][x][y][z] = newItem
                return state
            },then)
        }

        function boardWith(placePieces){
            let boardCopyA = boardCopy(board)
            placePieces.forEach(([w,x,y,z,p])=>{
                boardCopyA[w][x][y][z] = p
            })
            return boardCopyA
        }

        function playableMoves(){
            return allCells().filter(([w,x,y,z])=>(
                board[w][x][y][z] === "E"
            ))

        }
        const bestAIMove = ()=>{
            var max = -Infinity;
            var move = null
            const turn = this.state.gameState.turn
            const currentPiece = turnOrder[turn]
            const blockingPiece = "X"
            playableMoves().forEach(([w,x,y,z])=>{
                const score = boardScore(currentPiece,blockingPiece,boardWith([[w,x,y,z,currentPiece]]),false)
                console.log(w,x,y,z,score,currentPiece)

                const [lines,moveScore] = score
                if(moveScore > max){

                    max = moveScore
                    move = [w,x,y,z]
                }
                this.setState((state)=>{
                    state.gameState[blockingPiece==="O" ?"linesp1" :"linesp2"] = lines
                })
            })
            console.log("BEST SCORE", max,move)
            return move
        }
        const takeAITurn = ()=>{
            const piece = turnOrder[this.state.gameState.turn]
            console.log("taking AI TURN for " + piece,this.state.gameState.turn)
            playMove(...bestAIMove(piece),piece)
        }



        //if(board[1][1][1][1] !== "B")
        //    setIndex(1,1,1,1,"B")
        const playMove = (w, x, y, z, newItem,then=()=>{})=>{
            console.log(w,x,y,z,newItem, "placed")
            setIndex(w,x,y,z,newItem,()=>{
                boardScore(currentPiece,blockingPiece,this.state.board,true)
                toggleTurn(()=> {
                    then()
                    console.log("turn toggled to be",this.state.gameState.turn)
                    if (ai && [2,3].includes(this.state.gameState.turn))
                        takeAITurn()
                })
            })


        }



        return (
            <div style={{flex:1, flexDirection:"row", display:"flex"}}>
                <div >
                    {
                        [0,1,2].map((x)=>(
                            <div style={{display:'flex', justifyContent:'center', flexDirection:"row"}} key={x}>
                                {
                                    [0,1,2].map( (w)=>(
                                        <TBoard {...{playMove, gameState, metaBoard}} board={board[w][x]} pos={[w,x]} {...(
                                            w===1? {style:{marginRight:10,marginLeft:10}}:{}
                                        )} key={w}/>)
                                    )
                                }
                            </div>
                        ))
                    }
                </div>
                <div style={{flex:1,display:"flex",flexDirection:"column", width:"150px"}}>
                    <div style={{display:"flex", flexDirection:"row"}}>
                        <div style={{marginLeft:"20px", marginRight:"20px"}}>
                            Current Move
                        </div>
                        <div style={{width:"70px",height:"70px",position:'relative'}}>
                            {getSvg(turnOrder[this.state.gameState.turn], {...standardLine, stroke:"white"})}
                            {turnOrder[this.state.gameState.turn] === "B" || true ?
                                <div style={{position:'absolute',right:'-23px',top:"48px", height:'25px',width:'25px'}}>
                                    {{X:<MiniX lineProps={{...standardLine, stroke:"white"}}/>,O:<MiniO lineProps={{...standardLine, stroke:"white"}}/>}[turnOrder[this.state.gameState.turn-1 % 4]]}

                                </div>
                                : null}
                        </div>
                    </div>
                    <div style={{height:"180px"}}/>
                    <div style={{display:"flex", flexDirection:"row"}}>
                        <div style={{width:"70px",height:"70px"}}>
                            {getSvg("X", {...standardLine, stroke:"white"})}
                        </div>
                        <div style={{display:"flex",marginLeft:"20px", marginRight:"20px"}}>
                <span style={{marginTop:"auto", marginBottom:"auto", textAlign:"center", fontSize:"43px"}}>
                    {metaBoard[0][0][0][0].X || 0}
                </span>
                        </div>
                    </div><div style={{display:"flex", flexDirection:"row"}}>
                    <div style={{width:"70px",height:"70px"}}>
                        {getSvg("O", {...standardLine, stroke:"white"})}
                    </div>
                    <div style={{display:"flex",marginLeft:"20px", marginRight:"20px"}}>
                <span style={{marginTop:"auto", marginBottom:"auto", textAlign:"center", fontSize:"43px"}}>
                    {metaBoard[0][0][0][0].O || 0}
                </span>
                    </div>
                </div>
                    <h2>{this.state.metaBoard[0][0][0][0].boardScore}
                    </h2>

                </div>
            </div>
        );
    }

}

export default TTBoard
