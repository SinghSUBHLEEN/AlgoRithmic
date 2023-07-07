let initialEasyCount = 0;

const changeEasyCount = (state = initialEasyCount, action) => {
    switch (action.type) {
        case "EasyCountIncrement": return state + 1;
        case "EasyCountDecrement": return state - 1;
        default: return state;
    }
}

export default changeEasyCount;