import chatService from '../services/chat'
import userService from '../services/user'
import { useState, useEffect, useRef } from 'react'
import Table from 'react-bootstrap/Table'
import Form from 'react-bootstrap/Form'
import { Container, Row, Col } from 'react-bootstrap'
import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button'
import Users from './Users'

const Chat = ({ user, setErrorMessage, socket }) => {
    const [ users, setUsers ] = useState({})
    const [ messages, setMessages ] = useState([])
    const [ targetUserId, setTargetUserId ] = useState(null)
    const [ chatMessage, setChatMessage ] = useState('')

    const getUsersAndMessages = () => {
        userService.getAll()
            .then(response => {
                const userDict = {}
                response.data.forEach(user => {
                    userDict[user.id] = user.username
                })
                return userDict
            })
            .then(response => setUsers(response))
        chatService.getAll().then(response => setMessages(response.data))
    }

    useEffect(() => {
        getUsersAndMessages()
    }, [])

    socket.on('chat message', (message) => {
        setMessages(messages.concat(message))
    })

    const handleTargetUserChange = (selectedUserId) => () => {
        if (users[selectedUserId] === user.username) {
            setTargetUserId(null)
        } else {
            setTargetUserId(selectedUserId)
        }
    }

    const handleChatMessageChange = (event) => {
        setChatMessage(event.target.value)
    }

    const handleSendMessage = (event) => {
        event.preventDefault()

        if (chatMessage === '') {
            setErrorMessage('Cannot send an empty message')
            return setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }

        chatService.sendMessage(chatMessage, targetUserId)
            .then(message => {
                setMessages(messages.concat(message.data))
                setChatMessage('')
                return message.data
            })
            .then(message => {
                chatService.sendMessageSocket(message, socket)
            })
            // console.log(err)
            // setErrorMessage('Error sending message')
            // setTimeout(() => {
            //     setErrorMessage(null)
            // }, 5000)
    }

    const messagesEndRef = useRef(null)

    const scrollToBottom = (isSmooth) => () => {
        if (targetUserId !== null) {
            messagesEndRef.current.scrollIntoView({ behavior: isSmooth ? "smooth" : "auto" })
        }
    }

    useEffect(scrollToBottom(false), [targetUserId])
    useEffect(scrollToBottom(true), [messages.length])

    return (
        <div>
            <p>Logged in as {user.username}</p>
            <p className="text-primary">Chatting with {targetUserId === null ? 'nobody' : users[targetUserId]}</p>
            <Container>
            <Row>
                <Col>
                    <Row><p>Users</p></Row>
                    <Row className="chatlog">
                    <Users handleTargetUserChange={handleTargetUserChange} users={users}/>
                    </Row>
                </Col>
                <Col xs={10}>
                    {targetUserId == null
                     ?
                     <p style={{textAlign: "left"}} className="text-primary">👈 <i>Select a user to chat with</i></p>
                     :
                    <Container>
                        <div className="chatlog">
                        {messages
                         .filter(message => (message.from === targetUserId) || (message.to === targetUserId))
                         .map(message =>
                            <Row key={message.id}>
                                <Col style={{textAlign: "left"}} className={(users[message.to] === user.username) ? "text-primary" : "text-body"}>
                                    <b>{users[message.from]}:</b> {message.content}
                                </Col>
                            </Row>
                        )}
                            <div ref={messagesEndRef}/>
                        </div>
                        <Col>
                            <Form onSubmit={handleSendMessage}>
                            <InputGroup>
                                <Form.Control
                                    onChange={handleChatMessageChange}
                                    value={chatMessage}
                                />
                                <Button
                                    variant="outline-secondary"
                                    type="submit">
                                    Send
                                </Button>
                            </InputGroup>
                            </Form>
                        </Col>
                    </Container>
                    }
                </Col>
            </Row>
            </Container>
        </div>
    )
}

export default Chat
