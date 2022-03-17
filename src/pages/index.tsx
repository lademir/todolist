import { Button, Card, Input } from 'antd'
import type { GetServerSideProps, NextPage } from 'next'

import Layout from '../components/Layout'
import TaskCard from '../components/TaskCard'
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

  const tasks: TaskModel[] = [
    TaskModel.create('1', 'Capoeira'),
    TaskModel.create('2', 'Estucar Calculo 1'),
    TaskModel.create('3', 'Estagio'),
    TaskModel.create('4', 'Aula de Biologia'),
    TaskModel.create('5', 'Redação da semana'),
  ]


  //JSX
  function addNewTaskCard() {
    return (
      <div className='w-full flex justify-evenly bg-gray-100 py-4 rounded-md gap-x-11'>
        <Input style={{ width: "50%" }} placeholder='Ler 10 páginas do ...' />
        <Button>Adicionar</Button>
      </div>
    )
  }

  function taskList() {
    return (
      <div className='flex w-full justify-center h-full'>
        <div className='bg-gray-100 w-6/12 h-full'>
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
