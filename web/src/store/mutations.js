export const mutations = {
    store_quoteId(state, {viewMode, quoteId}) {
        state.activeQuoteId = quoteId
        state.viewMode = viewMode
    },
    store_query(state, {query}) {
        state.activeQuery = query
    },
}

export default mutations
