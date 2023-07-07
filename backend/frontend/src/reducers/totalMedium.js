const totalMediumCount_state = 0;

const totalMediumCount = (state = totalMediumCount_state, action) => {
    switch (action.type) {
        case "MediumTotalIncrement": return state + 1;
        default: return state;
    }
}

export default totalMediumCount;