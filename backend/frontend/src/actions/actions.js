export const incrementEasyCount = () => {
    return {
        type: "EasyCountIncrement",

    }
}

export const incrementMediumCount = () => {
    return {
        type: "MediumCountIncrement",

    }
}

export const incrementHardCount = () => {
    return {
        type: "HardCountIncrement",

    }
}
export const changeMode = () => {
    return {
        type: "changeMode",
    }
}

export const decrementEasyCount = () => {
    return {
        type: "EasyCountDecrement",

    }
}

export const decrementMediumCount = () => {
    return {
        type: "MediumCountDecrement",

    }
}

export const decrementHardCount = () => {
    return {
        type: "HardCountDecrement",

    }
}

export const totalHardCount = () => {
    return {
        type: "HardTotalIncrement",

    }
}

export const totalMediumCount = () => {
    return {
        type: "MediumTotalIncrement",

    }
}
export const totalEasyCount = () => {
    return {
        type: "EasyTotalIncrement",

    }
} 