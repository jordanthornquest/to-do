// Import styles
import styles from './NewTask.module.css'

export function NewTask() {
  return (
    <form className={styles.wrapper}>
      <label
        className={styles.label}
        htmlFor="newTask"
      >
        New task
      </label>
      <input
        className={styles.input}
        name="newTask"
        placeholder="New task"
        type="text"
      />
      <button
        className={styles.submit}
        type="submit"
      >
        Add task &#43;
      </button>
    </form>
  )
}
