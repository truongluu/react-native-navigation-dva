const initialState: ProductState = {
  counter: 0
}

export default {
  namespace: 'product',

  state: {
    counter: 0
  },

  effects: {
    
  },

  reducers: {
    incr(state: ProductState, action: Action) {
      return {
        ...state,
        counter: state.counter+ (action.couter || 1)
      }
    }
  },

  subscriptions: {
    setup() {
      console.log('product subscriptions');
    }
  },
};
