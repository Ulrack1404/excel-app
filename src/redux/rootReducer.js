import { TABLE_RESIZE } from "./types";

export function rootReducer(state, action) {
    // let prevState;
    switch (action.type) {
        case TABLE_RESIZE:
            const prevState = state.colState || {};
            prevState[action.data.id] = action.data.value;
            return { ...state, colState: prevState };
            break;

        default:
            return state;
    }
}
