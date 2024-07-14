import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App'
import anecdoteReducer, { setDotes } from './reducers/anecdoteReducer'
import doteService from './services/anecdote'


import {store} from './reducers/store'

doteService.getAll().then(anecdotes =>
  store.dispatch(setDotes(anecdotes))
)


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)