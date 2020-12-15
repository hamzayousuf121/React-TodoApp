const initialState = {
    todos: [{ title: 'hamza', edit: false }, { title: 'yousuf', edit: false }, { title: 'Saylani', edit: false }],
    value: '',
    editValue: '',
    filterSearch: ''
}

export const todoReducer = (state = initialState, action) => {

    switch (action.type) {

        case 'change_todo':

            return ({
                ...state,
                value: action.payload
            })

        case 'filter_Search':

            return ({
                ...state,
                filterSearch: action.payload
            })

        case 'add_Todo':

            return ({
                ...state,
                value: '',
                todos: [...state.todos, action.payload]
            });

        case 'delete_Todo':
            const newtodos = [...state.todos]
            newtodos.splice(action.payload, 1)
            return ({

                ...state,
                todos: newtodos
            });

        case 'delete_all_todo':

            return ({
                ...state,
                todos: []
            });

        case 'setEditTodo':

            return ({
                ...state,
                editValue: action.payload
            });

        case 'edit_Todo':

            state.todos[action.payload.index].edit = true;

            return ({
                ...state,
                editValue: action.payload.item,
                todos: state.todos
            });

        case 'update_Todo':

            state.todos[action.payload.index].edit = false;
            state.todos[action.payload.index].title = state.editValue;

            return ({
                ...state,
                editValue: '',
                todos: state.todos
            });

        default:
            return state
    }
}
