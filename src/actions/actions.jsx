export const setScreenState = (state) => ({
    type: "SET_SCREEN_STATE",
    payload: state,
});

export const setGameState = (state) => ({
    type: "SET_GAME_STATE",
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

export const setAllEntries = (state) => ({
    type: "SET_ALL_ENTRIES",
    payload: state,
});

export const setActiveEntry = (state) => ({
    type: "SET_ACTIVE_ENTRY",
    payload: state,
});

export const setActiveRound = (state) => ({
    type: "SET_ACTIVE_ROUND",
    payload: state,
});

export const setActiveTeam = (state) => ({
    type: "SET_ACTIVE_TEAM",
    payload: state,
});

export const setActivePlayer = (state) => ({
    type: "SET_ACTIVE_PLAYER",
    payload: state,
});

export const setTeamOneScore = (state) => ({
    type: "SET_TEAM_ONE_SCORE",
    payload: state,
});

export const setTeamTwoScore = (state) => ({
    type: "SET_TEAM_TWO_SCORE",
    payload: state,
});

export const setOrder = (state) => ({
    type: "SET_ORDER",
    payload: state,
});

export const setNumberOfEntries = (state) => ({
    type: "SET_NUMBER_OF_ENTRIES",
    payload: state,
});
