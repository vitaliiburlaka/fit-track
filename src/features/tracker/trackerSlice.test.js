import trackerReducer, {
  fetchFitnessDataAsync,
  createEntryAsync,
  updateEntryAsync,
  deleteEntryAsync,
  defaultErrorMessage,
} from './trackerSlice'

describe('trackerReducer', () => {
  const fitnessDataMock = [
    {
      id: '1',
      date: '2021-01-01',
      weight: 90,
      waist: 70,
      hip: 95,
      happinessLevel: 3,
    },
  ]
  const initialState = {
    fitnessData: [],
    status: 'idle',
    error: null,
  }

  it('should handle initial state', () => {
    expect(trackerReducer(undefined, { type: 'unknown' })).toEqual({
      fitnessData: [],
      status: 'idle',
      error: null,
    })
  })

  describe('fetchFitnessDataAsync', () => {
    it('should handle fetchFitnessDataAsync.pending', () => {
      const action = { type: fetchFitnessDataAsync.pending }
      const actual = trackerReducer(initialState, action)
      expect(actual).toEqual({
        fitnessData: [],
        status: 'loading',
        error: null,
      })
    })

    it('should handle fetchFitnessDataAsync.fulfilled', () => {
      const action = {
        type: fetchFitnessDataAsync.fulfilled,
        payload: fitnessDataMock,
      }
      const actual = trackerReducer(initialState, action)
      expect(actual).toEqual({
        fitnessData: fitnessDataMock,
        status: 'idle',
        error: null,
      })
    })

    it('should handle fetchFitnessDataAsync.rejected', () => {
      const action = { type: fetchFitnessDataAsync.rejected }
      const actual = trackerReducer(initialState, action)
      expect(actual).toEqual({
        fitnessData: [],
        status: 'failed',
        error: defaultErrorMessage,
      })
    })
  })

  describe('createEntryAsync', () => {
    it('should handle createEntryAsync.pending', () => {
      const action = { type: createEntryAsync.pending }
      const actual = trackerReducer(initialState, action)
      expect(actual).toEqual({
        fitnessData: [],
        status: 'loading',
        error: null,
      })
    })

    it('should handle createEntryAsync.fulfilled', () => {
      const action = {
        type: createEntryAsync.fulfilled,
        payload: fitnessDataMock[0],
      }
      const actual = trackerReducer(initialState, action)
      expect(actual).toEqual({
        fitnessData: fitnessDataMock,
        status: 'idle',
        error: null,
      })
    })

    it('should handle createEntryAsync.rejected', () => {
      const action = { type: createEntryAsync.rejected }
      const actual = trackerReducer(initialState, action)
      expect(actual).toEqual({
        fitnessData: [],
        status: 'failed',
        error: defaultErrorMessage,
      })
    })
  })

  describe('updateEntryAsync', () => {
    it('should handle updateEntryAsync.pending', () => {
      const action = { type: updateEntryAsync.pending }
      const actual = trackerReducer(initialState, action)
      expect(actual).toEqual({
        fitnessData: [],
        status: 'loading',
        error: null,
      })
    })

    it('should handle updateEntryAsync.fulfilled', () => {
      const updateEntry = {
        id: '1',
        date: '2021-01-02',
        weight: 88,
        waist: 69,
        hip: 92,
        happinessLevel: 4,
      }
      const action = {
        type: updateEntryAsync.fulfilled,
        payload: updateEntry,
      }
      const actual = trackerReducer(
        { ...initialState, fitnessData: fitnessDataMock },
        action
      )
      expect(actual).toEqual({
        fitnessData: [updateEntry],
        status: 'idle',
        error: null,
      })
    })

    it('should handle updateEntryAsync.rejected', () => {
      const action = { type: updateEntryAsync.rejected }
      const actual = trackerReducer(initialState, action)
      expect(actual).toEqual({
        fitnessData: [],
        status: 'failed',
        error: defaultErrorMessage,
      })
    })
  })

  describe('deleteEntryAsync', () => {
    it('should handle deleteEntryAsync.pending', () => {
      const action = { type: deleteEntryAsync.pending }
      const actual = trackerReducer(initialState, action)
      expect(actual).toEqual({
        fitnessData: [],
        status: 'loading',
        error: null,
      })
    })

    it('should handle deleteEntryAsync.fulfilled', () => {
      const action = {
        type: deleteEntryAsync.fulfilled,
        payload: fitnessDataMock[0].id,
      }
      const actual = trackerReducer(
        { ...initialState, fitnessData: fitnessDataMock },
        action
      )
      expect(actual).toEqual({
        fitnessData: [],
        status: 'idle',
        error: null,
      })
    })

    it('should handle deleteEntryAsync.rejected', () => {
      const action = { type: deleteEntryAsync.rejected }
      const actual = trackerReducer(initialState, action)
      expect(actual).toEqual({
        fitnessData: [],
        status: 'failed',
        error: defaultErrorMessage,
      })
    })
  })
})
