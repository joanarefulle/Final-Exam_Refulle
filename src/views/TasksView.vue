<script setup>
import { computed, ref } from 'vue'
import { tasks } from '../composables/useOrganizer'

const blank = () => ({
  title: '',
  category: 'Study',
  dueDate: '',
  priority: 'Medium',
  completed: false,
})

const form = ref(blank())
const editingId = ref(null)
const search = ref('')

const filteredTasks = computed(() =>
  tasks.items.value.filter(task =>
    task.title.toLowerCase().includes(search.value.toLowerCase())
  )
)

function saveTask() {
  if (!form.value.title.trim()) return

  if (editingId.value) {
    tasks.update(editingId.value, { ...form.value })
  } else {
    tasks.add({ ...form.value })
  }

  cancelEdit()
}

function editTask(task) {
  editingId.value = task.id
  form.value = { ...task }
}

function cancelEdit() {
  editingId.value = null
  form.value = blank()
}

function deleteTask(id) {
  if (confirm('Delete this task?')) tasks.remove(id)
}
</script>

<template>
  <section class="page">
    <div class="page-heading">
      <div>
        <p class="eyebrow">STAY PRODUCTIVE</p>
        <h1>My Tasks</h1>
        <p>Organize your responsibilities, one task at a time.</p>
      </div>
      <span class="count-badge">{{ tasks.items.value.length }} tasks</span>
    </div>

    <div class="panel">
      <h2>{{ editingId ? 'Edit Task' : 'Create a Task' }}</h2>

      <form class="form-grid" @submit.prevent="saveTask">
        <label class="full-width">
          Task title *
          <input v-model.trim="form.title" required maxlength="120"
                 placeholder="e.g. Finish VueJS project" />
        </label>

        <label>
          Category
          <select v-model="form.category">
            <option>Study</option>
            <option>Personal</option>
            <option>Work</option>
            <option>Health</option>
          </select>
        </label>

        <label>
          Due date
          <input v-model="form.dueDate" type="date" />
        </label>

        <label>
          Priority
          <select v-model="form.priority">
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </label>

        <div class="form-actions full-width">
          <button class="primary-button" type="submit">
            {{ editingId ? 'Save Changes' : 'Add Task' }}
          </button>
          <button v-if="editingId" class="secondary-button"
                  type="button" @click="cancelEdit">
            Cancel
          </button>
        </div>
      </form>
    </div>

    <div class="panel">
      <div class="section-heading">
        <h2>Task List</h2>
        <input v-model="search" class="search-input"
               placeholder="Search tasks..." />
      </div>

      <div v-if="!filteredTasks.length" class="empty-state">
        No tasks found. Create your first task above!
      </div>

      <div v-for="task in filteredTasks" :key="task.id" class="record">
        <input v-model="task.completed" type="checkbox"
               aria-label="Mark task completed" />

        <div class="record-info">
          <strong :class="{ completed: task.completed }">
            {{ task.title }}
          </strong>
          <small>{{ task.category }} · {{ task.dueDate || 'No due date' }}</small>
        </div>

        <span class="priority">{{ task.priority }}</span>
        <button class="text-button" @click="editTask(task)">Edit</button>
        <button class="delete-button" @click="deleteTask(task.id)">
          Delete
        </button>
      </div>
    </div>
  </section>
</template>
