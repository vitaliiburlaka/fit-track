import { Tracker } from './features/tracker/Tracker'

import styles from './App.module.scss'

export function App() {
  return (
    <div className="App">
      <header className={styles.Header}>
        <h1>
          Fit Track <span>📉</span>
        </h1>
      </header>
      <div className={styles.Content}>
        <Tracker />
      </div>
    </div>
  )
}
