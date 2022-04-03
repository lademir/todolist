
import { Input, Space, Button, Spin } from "antd";
import { KeyOutlined, UserOutlined } from '@ant-design/icons';
import { useState } from "react";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import { Icons } from "../../Utils/Icons";
import useAuth from "../../data/hooks/useAuth";




export default function Login() {

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [Loading, setLoading] = useState(false);

    const { loginGoogle, createUserWithEmailAndPassword } = useAuth();

    const router = useRouter();



    //FUNCTION
    function handleLogin() {

        createUserWithEmailAndPassword(email, password);

    }

    async function handleLoginGoogle() {
        await loginGoogle();
    }

    function handleRecoverPassword() {
        router.push('/')
    }

    //JSX
    function Inputs() {
        return (
            <Space direction="vertical">
                <Input
                    style={{ borderRadius: '10px' }}
                    placeholder="Email"
                    prefix={<UserOutlined />}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Input.Password
                    style={{ borderRadius: '10px' }}
                    placeholder="Senha"
                    prefix={<KeyOutlined />}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </Space>
        )
    }

    function nameOrIcon(name: string) {
        if (Loading) {
            return <Spin />
        } else {
            return name
        }
    }


    return (
        <Layout tabTitle="Login">
            <div className="flex flex-col bg-lightGray-200 p-16">
                <div className="mb-5">
                    <p className="text-3xl text-center mb-1">Login</p>
                    <span className="text-gray-400">Preencha os campos abaixo para entrar na sua conta</span>
                </div>
                {Inputs()}
                <div className="flex flex-col w-full gap-y-5">
                    <Button onClick={handleLogin} size='large'
                        style={{ borderRadius: '10px 10px 10px 10px', marginTop: '1rem' }}
                        type="primary" ghost={Loading}>
                        {nameOrIcon('Login')}
                    </Button>
                    <div className="flex w-full justify-center items-center">
                        <Button onClick={handleLoginGoogle} shape="round" style={{ display: 'flex', alignItems: "center" }}>
                            Google {Icons.google}
                        </Button>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
