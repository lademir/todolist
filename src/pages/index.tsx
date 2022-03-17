import { Button, Card, Input, message } from 'antd'
import type { GetServerSideProps, NextPage } from 'next'
import { useState } from 'react'

import Layout from '../components/Layout'
import TaskCard from '../components/TaskCard'
import useTasks from '../data/hooks/useTasks'
import TaskModel from '../models/TaskModel'

interface Props {
  tasks: TaskModel[]
}


export const getServerSideProps: GetServerSideProps = async () => {


  return {
    props: {

    }
  }
}


const Home: NextPage = () => {


  const { tasks, addNewTask } = useTasks();
  const [newTaskName, setNewTaskName] = useState('');


  //LOGIC
  function handleAddNewTask() {
    if (newTaskName) {
      addNewTask(newTaskName);
      setNewTaskName('');
    } else {
      message.warning('Sua nova tarefa esta sem nome')
    }


    // (document.querySelector('#username') as HTMLInputElement).value = '';
  }


  //JSX
  function addNewTaskCard() {
    return (
      <div className='w-full flex justify-evenly bg-gray-100 py-4 rounded-md gap-x-11'>
        <Input value={newTaskName} onChange={(e) => setNewTaskName(e.target.value)} style={{ width: "50%" }} placeholder='Ler 10 páginas do ...' />
        <Button onClick={handleAddNewTask}>Adicionar</Button>
      </div>
    )
  }

  function taskList() {
    return (
      <div className='flex w-full justify-center h-full'>
        <div className='bg-gray-100 w-8/12 h-full'>
          {tasks.map((task) => {
            return <TaskCard key={task.id} task={task} />
          })}
        </div>
      </div>
    )
  }

  return (
    <Layout>
      <Card style={{ width: "40%", height: "80%", borderRadius: "10px" }}>
        <div className='w-full h-full'>
          <p className='text-center text-3xl'>TodoList</p>
          {addNewTaskCard()}
          {taskList()}
        </div>
      </Card>
    </Layout>
  )
}

export default Home
