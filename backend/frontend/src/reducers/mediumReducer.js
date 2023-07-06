const initialMediumCount = 0;

const changeMediumCount = (state = initialMediumCount, action) => {
    switch (action.type) {
        case "MediumCountIncrement": return state + 1;
        case "MediumCountDecrement": return state - 1;
        default: return state;
    }
}

export default changeMediumCount;