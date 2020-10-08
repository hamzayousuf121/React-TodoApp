import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      todos: [{ title: 'Hamza', edit: false }, { title: 'yousuf', edit: false }, { title: 'Saylani', edit: false }],
      value: '',
      editValue: '',
      filterSearch: ''
    }
  }


  handleTodoAdd = () => {
    // this.state.todos.push(this.state.value)
    if (this.state.value !== '') {
      let obj = { title: this.state.value, edit: false }
      this.setState({
        todos: [...this.state.todos, obj],
        value: ''
      })
    }
  }
  handleDelete = (index) => {
    this.state.todos.splice(index, 1)
    this.setState({
      todos: this.state.todos
    })
  }

  deleteAll = () => {
    this.setState({ todos: [], value: '', editValue: '' })
  }
  handleEdit = (index, value) => {
    // const newValue = prompt("Enter Your Update Todo Value", value)
    // this.state.todos.splice(index, 1, newValue)
    // this.setState({
    //   todos: this.state.todos;

    this.state.todos[index].edit = true;

    this.setState({
      todos: this.state.todos,
      editValue: value
    })
  }
  handleUpdate = (index) => {

    this.state.todos[index].edit = false;
    this.state.todos[index].title = this.state.editValue;

    this.setState({
      todos: this.state.todos,
      editValue: '',
    })
  }

  searchTodo = (e) => {
      const filterTodo = this.state.todos.filter(todo => todo.title.toLowerCase().includes(e.target.value.toLowerCase()))
      this.setState({
        todos: filterTodo
      })
    }


  render() {
    const { todos, value, filterSearch,editValue } = this.state;
    const filterTodo = todos.filter(todo => todo.title.toLowerCase().includes(filterSearch.toLowerCase()))
    return (
      <div className="container hoverable">
        <h1 className="heading">React Todo App</h1>
        <div className="input">
          <input type="text" placeholder="Enter Todo name" value={value} onChange={(e) => this.setState({ value: e.target.value })} />
          <button className="waves-effect waves-light btn edit" onClick={this.handleTodoAdd}>Add Todo</button>
          <button className="waves-effect waves-light btn  red lighten-1 ml-5" onClick={this.deleteAll}>Delete All Todo</button>
        </div>
        <div className="input">
        <input type="search" placeholder="Search Todo name" onChange={(e)=> this.setState({filterSearch: e.target.value})} />
        </div>
        <div className="collection hoverable">
          {filterTodo.map((item, i) => {
            return (<div href="#" key={i} className="collection-item">
              {item.edit ? <input type="text" value={editValue}
                onChange={(e) => this.setState({ editValue: e.target.value })} />
                : item.title}
              {item.edit ? 
               
                <button className="btn waves-effect waves-light edit" onClick={() => this.handleUpdate(i)}> Update </button> :
                <button className="btn waves-effect waves-light edit" onClick={() => this.handleEdit(i, item.title)}> Edit </button>}
                <button className="btn waves-effect waves-light red lighten-1" onClick={() => this.handleDelete(i)}> Delete </button>
              
            </div>
            )
          }
          )}
        </div>
      </div>
    );
  }
}

export default App;
