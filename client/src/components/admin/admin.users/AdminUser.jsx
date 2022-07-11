const User = ({ user }) => {
    return (
        <tr>
            <td className="p-4">
                <h4>{user.name}</h4>
            </td>
            <td className="p-4">
                <h4>{user.id}</h4>
            </td>
            <td className="p-4">
                <h4>{user.email}</h4>
            </td>
            <td className="p-4">
                <h5>{user.phone}</h5>
            </td>
            <td className="p-4">
                <h5>{user.address}</h5>
            </td>
        </tr>
    )
}

export default User