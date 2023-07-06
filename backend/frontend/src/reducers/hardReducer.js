const initialHardCount = 0;

const changeHardCount = (state = initialHardCount, action) => {
    switch (action.type) {
        case "HardCountIncrement": return state + 1;
        case "HardCountDecrement": return state - 1;
        default: return state;
    }
}

export default changeHardCount;