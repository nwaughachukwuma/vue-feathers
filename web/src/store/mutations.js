export const mutations = {
    store_quoteId(state, {quoteId}) {
        state.activeQuoteId = quoteId
    },
    store_query(state, {query}) {
        state.activeQuery = query
    },
}

export default mutations
