const initialState = {
	isProfileDrawerOpen: false,
	isMobileScreen: window.innerWidth < 576
}

export default function AppReducer(state = initialState, action) {
	switch(action.type) {
		case "toggle-profile-drawer":
			return { ...state, isProfileDrawerOpen: !state.isProfileDrawerOpen }
		default:
			return state
	}
}