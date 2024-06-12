const initialState = {
    screenState: "start",
    gameState: "teamBuild",
    theme: {
        blueOne: '#040B2E',
        blueTwo: '#062653',
        blueThree: '#0C69B4',
        black: '#130f1e',
        white: '#ede8ff',
        grey: '#37373d',
    },
    playerIndex: [
        { playerName: '', entries: ['', '', ''] },
    ],
    playerErrors: {
        playerName: false,
        entries: [false, false, false],
    },
    playerCount: 1,
    scrollPosition: {
        main: 0,
        onBoardingBlock: 0,
    },
    teams: {
        teamOne: [],
        teamTwo: []
    },
    activeTeam: 'teamOne',
    activePlayer: 0,
    teamOneScore: 0,
    teamTwoScore: 0,
    allEntries: [],
    activeEntry: 0,
    activeRound: 0,
    order: [],
    entries: [],
    settingDrawer: false,
    timeLimit: 60,
    numberOfEntries: 3,
    mobile: false,
};

  
  const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_SCREEN_STATE":
            return {
                ...state,
                screenState: action.payload,
            };

        case "SET_GAME_STATE":
            return {
                ...state,
                gameState: action.payload,
            };

        case "SET_PLAYER_COUNT":
            return {
                ...state,
                playerCount: action.payload,
            };

        case 'SET_MOBILE':
            return {
                ...state,
                mobile: action.payload,
            };
            
        case "SET_TIME_LIMIT":
            return {
                ...state,
                timeLimit: action.payload,
            };

        case "RESET_PLAYER_INDEX": 
            return {
                ...state,
                playerIndex: action.payload
            };
        
        case "SET_ACTIVE_ENTRY": 
            return {
                ...state,
                activeEntry: action.payload
            };
        
        case "SET_ACTIVE_ROUND": 
            return {
                ...state,
                activeRound: action.payload
            };

        case "SET_NUMBER_OF_ENTRIES":
            return {
                ...state,
                numberOfEntries: action.payload,
                playerIndex: state.playerIndex.map(player => ({
                    ...player,
                    entries: Array(action.payload).fill('')
                })),
                playerErrors: {
                    ...state.playerErrors,
                    entries: Array(action.payload).fill(false)
                }
            };

        case "SET_SETTING_DRAWER":
            return {
                ...state,
                settingDrawer: action.payload,
            };

        case "SET_PLAYER_ERRORS":
            return {
                ...state,
                playerErrors: action.payload,
            };

        case "ADD_PLAYER":
            return {
                ...state,
                playerIndex: [
                    ...state.playerIndex,
                    { playerName: '', entries: Array(state.numberOfEntries).fill('') }
                ],
            };

        case "UPDATE_PLAYER_FIELD":
            const { index, field, value } = action.payload;
            const updatedPlayerIndex = [...state.playerIndex];
            if (field === 'playerName') {
                updatedPlayerIndex[index].playerName = value;
            } else {
                updatedPlayerIndex[index].entries[field] = value;
            }
            return {
                ...state,
                playerIndex: updatedPlayerIndex,
            };

        case "SET_TEAMS":
            return {
                ...state,
                teams: action.payload,
            };

        case "SET_ACTIVE_TEAM":
            return {
                ...state,
                activeTeam: action.payload,
            };

        
        case "SET_ACTIVE_PLAYER":
            return {
                ...state,
                activePlayer: action.payload,
        };

        case "SET_TEAM_ONE_SCORE":
            return {
                ...state,
                teamOneScore: action.payload,
            };

        case "SET_TEAM_TWO_SCORE":
            return {
                ...state,
                teamTwoScore: action.payload,
            };
        
        case "SET_ALL_ENTRIES":
            return {
                ...state,
                allEntries: action.payload,
            };
            
        case "SET_ORDER":
            return {
                ...state,
                order: action.payload,
            };

        case "SET_SCROLL_POSITION":
            return {
                ...state,
                scrollPosition: {
                    ...state.scrollPosition,
                    [action.payload.key]: action.payload.value,
                },
            };
        default:
            return state;
    }
};

export default rootReducer;

  