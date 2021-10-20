import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectFitnessData,
  fetchFitnessDataAsync,
  createEntryAsync,
  updateEntryAsync,
  deleteEntryAsync,
} from './trackerSlice'
import { WeightChart } from './components/WeightChart/WeightChart'
import { TimelineTable } from './components/TimelineTable/TimelineTable'
import { AddEditForm } from './components/AddEditForm/AddEditForm'
import { getUniqueId } from './utils'

import styles from './Tracker.module.scss'

export function Tracker() {
  const fitnessData = useSelector(selectFitnessData)
  const dispatch = useDispatch()
  const [showForm, setShowForm] = useState(false)
  const [entryData, setEntryData] = useState(null)

  useEffect(() => {
    dispatch(fetchFitnessDataAsync())
  }, [dispatch])

  const handleAddEntry = () => {
    setShowForm(true)
  }

  const handleEditEntry = (entry) => {
    setShowForm(true)
    setEntryData(entry)
  }

  const handleCancelEntry = () => {
    setShowForm(false)
    setEntryData(null)
  }

  const handleAddEntrySubmit = (entry) => {
    dispatch(createEntryAsync({ ...entry, id: getUniqueId() }))
    setShowForm(false)
  }

  const handleEditEntrySubmit = (entry) => {
    dispatch(updateEntryAsync(entry))
    setEntryData(null)
    setShowForm(false)
  }

  const handleDeleteData = (entryId) => {
    dispatch(deleteEntryAsync(entryId))
  }

  return (
    <div className={styles.Container}>
      {!fitnessData.length && (
        <div className={styles.row}>No data available</div>
      )}

      {fitnessData.length > 0 && (
        <>
          <h3 className={styles.row}>Weight Chart</h3>
          <WeightChart timelineData={fitnessData} />

          <h3 className={styles.row}>
            History Data{' '}
            <button className={styles.AddButton} onClick={handleAddEntry}>
              <span>+</span>
            </button>
          </h3>
          <TimelineTable
            timelineData={fitnessData}
            onEdit={handleEditEntry}
            onRemove={handleDeleteData}
          />
        </>
      )}

      {showForm && (
        <AddEditForm
          onAdd={handleAddEntrySubmit}
          onEdit={handleEditEntrySubmit}
          onCancel={handleCancelEntry}
          isEdit={!!entryData}
          entryData={entryData}
        />
      )}
    </div>
  )
}
