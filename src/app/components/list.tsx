import { useRouter } from "next/navigation"
import type {Todos} from '../../types/types'
import { convertDate, dateDiff } from "@/app/helper/dateConvert";
import { Checkbox } from "@/app/components/Checkbox";
import { SearchField } from "./SearchField";
import { useState } from "react";

interface Props{
    items: Todos[]
}

export const List = (children : Props) =>{
    const router = useRouter();
    const [input, setInput] = useState<string>('');

    const click = (id: string) => {
        router.push('/'+id)
    }

    const inputChanged = (input: string) => {
        setInput(input)
    }

    const strComp = (field: string) : boolean => {
        return field.toUpperCase().includes(input.toUpperCase())
    }

    const sortedList = children.items.sort((a, b) => (new Date(a?.dateTime) as any) - (new Date(b?.dateTime) as any))

    const mappedList = sortedList.map((item: Todos, i: number) => {

        const opacity = item.completed ? 'opacity-70' : 'opacity-100';
        const strikeOutText = item.completed ? 'text-decoration-line: line-through' : '';

        if(strComp(item.todo) || strComp(item.description))
        return (
            <li onClick={()=>click(item.id)} key={i} className={`flex justify-between gap-x-6 py-3 md:py-5 cursor-pointer ${opacity}`}>
            
            <div className="flex min-w-0 gap-x-4">
                <Checkbox id={item.id} completed={item.completed}/>

                <img alt="" src={
                    item.imageUrl ?? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGh5WFH8TOIfRKxUrIgJZoDCs1yvQ4hIcppw&s'
                } className="size-16 flex-none rounded-full bg-gray-50" />
                <div className="min-w-0 flex-auto pt-2">
                    <p className={`text-sm/12 font-semibold text-gray-900 ${strikeOutText}`}>{item.todo}</p>
                    <p className={`mt-1 truncate text-xs/5 text-gray-500 ${strikeOutText}`}>{item.description}</p>
                </div>
            </div>
            
            <div className=" sm:flex sm:flex-col sm:items-end pt-6 relative end-4">
                <div className="flex">
                    <p className="text-xs md:text-sm/6 text-gray-900">{item.dateTime ? dateDiff(item.dateTime) : ''}</p>
                    <div className="hidden sm:block pl-2 pt-0.5">
                        <img src="bell.png" width={18} />
                    </div>
                    
                </div>
            </div>
        </li>
        )
    })

    return (
        <div>
            <SearchField inputChanged={inputChanged}/>
            <ul role="list" className="divide-y divide-gray-100 py-10 px-0 md:px-20">
                {mappedList}
            </ul>
        </div>
    )
}