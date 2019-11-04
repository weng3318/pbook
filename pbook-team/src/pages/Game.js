import React from 'react'

const Game = (props) => {
    return (
        <>
            <div style={{ width: "100vw", height: "100vh", background: "#ddd", position: "absolute", "top": "0", left: "0","zIndex":"3" }}>
                <h1>二手書配對</h1>
                <button onClick={() => props.history.push('/')}>回首頁</button>
            </div>
        </>
    )
}

export default Game