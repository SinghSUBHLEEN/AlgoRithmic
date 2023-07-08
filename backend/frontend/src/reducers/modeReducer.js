const initialMode = true;

const changeMediumCount = (state = initialMode, action) => {
    switch (action.type) {
        case "changeMode": return !state;
        default: return state;
    }
}

export default changeMediumCount;