export const localDirectives = {
    directives: {
        focus: {
            // directive definition
            update: function (el, binding, vnode) {
                const {value} = binding
                if (value.isActiveQuote) {
                    el.focus()
                }
            }
        }
    }
}


export default localDirectives