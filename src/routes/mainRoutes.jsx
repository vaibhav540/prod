import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from '../pages/Login'
import AnimatedIntro from '../components/AnimatedIntro'
import HomePage from '../pages/HomePage'
import AppLayout from '../pages/Layout'
import MigrationPlan from '../components/MigrationPlan'
import SecurityMigration from '../components/SecurityMigration'
import SchemaMigration from '../components/SchemaMigration'
import DataMigration from '../components/DataMigration'
import SPsAndViewMigration from '../components/SPsAndViewMigration'
import ProcessLogs from '../components/ProcessLogs'
import Dashboard from '../components/Dashboard'
import AccountLevel from '../components/AccountLevel'
import DatasetLevel from '../components/DatabaseLevel'

const MainRoutes = () => (
  <Routes>
    {/* Public Routes */}
    <Route path="/" element={<AnimatedIntro />} />
    <Route path="/login" element={<Login />} />
    <Route path="/homepage" element={<HomePage />} />

    {/* Protected Routes Inside App Layout */}
    <Route path="/home/*" element={<AppLayout />}>
      <Route path="account-level" element={<AccountLevel />} />
      <Route path="dataset-level" element={<DatasetLevel />} />
      <Route path="migration-plan" element={<MigrationPlan />} />
      <Route path="security-migration" element={<SecurityMigration />} />
      <Route path="schema-migration" element={<SchemaMigration />} />
      <Route path="data-migration" element={<DataMigration />} />
      <Route path="sps-view-migration" element={<SPsAndViewMigration />} />
      <Route path="process-logs" element={<ProcessLogs />} />
      <Route path="dashboard" element={<Dashboard />} />

      {/* Default route inside AppLayout */}
      <Route index element={<Navigate to="/home/account-level" replace />} />
    </Route>

    {/* Catch-all for unknown routes */}
    <Route path="*" element={<Navigate to="/" />} />
  </Routes>
)

export default MainRoutes
