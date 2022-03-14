// Import styles
import styles from './NewTask.module.css'

// Export component
export function NewTask() {
  // Function for creating new task
  const createNewTask = e => {
    // Don't submit the form element natively
    e.preventDefault()
  }

  // Render component
  return (
    <form
      className={styles.wrapper}
      onSubmit={createNewTask}
    >
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
