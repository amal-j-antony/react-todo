import commonAPI from "./commonAPI"

const serverURL = "https://react-todo-aado.onrender.com"

//add task
export const addTaskAPI = async (reqBody) => {
    const response = await commonAPI("POST",`${serverURL}/todos`,reqBody)
    return response
}

// get a task by id
export const getTaskByIdAPI = async (id) => {
    const response = await commonAPI("GET",`${serverURL}/todos/${id}`,"")
    return response
}

//get all tasks
export const getTasksAPI = async () => {
    const response = await commonAPI("GET", `${serverURL}/todos`,"")
    return response
}

//EDIT TASKS
export const updateTaskAPI = async (id,reqBody) => {
    const response = await commonAPI("PUT", `${serverURL}/todos/${id}`,reqBody)
    return response
}

//delete task
export const deleteTaskAPI = async (taskId) => {
    const response = await commonAPI("DELETE", `${serverURL}/todos/${taskId}`)
    return response
}