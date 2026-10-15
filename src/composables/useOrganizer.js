import { ref, watch } from 'vue'

function createCollection(key, initial = []) {
  let saved = []

  try {
    saved = JSON.parse(localStorage.getItem(key) || '[]')
  } catch {
    saved = []
  }

  const items = ref(Array.isArray(saved) ? saved : initial)

  watch(
    items,
    value => localStorage.setItem(key, JSON.stringify(value)),
    { deep: true }
  )

  function add(data) {
    items.value.push({
      ...data,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    })
  }

  function update(id, data) {
    const index = items.value.findIndex(item => item.id === id)
    if (index !== -1) {
      items.value[index] = { ...items.value[index], ...data }
    }
  }

  function remove(id) {
    items.value = items.value.filter(item => item.id !== id)
  }

  return { items, add, update, remove }
}

export const tasks = createCollection('lifesync-tasks')
export const events = createCollection('lifesync-events')
export const goals = createCollection('lifesync-goals')