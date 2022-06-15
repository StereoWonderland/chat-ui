import Alert from 'react-bootstrap/Alert'

const Notification = ({ message }) => {
    if (message === null) {
        return null
    }

    return (
      <Alert variant="danger">
            {message}
      </Alert>
    )
}

export default Notification
