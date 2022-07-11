import AdminUser from "./AdminUser"

const UsersList = ({ users }) => {
    return (
        <>
            { users.map((user) => <AdminUser user={user} key={user.id} /> )}
        </>
    )
}

export default UsersList