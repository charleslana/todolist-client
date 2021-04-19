export const types = {
    OPEN: 'app/loading/OPEN',
    CLOSE: 'app/loading/CLOSE'
}

export const initialState = {
    loading: false
}

const reducer = (state = initialState, action: any) => {
    switch (action.type) {
        case types.OPEN:
            return {
                ...state,
                loading: true
            }
        case types.CLOSE:
            return {
                ...state,
                loading: false
            }
        default:
            return state;
    }
}

export const actions = {
    open: (item: any) => ({ type: types.OPEN, loading: { item } }),
    close: (item: any) => ({ type: types.CLOSE, loading: { item } })
}

export default reducer;