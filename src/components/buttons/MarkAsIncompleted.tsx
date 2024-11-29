import { Button } from "@nextui-org/react";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const MarkAsIncompleted = ({todoId}: {todoId: string}) => {



     // Access the client
     const queryClient = useQueryClient()
     const handleComplete = async (id: string) => {
         const completeStatus = {
             isCompleted: false
         }
 
         try {
             await axios.patch(`http://localhost:8000/todos/${id}`, completeStatus)
 
             queryClient.invalidateQueries({queryKey: ['todos']})
             
             
                

            } catch (error) {
             console.log(error);
            }
        }
    return (
        <>
            <Button onClick={() => handleComplete(todoId)} size="sm" color="danger" variant="light">
                <span>Mark as incomplete</span>
            </Button>
        </>
    );
}

export default MarkAsIncompleted;