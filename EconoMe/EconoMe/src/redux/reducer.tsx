const defaultState = {
    user: {}
}

export default function reducer(
    state = defaultState, 
    { type, payload }: { type: string, payload: any }
): any {
    switch (type) {
        case 'SET_USER_STATE':
            return {
                ...state,
                user: {
                    email: payload
                }
            }
        case 'CLEAR_USER_STATE':
            return {
                ...state,
                user: {}
            }
        default:
            return state;
    }
}