import { Todo } from "@/utils/TodoType";
import { Spinner, Tab, Tabs } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import TodoCard from "./TodoCard";
import { useRouter } from "next/router";
import Link from "next/link";
import { useAtom } from "jotai";
import { RefetchAtom } from "@/utils/RefetchAtom";
import { useEffect } from "react";

const CompletedTodos = () => {
    const router = useRouter()
    const [load, setLoad] = useAtom(RefetchAtom)


    const links = [
        {name: "All todo", path: "/"},
        {name: "Completed", path: "/completed"},
        {name: "Pending", path: "/pending"}
    ]

    const {data, isError, isFetched, isLoading, isFetching, isSuccess} = useQuery({
        queryKey: ['todos'],
        queryFn: async () => {
            const req = await axios.get("http://localhost:8000/todos/completed/true")
            const res = req.data.result

            console.log(res);

            const data = res.reverse()


            return data as Array<Todo>
            
        },
        refetchOnWindowFocus: false
    })

    useEffect(() => {
        if (isFetching || isLoading) {
            setLoad(true)
        } else {
                setLoad(false)
        }
    }, [isLoading, isFetching])
    return (
        <>

                {
                    isLoading || isFetching &&(
                        <div className="flex justify-center items-center absolute w-full left-0 right-0">
                            <Spinner color="primary"/> Loading...
                        </div>
                    )
                }
            <div className="w-full font-bold flex items-center gap-6">
                {links.map(items => (
                    <Link className={items.path === router.pathname ? "p-3 border-b-2 border-primary text-primary" : ""} key={items.path} href={items.path}>{items.name}</Link>
                ))}
            </div>


            {
                isSuccess && isFetched &&(
                    <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4">
                        {
                            data?.map((item) => {
                                return <TodoCard key={item.uid} info={item}/>
                            })
                        }
                    </div>
                )
            }
        </>
    );
}

export default CompletedTodos;