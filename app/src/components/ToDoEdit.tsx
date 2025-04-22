import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { Todo } from '@/models/todo'

type ComponentProps = {
  open: boolean
  todo: Todo
  onOpenChange: () => void
}

export function ToDoEdit(prop: ComponentProps) {
  return (
    <>
      <Sheet open={prop.open} onOpenChange={() => prop.onOpenChange()}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Title</SheetTitle>
            <SheetDescription>
              Content
            </SheetDescription>
          </SheetHeader>
          <SheetFooter>
            <SheetClose asChild>
              <Button type="submit">Save changes</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  )
}



