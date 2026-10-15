<script setup>
import { ref } from 'vue'
import { events } from '../composables/useOrganizer'

const blank = () => ({
  title: '', date: '', time: '', location: '', type: 'Class',
})
const form = ref(blank())
const editingId = ref(null)

function reset() {
  editingId.value = null
  form.value = blank()
}

function save() {
  if (!form.value.title.trim() || !form.value.date) return
  if (editingId.value) {
    events.update(editingId.value, { ...form.value })
  } else {
    events.add({ ...form.value })
  }
  reset()
}

function edit(event) {
  editingId.value = event.id
  form.value = { ...event }
}

function remove(id) {
  if (confirm('Delete this event?')) events.remove(id)
}
</script>

<template>
  <section class="page">
    <div class="page-heading">
      <div>
        <p class="eyebrow">PLAN AHEAD</p>
        <h1>My Schedule</h1>
        <p>Keep track of classes, appointments, and activities.</p>
      </div>
    </div>

    <div class="panel">
      <h2>{{ editingId ? 'Edit Event' : 'Add an Event' }}</h2>
      <form class="form-grid" @submit.prevent="save">
        <label class="full-width">
          Event name *
          <input v-model.trim="form.title" required maxlength="120"
                 placeholder="e.g. Programming class" />
        </label>
        <label>
          Date *
          <input v-model="form.date" type="date" required />
        </label>
        <label>
          Time
          <input v-model="form.time" type="time" />
        </label>
        <label>
          Type
          <select v-model="form.type">
            <option>Class</option>
            <option>Appointment</option>
            <option>Personal</option>
            <option>Work</option>
          </select>
        </label>
        <label>
          Location
          <input v-model.trim="form.location" placeholder="Optional" />
        </label>
        <div class="form-actions full-width">
          <button class="primary-button" type="submit">
            {{ editingId ? 'Save Changes' : 'Add Event' }}
          </button>
          <button v-if="editingId" type="button"
                  class="secondary-button" @click="reset">Cancel</button>
        </div>
      </form>
    </div>

    <div class="panel">
      <h2>Upcoming Activities</h2>
      <p v-if="!events.items.value.length" class="empty-state">
        Your schedule is empty. Add an event to get started.
      </p>
      <div v-for="event in [...events.items.value].sort(
        (a, b) => (a.date + a.time).localeCompare(b.date + b.time)
      )" :key="event.id" class="record">
        <div class="date-tile">
          <strong>{{ event.date.slice(8) }}</strong>
          <small>{{ event.date.slice(5, 7) }}</small>
        </div>
        <div class="record-info">
          <strong>{{ event.title }}</strong>
          <small>{{ event.date }} · {{ event.time || 'Any time' }}</small>
          <small>{{ event.type }} · {{ event.location || 'No location' }}</small>
        </div>
        <button class="text-button" @click="edit(event)">Edit</button>
        <button class="delete-button" @click="remove(event.id)">Delete</button>
      </div>
    </div>
  </section>
</template>