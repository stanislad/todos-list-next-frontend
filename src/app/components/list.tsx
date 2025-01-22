import { useRouter } from "next/navigation"
import type {Todos} from '../../types/types'
import { convertDate } from "@/app/helper/dateConvert";
import { Checkbox } from "@/app/components/Checkbox";

interface Props{
    items: Todos[]
}

export const List = (children : Props) =>{
    const router = useRouter();

    const click = (id: string) => {
        router.push('/todo/'+id)
    }

    const mappedList = children.items.map((item: Todos, i: number) => {

        const opacity = item.completed ? 'opacity-70' : 'opacity-100';

        return (
            <li onClick={()=>click(item.id)} key={i} className={`flex justify-between gap-x-6 py-5 cursor-pointer ${opacity}`}>
            
            <div className="flex min-w-0 gap-x-4">
                <Checkbox id={item.id} completed={item.completed}/>

                <img alt="" src={
                    item.imageUrl ?? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGh5WFH8TOIfRKxUrIgJZoDCs1yvQ4hIcppw&s'
                } className="size-16 flex-none rounded-full bg-gray-50" />
                <div className="min-w-0 flex-auto pt-2">
                    <p className="text-sm/12 font-semibold text-gray-900">{item.todo}</p>
                    <p className="mt-1 truncate text-xs/5 text-gray-500">{item.description}</p>
                </div>
            </div>
            
            <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                <p className="text-sm/6 text-gray-900">{convertDate(item.createdAt.toString())}</p>
            </div>
        </li>
        )
    })

    return (
        <ul role="list" className="divide-y divide-gray-100 py-10 px-20">
            {mappedList}
        </ul>
    )
}