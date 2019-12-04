export const mutations = {
    store_quoteId(state, {viewMode, quoteId}) {
        state.activeQuoteId = quoteId
        state.viewMode = viewMode
    },
    store_query(state, {query}) {
        state.activeQuery = query
    },
    store_quoteClicked(state, {mode, itemId}) {
        state.activeQuoteId = itemId
        state.viewMode = mode
    },
    store_commentClicked(state, {quoteId}) {
        state.activeQuoteId = quoteId
    },
    store_session(state, {session}) {
        state.session = session
        // save to local storage
        window.localStorage.session = JSON.stringify(session);
    },
    remove_session(state) {
        state.session = undefined
        // remove from local storage
        window.localStorage.removeItem('session')
    },
    store_todos(state, {todos}) {
        state.todos = todos;
        console.log(todos);
    }
}

export default mutations
