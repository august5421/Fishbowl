export const setScreenState = (state) => ({
    type: "SET_SCREEN_STATE",
    payload: state,
});

export const setPlayerCount = (state) => ({
    type: "SET_PLAYER_COUNT",
    payload: state,
});

export const setMobile = (state) => ({
    type: 'SET_MOBILE',
    payload: state,
});

export const setTimeLimit = (state) => ({
    type: "SET_TIME_LIMIT",
    payload: state,
});

export const resetPlayerIndex = (state) => ({
    type: "RESET_PLAYER_INDEX",
    payload: state,
});

export const setScrollPosition = (key, value) => ({
    type: "SET_SCROLL_POSITION",
    payload: { key, value },
});

export const addPlayer = () => ({
    type: "ADD_PLAYER",
});

export const setPlayerErrors = (errors) => ({
    type: "SET_PLAYER_ERRORS",
    payload: errors,
});

export const setSettingDrawer = (errors) => ({
    type: "SET_SETTING_DRAWER",
    payload: errors,
});

export const updatePlayerField = (index, field, value) => ({
    type: "UPDATE_PLAYER_FIELD",
    payload: { index, field, value },
});

export const setTeams = (teams) => ({
    type: "SET_TEAMS",
    payload: teams,
});

export const setNumberOfEntries = (state) => ({
    type: "SET_NUMBER_OF_ENTRIES",
    payload: state,
});
