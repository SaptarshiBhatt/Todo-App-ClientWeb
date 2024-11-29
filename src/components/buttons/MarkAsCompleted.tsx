import { Button } from "@nextui-org/react";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const MarkAsCompleted = ({todoId}: {todoId: string}) => {

    // Access the client
    const queryClient = useQueryClient()
    const handleComplete = async (id: string) => {
        const completeStatus = {
            isCompleted: true
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
            <Button onClick={() => handleComplete(todoId)} size="sm" color="success" variant="light">
                <span>Mark as complete</span>
            </Button>
        </>
    );
}

export default MarkAsCompleted;