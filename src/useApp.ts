import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

export function useApp() {

  const schema = z.object({
    links: z.array(
      z.object({
        title: z.string().min(2, 'Informe o título'),
        url: z.string().min(6, 'Informe uma URL válida'),
      })
    ),
  });
  
  type FormData = z.infer<typeof schema>


  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      links: [
        { title: 'Link 01', url: 'https://instagram.com' },
        { title: 'Link 02', url: 'https://instagram.com' },
      ]
    }
  })

  
  const links = useFieldArray({
    control: form.control,
    name: 'links'
  })

  const handleSubmit = form.handleSubmit(async (data) => {    
    try {
      console.log(data.links.map((link, index) => ({
        ...link,
        order: index
      })))
    } catch {
      console.log('Ocorreu um erro') 
    }
  })
  
  return {
    handleSubmit,
    form,
    links,
  }
}