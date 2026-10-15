<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { tasks, events, goals } from '../composables/useOrganizer'

const completed = computed(() =>
  tasks.items.value.filter(task => task.completed).length
)

const today = new Date().toISOString().slice(0, 10)

const upcoming = computed(() =>
  events.items.value
    .filter(event => event.date >= today)
    .sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time))
    .slice(0, 4)
)
</script>

<template>
  <section class="page">
    <div class="welcome-banner">
      <div>
        <p class="eyebrow">YOUR SPACE, YOUR PACE</p>
        <h1>Make today count. ✨</h1>
        <p>A little planning goes a long way. Here's your personal overview.</p>
        <RouterLink to="/tasks" class="banner-button">
          Manage my tasks →
        </RouterLink>
      </div>
      <div class="banner-art">✦</div>
    </div>

    <div class="stats-grid">
      <article class="stat-card">
        <span>📋 Total tasks</span>
        <strong>{{ tasks.items.value.length }}</strong>
        <small>All your responsibilities</small>
      </article>
      <article class="stat-card">
        <span>✓ Completed tasks</span>
        <strong>{{ completed }}</strong>
        <small>Tasks you've finished</small>
      </article>
      <article class="stat-card">
        <span>🗓️ Scheduled events</span>
        <strong>{{ events.items.value.length }}</strong>
        <small>Activities in your planner</small>
      </article>
      <article class="stat-card">
        <span>◎ Personal goals</span>
        <strong>{{ goals.items.value.length }}</strong>
        <small>Goals you're working toward</small>
      </article>
    </div>

    <div class="panel">
      <div class="section-heading">
        <div>
          <h2>Upcoming Schedule</h2>
          <p>Your next activities at a glance.</p>
        </div>
        <RouterLink to="/schedule" class="text-button">View schedule →</RouterLink>
      </div>

      <div v-if="!upcoming.length" class="empty-state">
        Nothing scheduled yet.
        <RouterLink to="/schedule">Add your first event</RouterLink>
      </div>

      <div v-for="event in upcoming" :key="event.id" class="record">
        <div class="date-tile">
          <strong>{{ event.date.slice(8) }}</strong>
          <small>{{ event.date.slice(5, 7) }}</small>
        </div>
        <div class="record-info">
          <strong>{{ event.title }}</strong>
          <small>{{ event.date }} · {{ event.time || 'Any time' }}</small>
        </div>
        <span class="priority">{{ event.type }}</span>
      </div>
    </div>

    <div class="quick-links">
      <RouterLink to="/tasks">＋ Add a task</RouterLink>
      <RouterLink to="/schedule">＋ Schedule an event</RouterLink>
      <RouterLink to="/goals">＋ Create a goal</RouterLink>
    </div>
  </section>
</template>