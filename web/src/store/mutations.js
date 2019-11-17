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
    }
}

export default mutations
