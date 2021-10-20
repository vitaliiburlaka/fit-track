import { render, fireEvent } from '@testing-library/react'
import { AddEditForm } from './AddEditForm'

describe('<AddEditForm />', () => {
  const entryMock = {
    id: 1,
    date: '2021-10-19',
    weight: 75,
    waist: 69,
    hip: 100,
    happinessLevel: 5,
  }
  const defaultProps = {
    onAdd: () => {},
    onEdit: () => {},
    onCancel: () => {},
    entryData: null,
    isEdit: false,
  }

  it('should render without crashing', () => {
    const { getByText } = render(<AddEditForm {...defaultProps} />)

    expect(getByText(/Add New Entry/i)).toBeInTheDocument()
  })

  it('should render in Edit mode with entryData', () => {
    const { getByText, getByTestId } = render(
      <AddEditForm {...defaultProps} entryData={entryMock} isEdit />
    )

    expect(getByText(/Edit Entry/i)).toBeInTheDocument()
    expect(getByTestId('date-input').value).toBe('2021-10-19')
  })

  it('should call onAdd when form NOT in Edit mode is submitted', () => {
    const onAdd = jest.fn()
    const { getByTestId, getByText } = render(
      <AddEditForm {...defaultProps} onAdd={onAdd} />
    )

    // Simulating adding new entry
    Object.keys(entryMock).forEach((key) => {
      if (key !== 'id') {
        const input = getByTestId(`${key}-input`)
        fireEvent.change(input, { target: { value: entryMock[key] } })
      }
    })

    fireEvent.click(getByText(/Submit/i))

    expect(onAdd).toHaveBeenCalled()
  })

  it('should call onEdit when form IN Edit mode is submitted', () => {
    const onEdit = jest.fn()
    const { getByTestId, getByText } = render(
      <AddEditForm
        {...defaultProps}
        entryData={entryMock}
        isEdit
        onEdit={onEdit}
      />
    )
    fireEvent.change(getByTestId('date-input'), {
      target: { value: '2021-10-18' },
    })
    fireEvent.click(getByText(/Submit/i))
    expect(onEdit).toHaveBeenCalledWith({ ...entryMock, date: '2021-10-18' })
  })

  it('should call onCancel when Cancel button is clicked', () => {
    const onCancel = jest.fn()
    const { getByText } = render(
      <AddEditForm {...defaultProps} onCancel={onCancel} />
    )
    fireEvent.click(getByText(/Cancel/i))
    expect(onCancel).toHaveBeenCalled()
  })

  it('should handle input change', () => {
    const { getByTestId } = render(<AddEditForm {...defaultProps} />)
    fireEvent.change(getByTestId('date-input'), {
      target: { value: '2021-10-19' },
    })
    expect(getByTestId('date-input').value).toBe('2021-10-19')
  })
})
