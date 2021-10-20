import { render, fireEvent } from '@testing-library/react'
import { TimelineTable } from './TimelineTable'

describe('<TimelineTable />', () => {
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
  const defaultProps = {
    timelineData: timelineDataMock,
    onEdit: () => {},
    onRemove: () => {},
  }

  it('should render without crashing', () => {
    const { getByText } = render(<TimelineTable {...defaultProps} />)
    expect(getByText(/2021-01-01/i)).toBeInTheDocument()
  })

  it('should call onEdit when edit button is clicked', () => {
    const onEditMock = jest.fn()
    const { getByTestId } = render(
      <TimelineTable {...defaultProps} onEdit={onEditMock} />
    )

    fireEvent.click(getByTestId('edit-entry'))

    expect(onEditMock).toHaveBeenCalled()
  })

  it('should call onRemove when remove button is clicked', () => {
    const onRemoveMock = jest.fn()
    const { getByTestId } = render(
      <TimelineTable {...defaultProps} onRemove={onRemoveMock} />
    )

    fireEvent.click(getByTestId('remove-entry'))

    expect(onRemoveMock).toHaveBeenCalled()
  })
})
