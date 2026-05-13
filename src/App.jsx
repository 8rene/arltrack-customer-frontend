import { useState, useCallback } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar";
import Booking from "./pages/Booking";
import ProfilePage from "./pages/ProfilePage";
import MyBookings from "./pages/MyBookings";
import MyReviews  from "./pages/MyReviews";
import ServiceSection from "./components/shared/ServiceSection";
import WhySection from "./components/shared/WhySection";
import VehiclesSection from "./components/shared/VehiclesSection";
import Footer from "./components/layout/Footer";
import Hero from "./components/shared/Hero";
import VehicleShowroom from "./pages/VehicleShowroom";

function Home() {
  return (
    <div className="bg-arl-light text-arl-dark">
      <Hero />
      <ServiceSection />
      <WhySection />
      <VehiclesSection />
      <Footer />
    </div>
  );
}

function App() {
  // user = basic auth info from login (email, userID, roleID, etc.)
  const [user,        setUser]        = useState(() => {
    // Restore from localStorage if token exists
    const token = localStorage.getItem("arl_token");
    const saved = localStorage.getItem("arl_user");
    if (token && saved) {
      try { return JSON.parse(saved); } catch { return null; }
    }
    return null;
  });

  // userDetails = firstName, lastName, phone etc. fetched from /api/user/details
  const [userDetails, setUserDetails] = useState(() => {
    const saved = localStorage.getItem("arl_user_details");
    if (saved) { try { return JSON.parse(saved); } catch { return null; } }
    return null;
  });

  // Called from LoginModal after successful login
  const handleLogin = useCallback(async (loginData) => {
    setUser(loginData);
    localStorage.setItem("arl_user", JSON.stringify(loginData));

    // Fetch full user details from Firestore
    try {
      const token = localStorage.getItem("arl_token");
      const res   = await fetch(`http://localhost:5000/api/user/details/${loginData.userID}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const details = await res.json();
        setUserDetails(details);
        localStorage.setItem("arl_user_details", JSON.stringify(details));
      }
    } catch (err) {
      console.error("Failed to fetch user details:", err);
    }
  }, []);

  const handleLogout = useCallback(() => {
    setUser(null);
    setUserDetails(null);
    localStorage.removeItem("arl_token");
    localStorage.removeItem("arl_user");
    localStorage.removeItem("arl_user_details");
  }, []);

  // Called from Booking page after saving firstName/lastName
  const handleUserDetailsUpdate = useCallback((updated) => {
    setUserDetails(updated);
    localStorage.setItem("arl_user_details", JSON.stringify(updated));
  }, []);

  return (
    <BrowserRouter>
      <Navbar
        user={user}
        userDetails={userDetails}
        onLogin={handleLogin}
        onLogout={handleLogout}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/booking" element={
          <Booking
            user={user}
            userDetails={userDetails}
            onUserDetailsUpdate={handleUserDetailsUpdate}
          />
        } />
        <Route path="/vehicles"    element={<VehicleShowroom />} />
        <Route path="/profile"     element={<ProfilePage user={user} />} />
        <Route path="/my-bookings" element={<MyBookings  user={user} />} />
        <Route path="/my-reviews"  element={<MyReviews   user={user} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
