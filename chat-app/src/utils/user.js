const users = []

// Add User
const addUser = ({ id, username, room }) => {
    // Clean the data
    username = username.trim().toLowerCase()
    room = room.trim().toLowerCase()

    // Username and room is empty
    if (!username || !room) {
        return {
            error: 'Username and Room is Required'
        }
    }

    // User is already existed

    const existingUser = users.find(user => {
        return user.room === room && user.username === username
    })

    // Validate Username
    if (existingUser) {
        return {
            error: 'Username is in use!'
        }

    }
    // Store User
    const user = { id, username, room }
    users.push(user)

    return { user }

}

// Remove User
const removeUser = (id) => {
    const index = users.findIndex(user => user.id === id)

    if (index !== -1) {
        return users.splice(index, 1)[0]
    }

}

// Get User
const getUser = (id) => {
    return users.find(user => user.id === id)

}

// Get User in Room

const getUserInRoom = (room) => {
    room = room.trim().toLowerCase();
    return users.filter(user => user.room === room)


}

module.exports = { addUser, removeUser, getUser, getUserInRoom }

