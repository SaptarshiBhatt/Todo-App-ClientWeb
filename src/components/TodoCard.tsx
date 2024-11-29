import React, { useState } from "react";
import {Card, CardHeader, CardBody, CardFooter, Divider, Link, Image, Chip, Button, useDisclosure} from "@nextui-org/react";
import { MdOutlinePending } from "react-icons/md";
import { EditDocumentIcon } from "./ui/EditDocumentIcon";
import { DeleteDocumentIcon } from "./ui/DeleteDocumentIcon";
import { Todo } from "@/utils/TodoType";
import { IoMdDoneAll } from "react-icons/io";
import UpdateModal from "./updateModal/UpdateModal";
import DeleteButton from "./buttons/DeleteButton";
import MarkAsIncompleted from "./buttons/MarkAsIncompleted";
import MarkAsCompleted from "./buttons/MarkAsCompleted";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useAtom } from "jotai";
import { UpdateAtom } from "@/utils/UpdateAtom";



export default function TodoCard({info}: {info: Todo}) {
  const [fetchedTodo, setFetchedTodo] = useAtom(UpdateAtom)

  const handleFetch = async (id: string) => {
    try {
      const res = await axios.get(`http://localhost:8000/todos/${id}`)
      const data = res.data.result

      console.log(data);
      setFetchedTodo(data)

      console.log(fetchedTodo);
      
      
    } catch (error) {
      console.log(error);
    }
  }

  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  return (
    <Card className="w-full border">

        {
            info?.isCompleted ? (
                <CardHeader className="flex gap-3 justify-between items-center">
                    <IoMdDoneAll size={40} color="green"/>
                    <Chip color="success" variant="dot" className="border-none">Completed</Chip>
                </CardHeader>
            ) : (
                <CardHeader className="flex gap-3 justify-between items-center">
                    <MdOutlinePending size={40} color="red"/>
                    <Chip color="danger" variant="dot" className="border-none">Pending</Chip>
                </CardHeader>
            )
        }

      


      <CardBody>

        <p>{info?.text}</p>
      </CardBody>
      <CardFooter>
        <div className="flex justify-between items-center w-full">
            {
                info?.isCompleted ? <MarkAsIncompleted todoId={info.uid}/> : <MarkAsCompleted todoId={info.uid}/>
            }
            
            <div className="flex justify-center items-center gap-3">
                <Button onClick={() => {
                  onOpen();
                  handleFetch(info.uid)
                }} isIconOnly size="lg" color="warning" variant="light">
                    <EditDocumentIcon/>
                </Button>
                <UpdateModal isOpen={isOpen} onOpenChange={onOpenChange}/>
                <DeleteButton todoId={info?.uid}/>
            </div>
        </div>
      </CardFooter>
    </Card>
  );
}
