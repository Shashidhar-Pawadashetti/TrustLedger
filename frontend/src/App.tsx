import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";
import { useAuthStore } from "./stores/authStore";

// Page Imports
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ClientDashboard from "./pages/ClientDashboard";
import FreelancerDashboard from "./pages/FreelancerDashboard";
import CreateProjectWizard from "./pages/CreateProjectWizard";
import ProjectDetail from "./pages/ProjectDetail";
import DisputeChat from "./pages/DisputeChat";
import InvoicePreview from "./pages/InvoicePreview";
import JobBoard from "./pages/JobBoard";
import { useMyNotifications, useMarkNotificationRead } from "./api/useNotifications";
import { useMemo, useState } from "react";

// Role-based auth guard wrapper
const ProtectedRoute = ({ children, allowedRole }: { children: JSX.Element, allowedRole?: string }) => {
  const { isAuthenticated, user } = useAuthStore();
  if (!isAuthenticated || !user) return <Navigate to="/login" replace />;
  if (allowedRole && user.role !== allowedRole && user.role !== "ADMIN") return <Navigate to={`/${user.role.toLowerCase()}-dashboard`} replace />;
  return children;
};

function App() {
  const { isAuthenticated, user } = useAuthStore();
  const { data: notifications = [] } = useMyNotifications(isAuthenticated);
  const unreadCount = useMemo(() => notifications.filter((n) => !n.isRead).length, [notifications]);
  const markRead = useMarkNotificationRead();
  const [showNotifs, setShowNotifs] = useState(false);

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-background">
        {/* Navigation */}
        <nav className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              {/* Logo */}
              <Link to="/" className="flex items-center gap-2 group">
                <div className="w-8 h-8 bg-gradient-to-br from-trust-green to-emerald-600 rounded-lg flex items-center justify-center shadow-soft">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <span className="text-xl font-bold text-slate-900 group-hover:text-trust-green transition-colors">
                  Trust-Bound
                </span>
              </Link>

              {/* Right side */}
              <div className="flex items-center gap-3">
                {isAuthenticated ? (
                  <>
                    {/* Notifications */}
                    <button
                      onClick={() => setShowNotifs((s) => !s)}
                      className="relative p-2 rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                      </svg>
                      {unreadCount > 0 && (
                        <span className="absolute -top-1 -right-1 w-5 h-5 bg-trust-red text-white text-xs font-bold rounded-full flex items-center justify-center">
                          {unreadCount > 9 ? '9+' : unreadCount}
                        </span>
                      )}
                    </button>

                    {/* User info */}
                    <div className="hidden sm:flex items-center gap-3 pl-3 border-l border-slate-200">
                      <div className="text-right">
                        <p className="text-sm font-medium text-slate-900">{user?.displayName}</p>
                        <p className="text-xs text-slate-500 capitalize">{user?.role?.toLowerCase()}</p>
                      </div>
                      <div className="w-9 h-9 bg-gradient-to-br from-slate-200 to-slate-300 rounded-full flex items-center justify-center">
                        <span className="text-sm font-semibold text-slate-600">
                          {user?.displayName?.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    </div>

                    {/* Logout */}
                    <button 
                      onClick={() => { useAuthStore.getState().logout(); window.location.href = '/'; }} 
                      className="p-2 rounded-lg text-slate-500 hover:text-trust-red hover:bg-red-50 transition-colors"
                      title="Logout"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                    </button>
                  </>
                ) : (
                  <div className="flex items-center gap-2">
                    <Link 
                      to="/login" 
                      className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
                    >
                      Log in
                    </Link>
                    <Link 
                      to="/register" 
                      className="px-4 py-2 text-sm font-semibold text-white bg-trust-green hover:bg-emerald-600 rounded-lg transition-colors shadow-soft"
                    >
                      Get Started
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>

        {/* Notifications dropdown */}
        {isAuthenticated && showNotifs && (
          <div className="absolute top-16 right-0 left-0 z-40 border-b border-slate-200 bg-white shadow-soft-lg animate-fade-in">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-slate-900">Notifications</h3>
                <button 
                  onClick={() => setShowNotifs(false)}
                  className="text-xs text-slate-500 hover:text-slate-700"
                >
                  Close
                </button>
              </div>
              <div className="space-y-2 max-h-80 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="py-8 text-center">
                    <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <svg className="w-6 h-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                      </svg>
                    </div>
                    <p className="text-sm text-slate-500">No notifications yet</p>
                  </div>
                ) : (
                  notifications.slice(0, 10).map((n) => (
                    <div 
                      key={n.id} 
                      className={`flex items-start justify-between gap-4 p-3 rounded-lg transition-colors ${!n.isRead ? 'bg-trust-blue-light/30' : 'hover:bg-slate-50'}`}
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-900">{n.title}</p>
                        <p className="text-sm text-slate-500 truncate">{n.body}</p>
                      </div>
                      {!n.isRead && (
                        <button
                          className="shrink-0 text-xs font-medium text-trust-blue hover:text-blue-700"
                          onClick={() => markRead.mutate(n.id)}
                        >
                          Mark read
                        </button>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* Main content */}
        <main className="flex-1 relative">
          <Routes>
            <Route path="/" element={!isAuthenticated ? <LandingPage /> : <Navigate to={`/${user?.role.toLowerCase()}-dashboard`} replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="/client-dashboard" element={<ProtectedRoute allowedRole="CLIENT"><ClientDashboard /></ProtectedRoute>} />
            <Route path="/freelancer-dashboard" element={<ProtectedRoute allowedRole="FREELANCER"><FreelancerDashboard /></ProtectedRoute>} />
            
            <Route path="/projects/new" element={<ProtectedRoute allowedRole="CLIENT"><CreateProjectWizard /></ProtectedRoute>} />
            <Route path="/projects/:id" element={<ProtectedRoute><ProjectDetail /></ProtectedRoute>} />
            
            <Route path="/projects/:projectId/dispute/:id" element={<ProtectedRoute><DisputeChat /></ProtectedRoute>} />
            <Route path="/projects/:projectId/invoice" element={<ProtectedRoute><InvoicePreview /></ProtectedRoute>} />
            <Route path="/job-board" element={<ProtectedRoute allowedRole="FREELANCER"><JobBoard /></ProtectedRoute>} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="border-t border-slate-200 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm text-slate-500">
                Built for freelancers who value their time.
              </p>
              <p className="text-xs text-slate-400">
                This is a simulated escrow platform — no real transactions.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
