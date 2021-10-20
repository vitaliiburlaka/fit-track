import { render } from '@testing-library/react'
import configureStore from 'redux-mock-store'
import { getDefaultMiddleware } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { store } from '../../app/store'

import { Tracker } from './Tracker'

const mockStore = configureStore(getDefaultMiddleware())

describe('<Tracker />', () => {
  it('should render without crashing', () => {
    const { getByText } = render(
      <Provider store={store}>
        <Tracker />
      </Provider>
    )
    expect(getByText(/No data available/i)).toBeInTheDocument()
  })

  it('should render with data', () => {
    const initialState = {
      fitnessData: [
        {
          id: '1',
          date: '2021-01-01',
          weight: 90,
          waist: 70,
          hip: 95,
          happinessLevel: 3,
        },
      ],
    }
    const store = mockStore({ tracker: { ...initialState } })
    const { getByText } = render(
      <Provider store={store}>
        <Tracker />
      </Provider>
    )
    expect(getByText(/Weight Chart/i)).toBeInTheDocument()
    // expect(getByText(/History Data/i)).toBeInTheDocument()
  })
})
