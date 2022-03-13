// Export component
export function TaskItem({ name, completed }) {
  return (
    <li>
      <input type="checkbox" checked={completed} />
      <label>{name}</label>
    </li>
  )
}

