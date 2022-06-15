import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Alert from 'react-bootstrap/Alert'
import { useState } from 'react'
import axios from 'axios'
import loginService from '../services/login'
import chatService from '../services/chat'

const Login = ({ setErrorMessage, setUser }) => {
    const [ username, setUsername ] = useState('')
    const [ password, setPassword] = useState('')

    const handleNameChange = (event) => {
        setUsername(event.target.value)
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }

    const handleLogin = async (event) => {
        event.preventDefault()

        try {
            const user = await loginService.login({
                username, password
            })

            setUser(user)
            chatService.setToken(user.token)
            setUsername('')
            setPassword('')
        } catch (exception) {
            setErrorMessage('Incorrect credentials')
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }

    const createAccount = (event) => {
        const userObject = { username, password }

        if (username === '') {
            setErrorMessage('Username cannot be empty')
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        } else {
            axios.post('http://localhost:3001/api/users', userObject)
        }

    }

    return (
        <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Username</Form.Label>
                <Form.Control
                    placeholder="Enter name"
                    onChange={handleNameChange}
                    value={username}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Enter password"
                    onChange={handlePasswordChange}
                    value={password}/>
            </Form.Group>
            <div className="btn-group">
            <Button variant="primary" type="submit">
            Login
            </Button>
            <Button variant="outline-primary" type="button" onClick={createAccount}>
            Create account
            </Button>
            </div>
        </Form>
    )
}

export default Login
