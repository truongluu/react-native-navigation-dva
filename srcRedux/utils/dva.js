import React from 'react'
import { create } from 'dva-core'
import createLoading from 'dva-loading'
import { Provider, connect } from 'react-redux'

export { connect }

export default function(options) {
  const app = create(options)
  // HMR workaround
  if (!global.registered) {
    options.models.forEach(model => app.model(model))
    global.registered = true
  }
  
  app.use(createLoading())
  app.start()
  // eslint-disable-next-line no-underscore-dangle
  const store = app._store
  app.start = Component => {
    const WrapperComponent = (props) => {
      return (
        <Provider store={store}>
          <Component {...props} />
        </Provider>
      );
    };
    WrapperComponent.options = Component.options || {};
    return WrapperComponent;
  } 
  app.getStore = () => store

  return app
}