export const setUserState = (payload: any) => {
    return { type: 'SET_USER_STATE', payload }
}

export const clearUserState = () => {
    return { type: 'CLEAR_USER_STATE' }
}