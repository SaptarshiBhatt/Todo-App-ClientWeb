import { Button, Input } from "@nextui-org/react";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { BiPlus } from "react-icons/bi";
import 'react-toastify/dist/ReactToastify.css';

const CreateTodo = () => {
    const [todo, setTodo] = useState("")

      // Access the client
  const queryClient = useQueryClient()

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const todoObj = {
            text: todo
        }

        try {
            await axios.post("http://localhost:8000/todos", todoObj)

            queryClient.invalidateQueries({queryKey: ['todos']})
        } catch (error) {
            console.log(error);
            
        }

        
    }
    return (
        <>
        <form className="w-full flex md:flex-row flex-col mt-4 gap-5" onSubmit={handleSubmit}>

            <Input onChange={(e) => setTodo(e.target.value)} variant="underlined" color="primary" className="w-full" radius="sm" size="sm" placeholder="Write what to do"/>
            <Button type="submit" color="primary" variant="flat" radius="sm" size="lg" className="flex justify-center font-bold items-center gap-3">
                <p className="font-bold"><BiPlus size={20}/></p>
                Add Task
            </Button>
        </form>
        </>
    );
}

export default CreateTodo;