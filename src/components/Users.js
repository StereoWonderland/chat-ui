import { Button, ButtonGroup, Table }  from 'react-bootstrap'

const Users = ({ users, handleTargetUserChange }) => {

    return (
        <Table>
            <tbody>
                {Object.keys(users).map(key => (
                    <tr key={key}>
                        <td className="d-grid">
                            <Button className="btn-sm btn-light"
                                    onClick={handleTargetUserChange(key)}>
                                {users[key]}
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    )
}

export default Users
