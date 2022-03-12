// Import components
import { NewTask } from '../NewTask'

// Import styles
import styles from './Header.module.css'

export function Header() {
  return (
    <header className={styles.wrapper}>
      <h1 className={styles.heading}>To Do List</h1>
      <p className={styles.description}>Type a task into the field below. Click or tap <strong>"Add task"</strong> to add the task to the list.</p>
      <NewTask />
    </header>
  )
}
