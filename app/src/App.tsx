import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Todo } from './models/todo'
import { ColumnDef } from '@tanstack/react-table'
import { ToDoList } from './components/ToDoList'
import { MoreHorizontal } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import './App.css'
import { ToDoEdit } from './components/ToDoEdit'

function App() {
  const columns: ColumnDef<Todo>[] = [
    {
      accessorKey: 'title',
      header: 'Title',
    },
    {
      accessorKey: 'description',
      header: 'Description',
    },
    {
      accessorKey: 'status',
      header: 'Status',
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const todo:Todo = row.original

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEditTodo(todo)}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => onDeleteTodo(todo)}>
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  const [showEdit, setShowEdit] = useState<boolean>(false)
  const [isCreating, setIsCreating] = useState<boolean>(false)
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null)
  const [todos, setTodos] = useState<Todo[]>([
    {
      id: 1,
      title: 'Learn React',
      status: 'todo',
      description: 'Learn React with TypeScript and Tailwind CSS',
    },
    {
      id: 2,
      title: 'Learn Next.js',
      status: 'todo',
      description: 'Learn Next.js with TypeScript and Tailwind CSS',
    },
  ])

  const onAddTodo = () => {
    let todo: Todo = {
      id: Math.floor(Math.random() * 1000),
      title: 'New Todo',
      status: 'todo',
      description: 'New Todo Description',
    }
    setSelectedTodo(todo)
    setIsCreating(true)
    console.log('Creating todo', todo)
    setShowEdit(true)
  }

  const onEditTodo = (todo: Todo) => {
    setSelectedTodo(todo)
    setIsCreating(false)
    setShowEdit(true)
  }

  const sheetOnOpenChange = () => {
    setShowEdit(!showEdit)
  }

  const onSaveTodo = (isCreating: boolean, todo: Todo) => {
    console.log('Saving todo', todo)
    if(isCreating){
      setTodos([...todos, todo])
    }else{
      const updatedTodos = todos.map((t) => {
        if (t.id === todo.id) {
          return { ...t, ...todo }
        }
        return t
      })
      setTodos(updatedTodos)
    }
    
    setShowEdit(false)  
  }

  const onDeleteTodo = (todo: Todo) => {
    console.log('Deleting todo', todo)

    const updatedTodos = todos.filter((t) => t.id !== todo.id)
    setTodos(updatedTodos)
  }

  return (
    <>
      <div className="container mx-auto py-10">
        <ToDoList columns={columns} data={todos} />
        <div className="p-4 text-right">
          <Button onClick={() => onAddTodo()}>Add todo</Button>
        </div>
        <ToDoEdit 
          open={showEdit}
          create={isCreating}
          todo={selectedTodo as Todo} 
          onOpenChange={sheetOnOpenChange}
          onSaveTodo={onSaveTodo}  
        />
      </div>
    </>
  )
}

export default App
