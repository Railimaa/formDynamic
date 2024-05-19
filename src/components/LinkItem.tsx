import { cn } from "@/lib/utils";
import { Reorder, useDragControls } from "framer-motion";
import { GripVerticalIcon, Trash2Icon } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { Label } from "./ui/Label";

interface ILinkItemProps {
  index: number;
  isDraggingActive?: boolean;
  link: {
    title: string;
    url: string
  };
  handleDragStart: () => void;
  handleDragEnd: () => void;
  onRemove: () => void;
}

export function LinkItem({ link, index, isDraggingActive, handleDragStart, handleDragEnd, onRemove }: ILinkItemProps) {
  const controls = useDragControls();
  const form = useFormContext();
  
  return (
    <Reorder.Item 
      value={link}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      className="relative"
      dragListener={false}
      dragControls={controls}
  >
    <div 
      className={cn(
        "flex gap-4 transition-opacity ",
        isDraggingActive && 'opacity-50'
      )}
    >
        <div className="flex flex-1 gap-4 items-end">
            <Button 
              type="button"
              variant={"link"}
              onPointerDown={e => controls.start(e)}
              className="cursor-grab"
            >
                <GripVerticalIcon className="size-4"/>
            </Button>

            <div className="flex-1 space-y-1">
              <Label htmlFor="Titulo">Titulo</Label>
              <Input 
                id="Titulo" 
                {...form.register(`links.${index}.title`)}
                error={form.formState.errors.links?.[index]?.title?.message} 
              />  
            </div>
        </div>


        <div className="flex gap-4 items-end">
            <div className="flex-1 space-y-1">
              <Label htmlFor="URL">URL</Label>
              <Input 
                id="URL" {...form.register(`links.${index}.url`)} 
                error={form.formState.errors.links?.[index]?.url?.message}
              />  
            </div>

              <Button
                onClick={onRemove} 
                variant={"destructive"} 
                type="button"
                tabIndex={-1}
              >
                <Trash2Icon className="size-4"/>
              </Button>
        </div>
      </div>
  </Reorder.Item>
  )
}