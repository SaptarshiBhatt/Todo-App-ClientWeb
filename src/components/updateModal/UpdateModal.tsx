import React, { useState } from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input} from "@nextui-org/react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Todo } from "@/utils/TodoType";
import { UpdateAtom } from "@/utils/UpdateAtom";
import { useAtom } from "jotai";

export default function UpdateModal({onOpenChange, isOpen}: {onOpenChange: () => void, isOpen: boolean}) {  
    const [todo, setTodo] = useAtom(UpdateAtom)

      // Access the client
      const queryClient = useQueryClient()
    
    const handleUpdate = async (e: any) => {
      e.preventDefault();

      const updateObj = {
        text: todo.text
      }

      try {
        await axios.patch(`http://localhost:8000/todos/${todo.uid}`, updateObj, {
          headers: {
            "Content-Type": "application/json"
          }
        })

        queryClient.invalidateQueries({queryKey: ['todos']})
      } catch (error) {
        
      }
      
    }

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Update Todo</ModalHeader>
              <form onSubmit={handleUpdate}>
              <ModalBody>
                <Input variant="underlined" color="primary" value={todo.text} onChange={(e) => setTodo({...todo, text: e.target.value})}/>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button variant="flat" type="submit" color="primary" onPress={onClose}>
                  Update
                </Button>
              </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
