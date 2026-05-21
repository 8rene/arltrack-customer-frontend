import { useState, useCallback, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar";
import Booking from "./pages/Booking";
import ProfilePage from "./pages/ProfilePage";
import MyBookings from "./pages/MyBookings";
import MyReviews  from "./pages/MyReviews";
import TermsPage  from "./pages/TermsPage";
import PrivacyPage from "./pages/PrivacyPage";
import BookingGuidelinesPage from "./pages/BookingGuidelinesPage";
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

// Helper: decode userID from JWT payload (no library needed)
const decodeJWT = (token) => {
  try {
    const payload = token.split(".")[1];
    return JSON.parse(atob(payload));
  } catch {
    return null;
  }
};

function App() {
  // user = basic auth info from login (email, userID, roleID, etc.)
  // Stored in React state only — NOT in localStorage
  const [user,        setUser]        = useState(null);

  // userDetails = firstName, lastName, phone etc. fetched from /api/user/details
  // Stored in React state only — NOT in localStorage
  const [userDetails, setUserDetails] = useState(null);

  // On mount — if JWT exists, re-fetch user data from backend
  // This restores the session after a page refresh without storing
  // sensitive data in localStorage
  useEffect(() => {
    const token = localStorage.getItem("arl_token");
    if (!token) return;

    const decoded = decodeJWT(token);
    if (!decoded || !decoded.userID) return;

    // Check if token is expired
    if (decoded.exp && decoded.exp * 1000 < Date.now()) {
      localStorage.removeItem("arl_token");
      return;
    }

    // Re-fetch user details from backend using the JWT
    const restoreSession = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_API_URL}/user/details/${decoded.userID}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (!res.ok) {
          // Token invalid or user deleted — clear it
          localStorage.removeItem("arl_token");
          return;
        }
        const details = await res.json();
        // Reconstruct minimal user object from JWT payload
        setUser({
          userID:       decoded.userID,
          email:        decoded.email        || "",
          roleID:       decoded.roleID       || "",
          username:     decoded.username     || "",
          profileImage: details.profileImage || "",
          isVerified:   details.isVerified   || false,
        });
        setUserDetails(details);
      } catch (err) {
        console.error("Session restore failed:", err);
      }
    };

    restoreSession();
  }, []);

  // Called from LoginModal after successful login
  const handleLogin = useCallback(async (loginData) => {
    setUser(loginData);
    // Only JWT goes to localStorage — no user data
    const token = localStorage.getItem("arl_token");

    // Fetch full user details into React state only
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/user/details/${loginData.userID}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.ok) {
        const details = await res.json();
        setUserDetails(details);
        // ✅ No localStorage.setItem("arl_user_details") — state only
      }
    } catch (err) {
      console.error("Failed to fetch user details:", err);
    }
  }, []);

  const handleLogout = useCallback(() => {
    setUser(null);
    setUserDetails(null);
    localStorage.removeItem("arl_token");
    // ✅ No arl_user or arl_user_details to remove — never stored
  }, []);

  // Called from Booking page after saving firstName/lastName
  const handleUserDetailsUpdate = useCallback((updated) => {
    setUserDetails(updated);
    // ✅ No localStorage.setItem — state only
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
        <Route path="/terms"        element={<TermsPage />} />
        <Route path="/privacy"      element={<PrivacyPage />} />
        <Route path="/booking-guidelines" element={<BookingGuidelinesPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
