export const types = {
    OPEN: 'app/toast/OPEN',
    CLOSE: 'app/toast/CLOSE'
}

export const initialState = {
    toast: false
}

const reducer = (state = initialState, action: any) => {
    switch (action.type) {
        case types.OPEN:
            return {
                ...state,
                toast: true
            }
        case types.CLOSE:
            return {
                ...state,
                toast: false
            }
        default:
            return state;
    }
}

export const actions = {
    open: (item: any) => ({ type: types.OPEN, toast: { item } }),
    close: (item: any) => ({ type: types.CLOSE, toast: { item } })
}

export default reducer;