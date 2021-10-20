import { useState, useMemo, useEffect } from 'react'

import styles from './AddEditForm.module.scss'

// I would consider using a Formik or react-hook-form library for bigger apps
// Additionally, I would consider adding more advanced validation
// For the sake of this demo, I will not use props-types
export function AddEditForm({ onAdd, onEdit, onCancel, entryData, isEdit }) {
  const initialFormData = useMemo(
    () => ({
      date: '',
      weight: '',
      waist: '',
      hip: '',
      happinessLevel: '',
    }),
    []
  )
  const [formData, setFormData] = useState(entryData || initialFormData)
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false)

  useEffect(() => {
    const isFormValid = Object.values(formData).every((value) => value !== '')
    const isChanged = Object.keys(formData).some((key) => {
      if (entryData) {
        return formData[key] !== entryData[key]
      }
      return initialFormData !== formData[key]
    })
    setIsSubmitEnabled(isFormValid && isChanged)
  }, [formData, entryData, initialFormData])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (isEdit) {
      onEdit(formData)
    } else {
      onAdd(formData)
    }
  }

  const handleChange = ({ target }) => {
    const { name, value } = target
    setFormData({ ...formData, [name]: value })
  }

  return (
    <div className={styles.Modal}>
      <form className={styles.Form} onSubmit={handleSubmit}>
        <div className={styles.FormTitle}>
          <div>{`${isEdit ? 'Edit' : 'Add New'}`} Entry</div>
        </div>
        <div className={styles.FormGroup}>
          <label htmlFor="date">Date</label>
          <input
            type="date"
            name="date"
            onChange={handleChange}
            value={formData['date']}
            required
            data-testid="date-input"
          />
        </div>
        <div className={styles.FormGroup}>
          <label htmlFor="weight">Weight</label>
          <input
            type="number"
            name="weight"
            onChange={handleChange}
            value={formData['weight']}
            min="1"
            maxLength="3"
            required
            data-testid="weight-input"
          />
        </div>
        <div className={styles.FormGroup}>
          <label htmlFor="waist">Waist</label>
          <input
            type="number"
            name="waist"
            onChange={handleChange}
            value={formData['waist']}
            min="1"
            maxLength="3"
            required
            data-testid="waist-input"
          />
        </div>
        <div className={styles.FormGroup}>
          <label htmlFor="hip">Hip</label>
          <input
            type="number"
            name="hip"
            onChange={handleChange}
            value={formData['hip']}
            min="1"
            maxLength="3"
            required
            data-testid="hip-input"
          />
        </div>
        <div className={styles.FormGroup}>
          <label htmlFor="happinessLevel">Happiness Level</label>
          <input
            type="number"
            name="happinessLevel"
            onChange={handleChange}
            min="1"
            max="5"
            maxLength="1"
            value={formData['happinessLevel']}
            required
            data-testid="happinessLevel-input"
          />
        </div>

        <div className={styles.FormGroup}>
          <button className={styles.Button} onClick={onCancel}>
            Cancel
          </button>
          <button
            className={styles.Button}
            type="submit"
            disabled={!isSubmitEnabled}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}
