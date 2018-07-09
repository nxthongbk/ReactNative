export const actions = {
  SET_LOCATION: '@Location/SET_LOCATION',
  setLocation: (data) => {
    return {
      type: actions.SET_LOCATION,
      payload: data,
    };
  },
};
