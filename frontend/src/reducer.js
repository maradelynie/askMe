const INITIAL_STATE = {
    categoryId : "",
    categoryName : ""
    
}

function reducer(state = INITIAL_STATE, action){
    switch (action.type) {
        case "SET_CATEGORYNAME":
            
            return {
                ...state,
                categoryId: action.value
            }
            case "SET_CATEGORYID":
            
            return {
                ...state,
                categoryName: action.value
            }
                    
    
        default:
            return state
    }
    
}

export default reducer;