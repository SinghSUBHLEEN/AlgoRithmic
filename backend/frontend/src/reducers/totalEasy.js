const totalEasyCount_state = 0;

const totalEasyCount = (state = totalEasyCount_state, action) => {
    switch (action.type) {
        case "EasyTotalIncrement": return state + 1;
        default: return state;
    }
}

export default totalEasyCount;