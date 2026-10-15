<script setup>
import { ref } from 'vue'
import { goals } from '../composables/useOrganizer'

const blank = () => ({
  title: '', description: '', deadline: '', progress: 0,
})
const form = ref(blank())
const editingId = ref(null)

function reset() {
  editingId.value = null
  form.value = blank()
}

function save() {
  if (!form.value.title.trim()) return

  const data = {
    ...form.value,
    progress: Number(form.value.progress),
  }

  if (editingId.value) goals.update(editingId.value, data)
  else goals.add(data)

  reset()
}

function edit(goal) {
  editingId.value = goal.id
  form.value = { ...goal }
}

function remove(id) {
  if (confirm('Delete this goal?')) goals.remove(id)
}
</script>

<template>
  <section class="page">
    <div class="page-heading">
      <div>
        <p class="eyebrow">GROW EVERY DAY</p>
        <h1>Personal Goals</h1>
        <p>Turn your plans into achievable milestones.</p>
      </div>
    </div>

    <div class="panel">
      <h2>{{ editingId ? 'Edit Goal' : 'Create a Goal' }}</h2>
      <form class="form-grid" @submit.prevent="save">
        <label class="full-width">
          Goal title *
          <input v-model.trim="form.title" required maxlength="120"
                 placeholder="e.g. Learn VueJS" />
        </label>
        <label class="full-width">
          Description
          <textarea v-model.trim="form.description"
                    placeholder="What do you want to accomplish?" />
        </label>
        <label>
          Target date
          <input v-model="form.deadline" type="date" />
        </label>
        <label>
          Progress: {{ form.progress }}%
          <input v-model.number="form.progress" type="range"
                 min="0" max="100" step="5" />
        </label>
        <div class="form-actions full-width">
          <button class="primary-button" type="submit">
            {{ editingId ? 'Save Changes' : 'Add Goal' }}
          </button>
          <button v-if="editingId" class="secondary-button"
                  type="button" @click="reset">Cancel</button>
        </div>
      </form>
    </div>

    <div class="goal-grid">
      <article v-for="goal in goals.items.value" :key="goal.id" class="panel">
        <div class="goal-symbol">◎</div>
        <h2>{{ goal.title }}</h2>
        <p>{{ goal.description || 'One step at a time.' }}</p>
        <small>Target: {{ goal.deadline || 'No deadline' }}</small>
        <div class="progress-track">
          <div class="progress-fill" :style="{ width: goal.progress + '%' }"></div>
        </div>
        <p>{{ goal.progress }}% complete</p>
        <div class="form-actions">
          <button class="text-button" @click="edit(goal)">Edit</button>
          <button class="delete-button" @click="remove(goal.id)">Delete</button>
        </div>
      </article>
    </div>

    <p v-if="!goals.items.value.length" class="empty-state">
      No goals yet. Create one above to start tracking your progress.
    </p>
  </section>
</template>