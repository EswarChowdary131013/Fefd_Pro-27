import { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { LoginForm } from "./components/LoginForm";
import { StudentDashboard } from "./components/StudentDashboard";
import { AdminDashboard } from "./components/AdminDashboard";
import { toast } from "sonner@2.0.3";
import { Toaster } from "./components/ui/sonner";

// Mock data
const mockActivities = [
  {
    id: "1",
    title: "Basketball Club",
    description: "Weekly basketball training sessions focusing on fundamentals, teamwork, and competitive play. All skill levels welcome!",
    category: "sports",
    date: "2025-01-25",
    time: "16:00",
    location: "Main Gymnasium",
    capacity: 25,
    enrolled: 18,
    instructor: "Rajesh Nichenametla",
    status: "upcoming"
  },
  {
    id: "2", 
    title: "Robotics Workshop",
    description: "Build and program robots using Arduino and sensors. Learn electronics, coding, and engineering principles through hands-on projects.",
    category: "technology",
    date: "2025-01-22",
    time: "14:00",
    location: "Tech Lab 201",
    capacity: 15,
    enrolled: 12,
    instructor: "Rajesh Nichenametla",
    status: "upcoming"
  },
  {
    id: "3",
    title: "Drama Club Rehearsal", 
    description: "Prepare for the spring musical production. Work on acting, singing, and stage presence with experienced theater professionals.",
    category: "arts",
    date: "2025-01-20",
    time: "15:30",
    location: "Auditorium",
    capacity: 30,
    enrolled: 22,
    instructor: "Rajesh Nichenametla",
    status: "ongoing"
  },
  {
    id: "4",
    title: "Math Olympiad Training",
    description: "Advanced problem-solving techniques and competition strategies for mathematics competitions at regional and national levels.",
    category: "academic", 
    date: "2025-01-24",
    time: "13:00",
    location: "Room 305",
    capacity: 20,
    enrolled: 16,
    instructor: "Rajesh Nichenametla",
    status: "upcoming"
  },
  {
    id: "5",
    title: "Community Garden Project",
    description: "Help maintain the school garden and learn about sustainable agriculture, environmental science, and community engagement.",
    category: "community",
    date: "2025-01-26",
    time: "10:00", 
    location: "School Garden",
    capacity: 12,
    enrolled: 8,
    instructor: "Rajesh Nichenametla",
    status: "upcoming"
  },
  {
    id: "6",
    title: "Chess Tournament",
    description: "Annual inter-school chess championship. Practice strategic thinking and compete against other schools in the region.",
    category: "academic",
    date: "2025-01-15",
    time: "09:00",
    location: "Library",
    capacity: 24,
    enrolled: 24,
    instructor: "Rajesh Nichenametla",
    status: "completed"
  }
];

export default function App() {
  const [user, setUser] = useState(null);
  const [activities, setActivities] = useState(mockActivities);
  const [registrations, setRegistrations] = useState({
    "1": ["user1", "user2", "user3"],
    "2": ["user1", "user4"],
    "3": ["user2", "user5", "user6"],
    "4": ["user1"],
    "5": ["user3", "user7"],
    "6": ["user1", "user2", "user4", "user8"]
  });
  const [userRegistrations, setUserRegistrations] = useState([]);

  // Simulate user's existing registrations
  useEffect(() => {
    if (user?.role === 'student') {
      // Mock user being registered for some activities
      setUserRegistrations(["1", "2", "4", "6"]);
    }
  }, [user]);

  const handleLogin = (userData) => {
    setUser(userData);
    toast.success(`Welcome back, ${userData.name}!`);
  };

  const handleLogout = () => {
    setUser(null);
    setUserRegistrations([]);
    toast.info("You have been logged out");
  };

  const handleRegister = (activityId) => {
    if (!user) return;

    setUserRegistrations(prev => [...prev, activityId]);
    setRegistrations(prev => ({
      ...prev,
      [activityId]: [...(prev[activityId] || []), user.id]
    }));

    // Update enrolled count
    setActivities(prev => prev.map(activity => 
      activity.id === activityId 
        ? { ...activity, enrolled: activity.enrolled + 1 }
        : activity
    ));

    const activity = activities.find(a => a.id === activityId);
    toast.success(`Successfully registered for ${activity?.title}!`);
  };

  const handleCreateActivity = (activityData) => {
    const newActivity = {
      ...activityData,
      id: Math.random().toString(36).substr(2, 9)
    };
    
    setActivities(prev => [...prev, newActivity]);
    setRegistrations(prev => ({ ...prev, [newActivity.id]: [] }));
    toast.success(`Activity "${newActivity.title}" created successfully!`);
  };

  const handleUpdateActivity = (updatedActivity) => {
    setActivities(prev => prev.map(activity => 
      activity.id === updatedActivity.id ? updatedActivity : activity
    ));
    toast.success(`Activity "${updatedActivity.title}" updated successfully!`);
  };

  if (!user) {
    return (
      <>
        <LoginForm onLogin={handleLogin} />
        <Toaster />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-yellow-900">
      <Header 
        user={user} 
        onLogout={handleLogout}
        notifications={user.role === 'student' ? 3 : 5}
      />
      
      <main>
        {user.role === 'student' ? (
          <StudentDashboard
            activities={activities}
            registeredActivities={userRegistrations}
            onRegister={handleRegister}
          />
        ) : (
          <AdminDashboard
            activities={activities}
            onCreateActivity={handleCreateActivity}
            onUpdateActivity={handleUpdateActivity}
            registrations={registrations}
          />
        )}
      </main>
      
      <Toaster />
    </div>
  );
}


