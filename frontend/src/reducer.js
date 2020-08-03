const INITIAL_STATE = {
    test: "teste",
    testeee: "initial"
}

function reducer(state = INITIAL_STATE, action){
    switch (action.type) {
        case "DOIT":
            
            return {
                ...state,
                test:"mara"
            }
    
        default:
            return state
    }
    
}

export default reducer;