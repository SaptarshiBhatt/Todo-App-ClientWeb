import { Button } from "@nextui-org/react";
import { DeleteDocumentIcon } from "../ui/DeleteDocumentIcon";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";

const DeleteButton = ({todoId}: {todoId: string}) => {


          // Access the client
  const queryClient = useQueryClient()

    const handleDelete = async (id: string) => {

        try {
            await axios.delete(`http://localhost:8000/todos/${id}`)

            queryClient.invalidateQueries({queryKey: ['todos']})
        } catch (error) {
         console.log(error);
            
        }
        
    }
    return (
        <>
            <Button onClick={() => handleDelete(todoId)} size="lg" isIconOnly color="danger" variant="light">
                <DeleteDocumentIcon/>
            </Button>
        </>
    );
}

export default DeleteButton;