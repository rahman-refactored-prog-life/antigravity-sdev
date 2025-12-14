import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { ProtectedRoute } from './components/ProtectedRoute'
import { Layout } from './components/Layout'
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'
import { DashboardPage } from './pages/DashboardPage'
import { JavaModulePage } from './pages/JavaModulePage'
import { TopicDetailPage } from './pages/TopicDetailPage'
import { CheatsheetPage } from './pages/CheatsheetPage'
import { InterviewQuestionsPage } from './pages/InterviewQuestionsPage'
import { NotesPage } from './pages/NotesPage'
import ComponentShowcase from './pages/ComponentShowcase'
import './App.css'

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Layout>
                  <DashboardPage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/modules/java"
            element={
              <ProtectedRoute>
                <Layout>
                  <JavaModulePage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/topics/:topicId"
            element={
              <ProtectedRoute>
                <Layout>
                  <TopicDetailPage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/demo"
            element={
              <ProtectedRoute>
                <Layout>
                  <ComponentShowcase />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/cheatsheet"
            element={
              <ProtectedRoute>
                <Layout>
                  <CheatsheetPage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/interview-questions"
            element={
              <ProtectedRoute>
                <Layout>
                  <InterviewQuestionsPage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/notes"
            element={
              <ProtectedRoute>
                <Layout>
                  <NotesPage />
                </Layout>
              </ProtectedRoute>
            }
          />
          {/* Practice and Career placeholders routed to Dashboard for now or their own pages if created later */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App
