import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { Todo } from '@/models/todo'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { useEffect } from 'react'



type ComponentProps = {
  open: boolean
  create: boolean
  todo?: Todo
  onOpenChange: () => void
}

const formSchema = z.object({
  title: z.string().min(2, {
    message: 'Title must be at least 2 characters.',
  }),
  description: z.string(),
})

export function ToDoEdit(prop: ComponentProps) {
 
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: prop.todo?.title || '', 
      description: prop.todo?.description || '',
    },
  })
  const onOpenChangeHandler = (open: boolean) => {
    console.log('onOpenChangeHandler', open)
    prop.onOpenChange()
  }

  useEffect(() => {
    function sheetOpenHandler() {
      if (prop.open) {
        form.setValue('title', prop.todo?.title || '')
        form.setValue('description', prop.todo?.description || '')
      }else{
        form.reset()
      }
    }

    sheetOpenHandler()
  }, [prop.open])

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  return (
    <>
      <Sheet
        open={prop.open}
        onOpenChange={(open: boolean) => onOpenChangeHandler(open)}
      >
        <SheetContent>
          <SheetHeader>
            <SheetTitle className="mb-4">
              {prop.create ? 'Create' : 'Edit'}
            </SheetTitle>
            <SheetDescription asChild>
              <div>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                  >
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Title</FormLabel>
                          <FormControl>
                            <Input placeholder="Title here" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Description here" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <Button type="submit">Submit</Button>
                  </form>
                </Form>
              </div>
            </SheetDescription>
          </SheetHeader>
          {/*       <SheetFooter>
            <SheetClose asChild>
              <Button type="submit">Save changes</Button>
            </SheetClose>
          </SheetFooter> */}
        </SheetContent>
      </Sheet>
    </>
  )
}



