import { Button, Card, Input, message } from 'antd'
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore'
import type { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next'
import { useEffect, useState } from 'react'

import Layout from '../components/Layout'
import TaskCard from '../components/TaskCard'
import useTasks from '../data/hooks/useTasks'
import { db } from '../firebase/clientApp'
import TaskModel from '../models/TaskModel'

interface Props {
  taskSnap: TaskModel[]
}


// export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
//   const querySnapshot = await getDocs(collection(db, 'tasks').withConverter(cityConverter));

//   let taskSnap: {id: string, name: string, completed: boolean}[] = [];
//   querySnapshot.forEach((doc) => {
//     taskSnap.push(doc.data().toJson())
//   })

//   return {
//     props: {
//       taskSnap: taskSnap
//     }
//   }
// }


const Home: NextPage<Props> = ({ taskSnap }) => {


  const { tasks, addNewTask } = useTasks();
  const [newTaskName, setNewTaskName] = useState('');


  //LOGIC
  async function handleAddNewTask() {
    if (newTaskName) {
      const res = await addNewTask(newTaskName);
      setNewTaskName('');
    } else {
      message.warning('Sua nova tarefa esta sem nome')
    }
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

  const log = () => tasks.map(task => console.log(task.toJson()));

  return (
    <Layout>
      <Card style={{ width: "40%", height: "80%", borderRadius: "10px" }}>
        <div className='w-full h-full'>
          <p className='text-center text-3xl'>TodoList</p>
          {addNewTaskCard()}
          {taskList()}
        </div>
      </Card>
      <button onClick={log} >Log</button>
    </Layout>
  )
}

export default Home
