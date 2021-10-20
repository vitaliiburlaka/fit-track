import { render } from '@testing-library/react'
import { WeightChart } from './WeightChart'

describe('<WeightChart />', () => {
  const timelineDataMock = [
    {
      id: '1',
      date: '2021-01-01',
      weight: 90,
      waist: 70,
      hip: 95,
      happinessLevel: 3,
    },
  ]
  it('renders without crashing', () => {
    render(<WeightChart timelineData={timelineDataMock} />)
  })
})
