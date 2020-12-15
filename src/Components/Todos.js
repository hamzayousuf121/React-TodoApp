import React from 'react';
import { connect, useDispatch } from 'react-redux';
import './todos.css';

const App = (props) => {

    const dispatch = useDispatch()

    const add_todo = () => {
        if (props.item !== '' && props.item !== ' ') {
            let obj = { title: props.item, edit: false }
            dispatch({ type: 'add_Todo', payload: obj })
        }
    }

    const handleTodo = (e) => {
        dispatch({ type: 'change_todo', payload: e.target.value })
    }

    const delete_all_todo = (e) => {
        dispatch({ type: 'delete_all_todo' })
    }

    const delete_todo = (index) => {
        dispatch({ type: 'delete_Todo', payload: index })
    }
    const setSearchValue = (e) => {
        dispatch({ type: 'filter_Search', payload: e.target.value })
    }

    const setEditTodo = (item) => {
        dispatch({ type: 'setEditTodo', payload: item })
    }

    const editTodo = (index, item) => {
        dispatch({ type: 'edit_Todo', payload: { index, item } })
    }
    const updateTodo = (index) => {
        dispatch({ type: 'update_Todo', payload: { index } })
    }

    const { todos, item, filterSearch, editValue } = props;
    const filterTodo = todos.filter(todo => todo.title.toLowerCase().includes(filterSearch.toLowerCase()))
    return (
        <div className="container hoverable">
            <h1 className="heading">React Todo App</h1>
            <div className="formField">
            <div className="input">
                <input type="text" placeholder="Enter Todo name"
                    value={item}
                    onChange={handleTodo}
                />
                </div>
                <div className="buttons">
                <button className="waves-effect waves-light btn edit" onClick={add_todo}>Add Todo</button>
                <button className="waves-effect waves-light btn red lighten-1 ml-5" onClick={delete_all_todo}>Delete All Todo</button>
            </div>
            </div>
            <div className="input">
                <input type="search" placeholder="Search Todo name" value={filterSearch}
                    onChange={setSearchValue} />
            </div>
            <div className="collection hoverable">
                {filterTodo.map((item, i) => {
                    return (<div key={i} className="collection-item">
                        {item.edit ? <input type="text" value={editValue}
                            onChange={(e) => setEditTodo(e.target.value)} />
                            : item.title}
                        {item.edit ?

                            <button className="btn waves-effect waves-light edit" onClick={() => updateTodo(i)}> Update </button> :
                            <button className="btn waves-effect waves-light edit" onClick={() => editTodo(i, item.title)}> Edit </button>}
                            <button className="btn waves-effect waves-light red lighten-1" onClick={() => delete_todo(i)}> Delete </button>

                    </div>
                    )
                })
                }
            </div>
        </div>
    );
}


const mapStateToProps = (state) => {
    return {
        todos: state.todos,
        item: state.value,
        editValue: state.editValue,
        filterSearch: state.filterSearch
    }
}


export default connect(mapStateToProps)(App);
