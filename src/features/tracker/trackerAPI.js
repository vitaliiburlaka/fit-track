let fitnessData = [
  {
    id: '1',
    date: '2021-01-01',
    weight: 90,
    waist: 70,
    hip: 95,
    happinessLevel: 3,
  },
  {
    id: '2',
    date: '2021-02-02',
    weight: 85,
    waist: 70,
    hip: 95,
    happinessLevel: 3,
  },
  {
    id: '3',
    date: '2021-03-03',
    weight: 82,
    waist: 70,
    hip: 95,
    happinessLevel: 4,
  },
  {
    id: '4',
    date: '2021-04-04',
    weight: 86,
    waist: 70,
    hip: 95,
    happinessLevel: 4,
  },
  {
    id: '5',
    date: '2021-05-05',
    weight: 81,
    waist: 70,
    hip: 95,
    happinessLevel: 5,
  },
]

// A mock function to mimic making an async request for data
// It that were a real API, we would make an async request to the API and have proper unit-tests
export function fetchFitnessData() {
  return new Promise((resolve) =>
    setTimeout(() => resolve({ data: fitnessData }), 500)
  )
}

export function createEntry(newData) {
  return new Promise((resolve) => {
    fitnessData = [...fitnessData, newData]
    return setTimeout(() => resolve({ data: newData }), 500)
  })
}

export function updateEntry(updatedData) {
  return new Promise((resolve) => {
    fitnessData = fitnessData.map((data) => {
      if (data.id === updatedData.id) {
        return updatedData
      } else {
        return data
      }
    })
    return setTimeout(() => resolve({ data: updatedData }), 500)
  })
}

export function deleteEntry(entryId) {
  return new Promise((resolve) => {
    fitnessData = fitnessData.filter((data) => data.id !== entryId)
    setTimeout(() => resolve({ data: { id: entryId } }), 500)
  })
}
