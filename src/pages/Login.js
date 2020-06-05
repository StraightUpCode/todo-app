import React , {useContext, useState} from 'react'
import UserContext from '../context/UserContext'
import { Form, Input, Button } from 'antd'


const API_ROUTE = 'https://pwa-postgre.herokuapp.com'

const RegisterForm = (props) => {
    const [form] = Form.useForm()

    const handleRegister = values => {
    
        console.log('Submit')
        console.log(values)
    }

    console.log('Form', form)
    return (

        <Form form={form} 
        id="log" 
        className="email-login"
        onFinish={handleRegister}
        scrollToFirstError
        >
            <Form.Item //className="form-group"
                label="Username"
                name="username"
            >
                <Input type="text" className="form-control" id="username" aria-describedby="emailHelp"></Input>
            </Form.Item>
            <Form.Item //className="form-group"
                label="E-mail"
                name="mail"
            >
                <Input type="email" className="form-control" id="mail"></Input>
            </Form.Item>
            <Form.Item //className="form-group"
                label="Password"
                name="password"
            >
                <Input.Password type="password" className="form-control" id="pass"></Input.Password>
            </Form.Item>
            <Form.Item //className="form-group"
                label="Confirm Password"
                name="confirm"
                dependencies={['password']}
                hasFeedback
                rules={[
                    {
                      required: true,
                      message: 'Please confirm your password!',
                    },
                    ({ getFieldValue }) => ({
                      validator(rule, value) {
                        console.log("Validating")
                        if (!value || getFieldValue('password') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject('The two passwords that you entered do not match!');
                      },
                    }),
                  ]}
            >
                <Input.Password type="password" className="form-control" id="passConf"></Input.Password>
            </Form.Item>

            <Form.Item className="text-center" >
                <Button htmlType="submit" id="boton" className="btn btn-primary">Create</Button>

            </Form.Item>

        </Form>
    )
}



const LoginForm = (props) => {

    const [form] = Form.useForm()
    const {logInUser} = useContext(UserContext)
    const handleSubmit = () => {
        const loginForm = form.getFieldsValue()
        console.log(loginForm)

        fetch(`${API_ROUTE}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginForm)
        }).then(res => res.json())
            .then(res => {
                console.log('user')
                logInUser(res.user)
            })
            .catch(err => console.log(err));


    }


    return (
        <Form
            form={form}
            onFinish={handleSubmit}

            id="log" className="email-login">
            <Form.Item className="form-group"
                label="Username"
                name="username"
            >
                <Input type="text" className="form-control" id="username" aria-describedby="emailHelp"></Input>
            </Form.Item>
            <Form.Item className="form-group"
                label="Password"
                name="password"
            >
                <Input.Password className="form-control" id="pass"></Input.Password>
            </Form.Item>
            <Form.Item className="text-center" >
                <Button htmlType="submit" className="btn btn-primary" id="boton">Login</Button></Form.Item>
        </Form>

    )
}

const LoginPage = (props) => {

    const [transitionRL, setTransitionRL] = useState(true)

    const goToRegister = e => {
        setTransitionRL(false)
    }
    const goToLogin = e => {
        setTransitionRL(true)
    }

    console.log('Login')
    return (
        <div>
            <h3 className="display-4 text-center mt-5" id="cuenta">Cuenta</h3>
            <div id="login" className="mx-auto">
                <div id="header" className="card-header">
                    <a onClick={goToLogin} href="#" className="active" id="login-box-link">Log in</a>
                    <a onClick={goToRegister} href="#" className="active" id="signup-box-link">Register</a>
                </div>

                {transitionRL ? <LoginForm /> : <RegisterForm />}

            </div>
        </div>
    )
}



export default LoginPage