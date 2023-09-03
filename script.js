const container = document.getElementById('container')
const playerScoreDiv = document.getElementById('playerScore')
const computerScoreDiv = document.getElementById('computerScore')
const playarea = document.getElementById('playarea')
const buttons = document.getElementById('buttons');


const computerChoices = ["rock","paper","scissors"]

let defaultgameStats = {
    playerScore : 0,
    computerScore : 0,
}

const computerChoice = () =>{
     return computerChoices[Math.floor(Math.random()* computerChoices.length)]
}

const hurrayButtonMarkup = `<button onClick="hurrayPage()">NEXT</button>`
const ruleButtonMarkup =`<button id="ruleBtn" onClick="ruleBtnDisplay()">RULES</button>` 

function defaultPlayarea(){
    const markup = `
    <div class="center">
          <button class="options scissors" value="scissors" ><img src="scissors.png" /></button>  
          <button class="options rock" value="rock" ><img src="rock.png"/></button>  
          <button class="options paper" value="paper" ><img src="paper.png"/></button>  
    </div>`

    playarea.innerHTML = markup;
    buttons.innerHTML = ruleButtonMarkup;
    gameinit()
}

const playerWon = (player,computer)=>{
    const markup = `<div class='center'>
        <div class="resultCard">
        <h3>YOU PICKED</h3>
            <div class="options ${player} ripple">
                <img src="${player}.png"/>
            </div>
        </div>
        <div class="middle" >
            <h3>YOU WIN</h3>
            <p>AGAINST PC</p>
            <div>
            <button class="playBtn" onClick="defaultPlayarea()">PLAY AGAIN</button>   
        </div>
        </div>
        <div class="resultCard">
        <h3>PC PICKED</h3>
            <div class="options ${computer}">
                <img src="${computer}.png"/>
            </div>
        </div>
    </div>    
    `

    playarea.innerHTML = markup;
    buttons.insertAdjacentHTML('beforeend', hurrayButtonMarkup)
}

const computerWon = (player,computer) =>{
    const markup = `<div class='center'>
        <div class="resultCard">
        <h3>YOU PICKED</h3>
            <div class="options ${player}">
                <img src="${player}.png"/>
            </div>
        </div>
        <div class="middle" >
            <h3>YOU LOST</h3>
            <p>AGAINST PC</p>
            <div>
            <button class="playBtn" onClick="defaultPlayarea()">PLAY AGAIN</button>
        </div>
        </div>
        <div class="resultCard">
        <h3>PC PICKED</h3>
            <div class="options ${computer} ripple">
                <img src="${computer}.png"/>
            </div>
        </div>
    </div>    
    `

    playarea.innerHTML = markup;
}

const gameTie = (player,computer) =>{
    const markup = `<div class='center'>
        <div class="resultCard">
            <h3>YOU PICKED</h3>
            <div class="options ${player}">
                <img src="${player}.png"/>
            </div>
        </div>
        <div class="middle" >
            <h3>TIE UP</h3>
            <div>
            <button class="playBtn" onClick="defaultPlayarea()">REPLAY</button>
        </div>
        </div>
        <div class="resultCard">
        <h3>PC PICKED</h3>
            <div class="options ${computer}">
                <img src="${computer}.png"/>
            </div>
        </div>
    </div>    
    `

    playarea.innerHTML = markup;
}

const gamePlay = (player) =>{
    const computer = computerChoice()
    if(player===computer){
        gameTie(player,computer)
    } else if(
        (player==='rock' && computer === 'scissors') || 
        (player==='scissors' && computer === 'paper') || 
        (player==='paper' && computer === 'rock') 
    ){
        defaultgameStats.playerScore++
        playerScoreDiv.innerText = defaultgameStats.playerScore
        const gameStatsJSON = JSON.stringify(defaultgameStats)
        localStorage.setItem('gamescore',gameStatsJSON)
        playerWon(player,computer)
    } else {
        defaultgameStats.computerScore++
        computerScoreDiv.innerText = defaultgameStats.computerScore
        const gameStatsJSON = JSON.stringify(defaultgameStats)
        localStorage.setItem('gamescore',gameStatsJSON)
        computerWon(player,computer)
    }
}

const hurrayPage = () =>{
    const markup = `
        <div class="imgCont">
            <img class="stars" src="Group 5.png" />
            <img class="vector" src="Vector.png" />
        </div>

        <h1 class="hurrayheading">HURRAY!!</h1>
        <h3 class="hurraysubheading">YOU WON THE GAME</h3>
        <div class="btndiv">
        <button class="playBtn" onClick="defaultPlayarea()">PLAY AGAIN</button>
        </div>
        <div id="buttons">
            <button id="ruleBtn">Rules</button>
        </div>
        <div class="modal">
        <span id="closeModal">&times;</span>
        <h3>GAME RULES</h3>
        <ul>
            <li>Rock beats scissors, scissors beat paper, and paper beats rock.</li>
            <li>Agree ahead of time whether you'll count off “rock, paper, scissors, shoot” or just “rock, paper, scissors.”</li>
            <li>Use rock, paper, scissors to settle minor decisions or simply play to pass the time</li>
            <li>If both players lay down the same hand, each player lays down another hand</li>
        </ul>
    </div>
        `
    container.innerHTML = markup;
}


const gameinit = () =>{
    
    const playerChoices = document.querySelectorAll('.options')
    playerChoices.forEach(button=>{
    button.addEventListener("click", function(){
        const playerChoice = this.value
        gamePlay(playerChoice)
    })

    const closeModalBtn = document.getElementById('closeModal')
    const modal = document.querySelector('.modal')
    closeModalBtn.addEventListener('click', function(){
        modal.style.display = 'none';
    })

    const ruleBtn = document.getElementById('ruleBtn')
    ruleBtn.addEventListener('click',function(){
        modal.style.display = 'block';
    })
})
}

const renderScoreFirstTime = ()=>{
    const gameStats = JSON.parse(localStorage.getItem('gamescore'))
    if(gameStats){
        defaultgameStats = gameStats
    }
    playerScoreDiv.innerText = gameStats.playerScore
    computerScoreDiv.innerText = gameStats.computerScore
}

renderScoreFirstTime()
gameinit()
