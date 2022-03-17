import '../styles/globals.scss'
import '../styles/antd.less'
import type { AppProps } from 'next/app'
import { TaskProvider } from '../data/context/TaskContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <TaskProvider>
      <Component {...pageProps} />
    </TaskProvider>
  )
}

export default MyApp
