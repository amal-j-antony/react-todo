import React, { useEffect, useState } from 'react'
import { addTaskAPI, deleteTaskAPI, getTaskByIdAPI, getTasksAPI, updateTaskAPI } from './services/allAPI'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"



function Home() {
    const [task, setTask] = useState({
        title: "",
        description: "",
        status: "pending",
    })
    const [allTasks, setAlltasks] = useState([])
    const [editId, setEditId] = useState("")
    console.log(allTasks);

    console.log(task);

    const handleAdd = async () => {
        try {
            const result = await addTaskAPI(task)
            console.log(result);
            if (result.status == 201) {
                alert("Task added successfully")
                setTask({
                    title: "",
                    description: "",
                    status: "pending",
                })
                getTasks()
            } else {
                alert("Task failed")
            }
        } catch (error) {
            console.log(error);
        }
    }

    const getTasks = async () => {
        try {
            const result = await getTasksAPI()
            console.log(result);
            if (result.status == 200) {
                setAlltasks(result.data)
            }

        } catch (error) {
            console.log(error);
        }
    }

    const handleDelete = async (taskId) => {
        try {
            const result = await deleteTaskAPI(taskId)
            console.log(result);
            getTasks()

        } catch (error) {
            console.log(error);
        }
    }
    const handleEdit = async (editId) => {
        setEditId(editId)
        try {
            const result = await getTaskByIdAPI(editId)
            setTask(result.data)
        } catch (error) {
            console.log(error);

        }

        console.log("edit handle", editId);
    }

    const putEdit = async (editId, editBody) => {
        try {
            const result = await updateTaskAPI(editId, editBody)
            console.log(result);
            setEditId("")
            setTask({
                title: "",
                description: "",
                status: "pending",
            })
            getTasks()

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getTasks()
    }, [])

    return (
        <>
            <main className='w-full flex flex-col justify-center items-center'>
                <h1 className='w-full bg-slate-200 text-white text-center text-8xl font-bold py-20'>Todo List</h1>
                <section className='container flex justify-center '>
                    <div className='flex flex-col gap-5'>
                        {
                            editId ?
                                <span className='text-4xl font-bold py-10'>Update task</span>
                                :
                                <span className='text-4xl font-bold py-10'>Add task</span>
                        }
                        <input onChange={(e) => setTask({ ...task, title: e.target.value })} value={task.title} className='border border-slate-500 py-2 px-5 rounded-2xl' type="text" placeholder='Add task title' />
                        <input onChange={(e) => setTask({ ...task, description: e.target.value })} value={task.description} className='border border-slate-500 py-2 px-5 rounded-2xl' type="text" placeholder='Add task description' />
                        {
                            editId &&
                            <select onChange={(e) => setTask({ ...task, status: e.target.value })} className='border border-slate-500 py-2 px-5 rounded-2xl' name="" id="">
                                <option value="">Select status</option>
                                <option value="inProgress">In Progress</option>
                                <option value="pending">Pending</option>
                                <option value="completed">Completed</option>
                            </select>}
                        {
                            editId ?
                                <div className='flex justify-between'>
                                    <button onClick={() => {
                                        setEditId("")
                                        setTask({
                                            title: "",
                                            description: "",
                                            status: "pending",
                                        })
                                    }
                                    } className='border border-slate-500 px-5 py-2 rounded-2xl bg-slate-500 text-white cursor-pointer'>
                                        Cancel
                                    </button>
                                    <button onClick={() => putEdit(editId, task)} className='border border-slate-500 px-5 py-2 rounded-2xl bg-slate-500 text-white'>
                                        Edit task
                                    </button>
                                </div>
                                :
                                <div onClick={handleAdd} className='flex justify-end'>
                                    <button className='border border-slate-500 px-5 py-2 rounded-2xl bg-slate-500 text-white'>
                                        Add task
                                    </button>
                                </div>
                        }
                    </div>
                </section>
                <section className='container gap-10 flex flex-col items-center border border-slate-500 rounded-2xl min-h-[50vh] mt-10'>
                    <h1 className='pt-10 text-4xl'>Task list</h1>
                    <hr className='h-2 w-full text-slate-500 px-5' />
                    <div className='flex flex-wrap gap-10 justify-start px-10 container'>
                        {
                            allTasks.map((item, index) => (
                                <div key={item.id} className="flex flex-col gap-2 border border-slate-500 rounded-2xl p-5">
                                    <div className='flex gap-5 text-3xl font-bold text-slate-800'>
                                        <h1>#{index + 1}</h1>
                                        <h1 className=''>{item.title}</h1>
                                    </div>
                                    <p className='text-slate-500'>{item.description}</p>
                                    <div className="flex gap-5 max-md:flex-col">
                                        <span className='border border-slate-500 px-5 py-2 rounded-2xl bg-slate-500 text-white'>{item.status}</span>
                                        <button onClick={() => handleEdit(item?.id)} className='border border-slate-500 px-5 py-2 rounded-2xl bg-slate-500 text-white cursor-pointer'>Update</button>
                                        <button onClick={() => handleDelete(item.id)} className='border border-red-500 px-5 py-2 rounded-2xl bg-red-500 text-white cursor-pointer'>Delete</button>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </section>

            </main>
        </>
    )
}

export default Home