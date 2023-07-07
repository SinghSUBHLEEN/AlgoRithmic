const totalHardCount_state = 0;

const totalHardCount = (state = totalHardCount_state, action) => {
    switch (action.type) {
        case "HardTotalIncrement": return state + 1;
        default: return state;
    }
}

export default totalHardCount;