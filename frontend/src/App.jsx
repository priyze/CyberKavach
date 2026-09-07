import React from "react";
import { Routes, Route } from "react-router-dom";

import ModeSelection from "./components/citizen/ModeSelection";
import HomeScreen from "./components/citizen/HomeScreen";
import InputScreen from "./components/citizen/InputScreen";
import ResultScreen from "./components/citizen/ResultScreen";
import ReportSuccess from "./components/citizen/ReportSuccess";
import EmergencyHelp from "./components/citizen/EmergencyHelp";

import ElderlyApp from "./components/elderly/ElderlyApp";

import RoleSelect from "./components/portal/RoleSelect";
import Dashboard from "./components/portal/Dashboard";
import ReportsTable from "./components/portal/ReportsTable";
import ReportDetail from "./components/portal/ReportDetail";
import CreateAlert from "./components/portal/CreateAlert";
import AlertsList from "./components/portal/AlertsList";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<ModeSelection />} />
      <Route path="/citizen" element={<HomeScreen />} />
      <Route path="/citizen/check" element={<InputScreen />} />
      <Route path="/citizen/result" element={<ResultScreen />} />
      <Route path="/citizen/success" element={<ReportSuccess />} />
      <Route path="/citizen/help" element={<EmergencyHelp />} />
      <Route path="/elderly" element={<ElderlyApp />} />
      <Route path="/admin" element={<RoleSelect />} />
      <Route path="/admin/dashboard" element={<Dashboard />} />
      <Route path="/admin/reports" element={<ReportsTable />} />
      <Route path="/admin/reports/:id" element={<ReportDetail />} />
      <Route path="/admin/alerts" element={<AlertsList />} />
      <Route path="/admin/alerts/new" element={<CreateAlert />} />
    </Routes>
  );
}