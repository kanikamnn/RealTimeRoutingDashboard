/**
 * This file is made on Babel. Therefore, ES6 and latest Javascript features 
 * are supported and can be backported anytime...
 */

class MessageBox extends React.Component {

	constructor(props){
    super(props);
    this.state = {
      messages: '{ "quote": "Made it, Ma! Top of the world!", "author": "White Heat", "category": "Movies" }'
    };
  }

	componentDidMount(){
    // this is an "echo" websocket service
  	this.connection = new WebSocket('ws://localhost:3000/');
    // listen to onmessage event
    this.connection.onmessage = evt => { 
	    // add the new message to state
	  	this.setState({
	    	messages : evt.data
	    })
  	};
  }

  render() {
    var data = JSON.parse(this.state.messages);
  	return <div className="quotes">
              <div className="quote">
                <p className="text">"{data.quote}"</p>
                <p className="author">{data.author}</p>
              </div>
            </div>
  }

}

ReactDOM.render(<MessageBox/>,document.getElementById('react-body'))
