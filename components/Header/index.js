// Import components
import { NewTask } from '../NewTask'

// Import styles
import styles from './Header.module.css'

export function Header() {
  return (
    <header className={styles.wrapper}>
      <h1 className={styles.heading}>KRS Global Domination Center</h1>
      <h2 className={styles.subheading}>Add new task</h2>
      <NewTask formId="newTask" />
    </header>
  )
}
