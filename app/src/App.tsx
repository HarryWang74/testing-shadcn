import { Button } from '@/components/ui/button'
import { Todo } from './models/todo'
import { ColumnDef } from '@tanstack/react-table'
import { ToDoList } from './components/ToDoList'
import './App.css'

function App() {
  const todos: Todo[] = [
    {
      id: 1,
      title: 'Learn React',
      completed: false,
      description: 'Learn React with TypeScript and Tailwind CSS',
    },
    {
      id: 2,
      title: 'Learn Next.js',
      completed: false,
      description: 'Learn Next.js with TypeScript and Tailwind CSS',
    },
  ]

  const columns: ColumnDef<Todo>[] = [
    {
      accessorKey: 'id',
      header: () => <small className="my_custom_class">ID</small>,
    },
    {
      accessorKey: 'title',
      header: 'Title',
    },
    {
      accessorKey: 'completed',
      header: 'Completed',
    },
    {
      accessorKey: 'description',
      header: 'Description',
    },
  ]

  console.log(todos)
  return (
    <>
      <div className="container mx-auto py-10">
        <ToDoList columns={columns} data={todos} />
      </div>
    </>
  )
}

export default App
