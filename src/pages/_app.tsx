import '../styles/globals.scss'
import '../styles/antd.less'
import type { AppProps } from 'next/app'
import { TaskProvider } from '../data/context/TaskContext'
import { AuthProvider } from '../data/context/AuthContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <TaskProvider>
        <Component {...pageProps} />
      </TaskProvider>
    </AuthProvider>
  )
}

export default MyApp
