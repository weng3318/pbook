import React from 'react'
import axios from 'axios'

class Game extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            myBooks: [],
            pairedMemberBooks: []
        }
    }

    componentDidMount() {
        axios.get(`http://localhost/php-api/game.php`)
            .then(res => {
                const persons = res.data
                for (var i = 0; i < persons.length; i++) {
                    // console.log(persons[i])
                    if (persons[i][0]["mb_shelveMember"] === this.props.match.params.id) {                        
                        console.log("第一組")
                        this.setState({ myBooks: persons[i][0], pairedMemberBooks: persons[i][1] })
                    } else if (persons[i][1]["mb_shelveMember"] === this.props.match.params.id) {
                        console.log("第二組");
                        this.setState({ myBooks: persons[i][1], pairedMemberBooks: persons[i][0] })
                    }
                }
            })
    }

    render() {
        const {myBooks,pairedMemberBooks} = this.state
        console.log(myBooks)
        console.log(pairedMemberBooks)
        
        return (
            <>
                <div style={{ width: "100vw", height: "100vh", background: "#ddd", position: "absolute", "top": "0", left: "0", "zIndex": "3" }}>
                    <h1>二手書配對</h1>
                    <button onClick={() => this.props.history.push('/')}>回首頁</button>
                    {/* 回首頁可能還要改 */}
                </div>
            </>
        )

    }
}

export default Game