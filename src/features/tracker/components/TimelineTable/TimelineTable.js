import { useMemo } from 'react'
import styles from './TimelineTable.module.scss'

// For the sake of this demo, I will not use props-types
export function TimelineTable({ timelineData, onEdit, onRemove }) {
  const columns = useMemo(() => {
    return Object.keys(timelineData[0])
  }, [timelineData])

  return (
    <table className={styles.Table}>
      <thead>
        <tr>
          {columns.map((col) => col !== 'id' && <td key={col}>{col}</td>)}
          <td></td>
        </tr>
      </thead>
      <tbody>
        {timelineData.map((entry) => (
          <tr key={entry.id}>
            {Object.keys(entry).map(
              (key) =>
                key !== 'id' && (
                  <td key={`${entry.id}-${entry[key]}`}>{entry[key]}</td>
                )
            )}
            <td>
              <button
                className={styles.Button}
                onClick={() => onEdit(entry)}
                data-testid="edit-entry"
              >
                <span>✏️</span>
              </button>
              <button
                className={styles.Button}
                onClick={() => onRemove(entry.id)}
                data-testid="remove-entry"
              >
                <span>🗑</span>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
