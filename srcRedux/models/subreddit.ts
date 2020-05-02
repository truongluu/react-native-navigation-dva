
const initialState: SubredditsState = {
  list: [
    {
      title: 'redux',
    },
    {
      title: 'reactjs',
    },
    {
      title: 'reactnative',
    },
    {
      title: 'golang',
    },
    {
      title: 'rust',
    },
  ]
};
export default {
  namespace: 'subeddits',

  state: initialState,

  effects: {

  },

  reducers: {
    addSubReddit(state: SubredditsState, action: Action) {
      if (!state.list.find((sr) => sr.title === action.subreddit)) {
        return {
          ...state,
          list: [
            ...state.list,
            {title: action.subreddit}
          ]
        };
      }
      return state;
    }
  },
  deleteSubReddit(state: SubredditsState, action: Action) {
    return state.list.filter((v) => v.title !== action.subreddit);
  }
};
