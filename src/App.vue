<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="app-shell">
    <aside class="sidebar">
      <RouterLink to="/" class="brand">
        <span class="brand-icon">✦</span>
        LifeSync
      </RouterLink>

      <p class="nav-label">WORKSPACE</p>

      <nav class="navigation">
        <RouterLink to="/" class="nav-link" exact-active-class="active">
          <span>▦</span> Dashboard
        </RouterLink>
        <RouterLink to="/tasks" class="nav-link" active-class="active">
          <span>✓</span> My Tasks
        </RouterLink>
        <RouterLink to="/schedule" class="nav-link" active-class="active">
          <span>▣</span> Schedule
        </RouterLink>
        <RouterLink to="/goals" class="nav-link" active-class="active">
          <span>◎</span> Personal Goals
        </RouterLink>
      </nav>

      <div class="sidebar-note">
        <span>✧</span>
        <h3>Make time for what matters.</h3>
        <p>Small steps create meaningful progress.</p>
      </div>
    </aside>

    <main class="main-area">
      <header class="topbar">
        <span>PERSONAL ORGANIZER</span>
        <span class="profile">My Workspace <span>●</span></span>
      </header>
      <RouterView />
      <footer>LifeSync · Personal Life & Schedule Organizer</footer>
    </main>
  </div>
</template>