import React, { useState,useEffect } from 'react';

const axios = require('axios');



function  getEndpoint(point){
    return `${point}`
}

class GameItem extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            hovering:false
        }
    }

    render() {
        var [gameName,_] = this.props.data
        return <div style={{width:500,height:100,cursor:'pointer',background:(!this.state.hovering ? "#8558b7":'#b590de'),display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}}
                    onMouseEnter={()=>{
                        this.setState({hovering:true})
                    }}
                    onMouseLeave={()=>{
                        this.setState({hovering:false})
                    }}
                    //onClick={/*this.props.joinGame(gameName)*/}
        >
            <p style={{flex:1,textAlign:'left',marginLeft:10}}>{gameName}</p>
            <svg style={{width:100,height:80}} id="Capa_1" enable-background="new 0 0 512 512" height="512" viewBox="0 0 512 512" width="512" xmlns="http://www.w3.org/2000/svg"><g><path d="m437.02 74.98c-48.353-48.351-112.64-74.98-181.02-74.98s-132.667 26.629-181.02 74.98c-48.351 48.353-74.98 112.64-74.98 181.02s26.629 132.667 74.98 181.02c48.353 48.351 112.64 74.98 181.02 74.98s132.667-26.629 181.02-74.98c48.351-48.353 74.98-112.64 74.98-181.02s-26.629-132.667-74.98-181.02zm-181.02 407.02c-124.617 0-226-101.383-226-226s101.383-226 226-226 226 101.383 226 226-101.383 226-226 226z"/><path d="m374.782 243.84-180-130c-4.566-3.298-10.596-3.759-15.611-1.195s-8.171 7.722-8.171 13.355v260c0 5.633 3.156 10.791 8.171 13.355 2.154 1.102 4.495 1.645 6.827 1.645 3.097 0 6.179-.958 8.784-2.84l180-130c3.904-2.82 6.218-7.344 6.218-12.16s-2.312-9.34-6.218-12.16zm-173.782 112.824v-201.328l139.381 100.664z"/></g></svg>
        </div>
    }
}



class GameMenu extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            games:[],
            creating:false
        }
        this.getGames()
    }

    getGames(){
        fetch(getEndpoint('games/'))
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result)
                    this.setState((state)=>{
                        state.games = result
                        return state
                    })
                },
                (error) => {

                }
            )
    }

    joinGame(gameName){
        axios.post(getEndpoint('games/'), {
            gameName
        })
            .then(response =>{
                //this.props.joinedGame(gameName)
                this.setState({gameName})
            } );

    }

    render() {
        console.log(this.state)
        return <div>
            {
                this.state.creating ?
                    <form action="/games">
                        <input type="text" id="fname" name="fname"/>
                        <input type={"submit"} value={"Submit"}/>
                    </form>
                    :
                <button onClick={()=>{
                this.setState((state)=>({...state, creating:true}))}
                } style={{marginBottom:30, width:180,height:60}}>
                    Create Game
                </button>
            }

            <div style={{display:'flex' ,flexDirection:'column'}}>
            {
                this.state.games.map((data)=>{
                    return <GameItem data={data} joinGame={this.joinGame()}/>
                })
            }
        </div></div>
    }
}

export default GameMenu
