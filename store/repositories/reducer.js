import { actionTypes } from './actions';

const initialState = {
  repositoryToShow: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ON_SELECT_REPOSITORY: {
      return {
        ...state,
        repositoryToShow: action.payload.repository
      }
    }

    default:
      return state;
  }
};
