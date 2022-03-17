import Head from "next/head"

interface LayoutProps {
    children?: any
    tabTitle?: string
}

export default function Layout(props: LayoutProps) {
    return (
        <>
            <Head>
                <title>{props.tabTitle ?? 'TodoList'}</title>
            </Head>
            <div className="
            h-screen w-screen flex flex-col justify-center items-center
            bg-gradient-to-tr from-green-100 to-green-400
            ">
                {props.children}
            </div>
        </>
    )
}