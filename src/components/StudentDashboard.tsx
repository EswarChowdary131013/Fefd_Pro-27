import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ActivityCard, Activity } from "./ActivityCard";
import { Search, Filter, Calendar, Trophy, BookOpen, Palette, Users, Monitor } from "lucide-react";

interface StudentDashboardProps {
  activities: Activity[];
  registeredActivities: string[];
  onRegister: (activityId: string) => void;
}

const categoryIcons = {
  sports: Trophy,
  academic: BookOpen,
  arts: Palette,
  community: Users,
  technology: Monitor
};

export function StudentDashboard({ activities, registeredActivities, onRegister }: StudentDashboardProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);

  const filteredActivities = activities.filter(activity => {
    const matchesSearch = activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         activity.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || activity.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const upcomingActivities = filteredActivities.filter(a => a.status === 'upcoming');
  const myActivities = activities.filter(a => registeredActivities.includes(a.id));

  const stats = {
    registered: registeredActivities.length,
    upcoming: myActivities.filter(a => a.status === 'upcoming').length,
    completed: myActivities.filter(a => a.status === 'completed').length
  };

  return (
    <div className="container mx-auto px-4 py-6 space-y-6 min-h-screen bg-gradient-to-br from-black via-yellow-900/20 to-gray-900">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-primary/10 to-primary/20 border-primary/30 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Registered Activities</CardTitle>
            <div className="p-2 bg-gradient-to-br from-primary to-secondary rounded-lg">
              <Calendar className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{stats.registered}</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-secondary/10 to-secondary/20 border-secondary/30 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Upcoming Events</CardTitle>
            <div className="p-2 bg-gradient-to-br from-secondary to-primary rounded-lg">
              <Users className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-secondary">{stats.upcoming}</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-accent/10 to-accent/20 border-accent/30 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Completed</CardTitle>
            <div className="p-2 bg-gradient-to-br from-accent to-primary rounded-lg">
              <Trophy className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent-foreground">{stats.completed}</div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search activities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="sports">Sports</SelectItem>
            <SelectItem value="academic">Academic</SelectItem>
            <SelectItem value="arts">Arts</SelectItem>
            <SelectItem value="community">Community</SelectItem>
            <SelectItem value="technology">Technology</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="browse" className="space-y-4">
        <TabsList>
          <TabsTrigger value="browse">Browse Activities</TabsTrigger>
          <TabsTrigger value="registered">My Activities ({stats.registered})</TabsTrigger>
        </TabsList>

        <TabsContent value="browse" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2>Available Activities</h2>
            <Badge variant="secondary">{upcomingActivities.length} activities</Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingActivities.map((activity) => (
              <ActivityCard
                key={activity.id}
                activity={activity}
                isRegistered={registeredActivities.includes(activity.id)}
                onRegister={onRegister}
                onViewDetails={setSelectedActivity}
              />
            ))}
          </div>

          {upcomingActivities.length === 0 && (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Search className="h-12 w-12 text-muted-foreground mb-4" />
                <h3>No activities found</h3>
                <p className="text-muted-foreground text-center">
                  Try adjusting your search or filter criteria
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="registered" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2>My Registered Activities</h2>
            <Badge variant="secondary">{myActivities.length} activities</Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myActivities.map((activity) => (
              <ActivityCard
                key={activity.id}
                activity={activity}
                isRegistered={true}
                onViewDetails={setSelectedActivity}
              />
            ))}
          </div>

          {myActivities.length === 0 && (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
                <h3>No registered activities</h3>
                <p className="text-muted-foreground text-center">
                  Browse available activities to get started
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}