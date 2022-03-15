// Import Bootstrap
import Container from 'react-bootstrap/Container'

// Import components
import { NewTask } from '../NewTask'

// Import styles
import styles from './Header.module.css'

export function Header() {
  return (
    <Container as="header">
      <h1 className="display">KRS Global Domination Planner</h1>
      <h2>Add new task</h2>
      <NewTask formId="newTask" />
    </Container>
  )
}
