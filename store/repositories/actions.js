export const actionTypes = {
  ON_SELECT_REPOSITORY: 'onSelectRepository',
};

export const onSelectRepository = repository => {
  return {
    type: actionTypes.ON_SELECT_REPOSITORY,
    payload: {
      repository
    }
  }
};