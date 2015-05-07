//Parent Search Component
var Search = React.createClass({
	getInitialState: function(){
		return {data: this.props.data};
	},
	updateFilter: function(filterValue){
		var initialData = this.props.data;

		//Filter the collection based on the filter value
		var results = initialData.filter( function(obj) {
            return ~obj.get('text').toLowerCase().indexOf(filterValue);
            
        });
		
		//Set the new state 		
		this.setState({
			data: results
		});
	},
	getUpdatedList: function(){
		var newPosts = this.props.refresh();
		this.setState({
			data: newPosts
		});
	},
	componentDidMount: function(){
		setInterval(this.getUpdatedList, 4000);
	},
	componentWillMount: function() {
        var socket = io.connect();
        var self = this;

        socket.on('info', function (data) {
            console.log(data);
        });
    },
	render: function(){
		return (
			<div className="search">
				<SearchBox filter={this.updateFilter} />
				<ResultsList alert={this.props.alert} data={this.state.data} />
			</div>
			);
	}
});

//Search Box Component
var SearchBox = React.createClass({
	handleChange: function(){
		var value = this.refs.query.getDOMNode().value;
		this.props.filter(value);
	},

	render: function(){
		return (<input type="text" placeholder="Filter List" ref="query" onChange={this.handleChange} />);
	}
});

//Results List Component
var ResultsList = React.createClass({

	render: function(){
		var listResults = function(post){
			return (<li className="new-post">{post.get('text')}<br /><em>{post.get('user').screen_name}</em></li>);
		};

		return (<ul onClick={this.props.alert}>{this.props.data.map(listResults)}</ul>);
	
	}
});

module.exports = Search;