  import { defineStore } from 'pinia'
  import { ref, computed } from 'vue'

  export const useUser = defineStore('user', () => {
    const users = ref([
      {
        id: '1',
        name: 'Alice Johnson',
        email: 'alice@example.com',
        username: 'alicej',
        dob: '1990-01-01',
        phone: '1234567890',
        role: 'manager'
      },
      {
        id: '2',
        name: 'Bob Smith',
        email: 'bob@example.com',
        username: 'bobsmith',
        dob: '1985-06-15',
        phone: '0987654321',
        role: 'admin'
      },
      {
        id: '3',
        name: 'Trịnh Hòa',
        email: 'trinhhoa.gl2005@gmail.com',
        username: 'trinhhoa',
        dob: '2005-04-12',
        phone: '0935900023',
        role: 'client'
      }
    ])

    const searchQuery = ref('')
    const filteredUsers = computed(() => {
      const q = searchQuery.value.toLowerCase()
      return users.value.filter(user =>
        user.name.toLowerCase().includes(q) ||
        user.email.toLowerCase().includes(q) ||
        user.username.toLowerCase().includes(q)
      )
    })

    const addUser = (user) => {
      const newId = String(users.value.length + 1)
      users.value.push({ ...user, id: newId })
    }

    const updateUser = (updatedUser) => {
      const index = users.value.findIndex(u => u.id === updatedUser.id)
      if (index !== -1) {
        users.value[index] = { ...updatedUser }
      }
    }

    const deleteUser = (user) => {
      users.value = users.value.filter(u => u.id !== user.id)
    }

    return {
      users,
      searchQuery,
      filteredUsers,
      addUser,
      updateUser,
      deleteUser
    }
  })
