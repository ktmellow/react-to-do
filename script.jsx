var ToDoList = React.createClass({
  getInitialState: function() {
    return {    
      items: ["eat", "sleep", "relax"]
    }
  },
  addItem: function() {
    this.setState({
      items: this.state.items.concat([ReactDOM.findDOMNode(this.refs.add).value])
    })
  },
  removeItem: function(index) {
    this.setState({
      items: this.state.items.filter(function(_, i) { return i !== Number(index)})
    })
  },
  updateItem: function(index, val) {
    var newItems = this.state.items;
    newItems[index] = val;
    this.setState({
      items: newItems
    })
  },
  render: function() {
    return (
      <div>
        <h1>To Do List:</h1>
        <input ref="add" type="text"/> <button className="btn btn-large btn-success" onClick={this.addItem}>add</button>
        <ListItems items={this.state.items} removeItem={this.removeItem} updateItem={this.updateItem} />
      </div>
    )
  }
});

var ListItems = React.createClass({
  removeHandler: function(e) {
    this.props.removeItem(e.target.parentElement.id);
  },
  editItem: function(e) {
    e.target.previousSibling.previousSibling.style = 'inline';
    e.target.previousSibling.style.display = 'none';
    e.target.style.display= 'none';
    e.target.nextSibling.style.display = 'inline';
  },
  updateItem: function(e) {
    e.target.previousSibling.previousSibling.previousSibling.style.display = 'none';
    e.target.previousSibling.previousSibling.style.display = 'inline'
    e.target.previousSibling.style.display = 'inline';
    e.target.style.display= 'none';
    this.props.updateItem(e.target.parentElement.id, e.target.previousSibling.previousSibling.previousSibling.value);
  },
  render: function() {
    var listElements = this.props.items.map(function(item, index) {
      return (
      <li key={index} id={index}>
        <input onChange={this.typeItem} style={{display: "none"}} type='text' defaultValue={item} />
        <div style={{display: "inline"}}>{item}</div>
        <button className="btn btn-warning" onClick={this.editItem}>edit</button> 
        <button className="btn btn-warning" onClick={this.updateItem} style={{display: "none"}}>update</button> 
        <button className="btn btn-danger" onClick={this.removeHandler}>X</button>
      </li>
      )
    }, this);
    return (
      <ul>
        {listElements}
      </ul>
    )
  }

})

ReactDOM.render(<ToDoList />, document.getElementById('container'));