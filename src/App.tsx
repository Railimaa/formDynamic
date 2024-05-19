import { Reorder } from "framer-motion";
import { PlusCircleIcon } from "lucide-react";
import { useState } from "react";
import { FormProvider } from "react-hook-form";
import { LinkItem } from "./components/LinkItem";
import { Button } from "./components/ui/Button";
import { useApp } from "./useApp";

export function App() {
  const { handleSubmit, form, links } = useApp()

  const [draggingIndex, setDragging] = useState<null | number>(null);


  function handleReorder(newOrder: typeof links.fields) {
    if (draggingIndex === null) return;
    
    const dragLink = links.fields[draggingIndex];
    newOrder.forEach((link, index) => {
      if (link === dragLink) {
        links.move(draggingIndex, index)
        setDragging(index)
      }
    })
  }

  function handleDragStart(index: number | null) {
    setDragging(index);
  }

  function handleDragEnd() {
    setDragging(null)
  }


  return (
    <div className="grid place-items-center  h-screen ">
        <div className="w-full max-w-2xl">
          <h1 className="text-xl font-semibold tracking-tight">Links</h1>

          <FormProvider {...form}>
            <form className="mt-10 flex flex-col gap-4" onSubmit={handleSubmit} >
                <Button variant={"outline"} type="button" className="border-dashed mb-6" onClick={() => links.prepend({ title: '', url: '' })}>  
                  Adcionar no topo da lista
                </Button>
                <Reorder.Group 
                  axis="y"
                  values={links.fields}
                  onReorder={handleReorder}
                  className="space-y-4"
                >
                  {links.fields.map((link, index) => (
                    <LinkItem 
                        link={link}
                        isDraggingActive={draggingIndex !== null && draggingIndex !== index} 
                        index={index} 
                        key={link.id}
                        handleDragStart={() => handleDragStart(index)}
                        handleDragEnd={handleDragEnd}
                        onRemove={() => links.remove(index)}
                      /> 
                  ))}
                </Reorder.Group>

            
                  
                  <Button
                    onClick={() => {
                      links.append({ title: '', url: '' })
                    }} 
                    variant={"outline"} 
                    className="w-full border-dashed mt-6" 
                    type="button"
                  >
                    <PlusCircleIcon className="mr-1 size-4"/>
                    Adicionar novo Link
                  </Button>


                  <Button
                    className="w-full border-dashed mt-6" 
                    type="submit"
                  >
                    Enviar
                  </Button>
                

                <div className="flex gap-4">
                    <Button
                      onClick={() => links.insert(1, { title: '' , url: ''})}  
                      className="flex flex-1" 
                      variant={"secondary"} 
                      type="button"
                    >
                      Insert
                    </Button> 

                    <Button
                      onClick={() => links.move(1, 0)}  
                      className="flex flex-1" 
                      variant={"secondary"} 
                      type="button"
                    >
                      Move
                    </Button>

                    <Button
                      onClick={() => links.replace([])}  
                      className="flex flex-1" 
                      variant={"secondary"} 
                      type="button"
                    >
                      Replace
                    </Button>

                    <Button
                      onClick={() => links.swap(3, 1)}  
                      className="flex flex-1" 
                      variant={"secondary"} 
                      type="button"
                    >
                      Swap
                    </Button>
                  
                    <Button
                      onClick={() => {
                        // links.update(1, { title: 'Update title', url: 'Update url' })
                        form.setValue('links.1.title', 'Update Title')
                        form.setValue('links.1.url', 'Update URL')
                      }}  
                      className="flex flex-1" 
                      variant={"secondary"} 
                      type="button"
                    >
                      Update
                    </Button>
                  
                </div>
            </form>
          </FormProvider>
        </div>
    </div>
  )
}