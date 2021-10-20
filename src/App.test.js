import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from './app/store'
import { App } from './App'

describe('<App />', () => {
  it('should render without crashing', () => {
    const { getByText } = render(
      <Provider store={store}>
        <App />
      </Provider>
    )
    expect(getByText(/Fit Track/i)).toBeInTheDocument()
  })
})
