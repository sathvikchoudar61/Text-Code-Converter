import { Navigate, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import HomePage from "./pages/HomePage";
import LearnPage from "./pages/LearnPage";
import CreatePage from "./pages/CreatePage";
import Header from "./components/Header";
import Footer from "./components/Footer"

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 500);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-800 to-teal-700 relative flex flex-col">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-teal-500/10 blur-3xl"></div>
        <div className="absolute bottom-10 right-20 w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-72 h-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-green-400/5 blur-2xl"></div>
      </div>

      {/* Header Component */}
      <Header />

      {/* Main content */}
      <main className="container mx-auto px-4 pt-28 pb-16 flex-grow">
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="w-12 h-12 border-4 border-emerald-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/learn" element={<LearnPage />} />
            <Route path="/create" element={<CreatePage/>} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        )}
      </main>

      {/* Footer Component */}
      <Footer />
    </div>
  );
}

export default App;