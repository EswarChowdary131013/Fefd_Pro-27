import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ActivityCard, Activity } from "./ActivityCard";
import { CreateActivityForm } from "./CreateActivityForm";
import { ParticipationTable } from "./ParticipationTable";
import { Plus, Calendar, Users, BarChart3, TrendingUp } from "lucide-react";

interface AdminDashboardProps {
  activities: Activity[];
  onCreateActivity: (activity: Omit<Activity, 'id'>) => void;
  onUpdateActivity: (activity: Activity) => void;
  registrations: Record<string, string[]>; // activityId -> userIds
}

export function AdminDashboard({ 
  activities, 
  onCreateActivity, 
  onUpdateActivity,
  registrations 
}: AdminDashboardProps) {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingActivity, setEditingActivity] = useState<Activity | null>(null);

  const stats = {
    totalActivities: activities.length,
    totalEnrollments: Object.values(registrations).reduce((sum, users) => sum + users.length, 0),
    upcomingActivities: activities.filter(a => a.status === 'upcoming').length,
    averageEnrollment: activities.length > 0 
      ? Math.round(Object.values(registrations).reduce((sum, users) => sum + users.length, 0) / activities.length)
      : 0
  };

  const handleEdit = (activity: Activity) => {
    setEditingActivity(activity);
    setShowCreateForm(true);
  };

  const handleFormSubmit = (activityData: Omit<Activity, 'id'>) => {
    if (editingActivity) {
      onUpdateActivity({ ...activityData, id: editingActivity.id });
    } else {
      onCreateActivity(activityData);
    }
    setShowCreateForm(false);
    setEditingActivity(null);
  };

  const handleFormCancel = () => {
    setShowCreateForm(false);
    setEditingActivity(null);
  };

  return (
    <div className="container mx-auto px-4 py-6 space-y-6 min-h-screen bg-gradient-to-br from-black via-yellow-900/30 to-gray-800">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-primary/10 to-primary/20 border-primary/30 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Total Activities</CardTitle>
            <div className="p-2 bg-gradient-to-br from-primary to-secondary rounded-lg">
              <Calendar className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{stats.totalActivities}</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-secondary/10 to-secondary/20 border-secondary/30 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Total Enrollments</CardTitle>
            <div className="p-2 bg-gradient-to-br from-secondary to-primary rounded-lg">
              <Users className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-secondary">{stats.totalEnrollments}</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-accent/10 to-accent/20 border-accent/30 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Upcoming Events</CardTitle>
            <div className="p-2 bg-gradient-to-br from-accent to-primary rounded-lg">
              <TrendingUp className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent-foreground">{stats.upcomingActivities}</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-muted/20 to-muted/30 border-muted-foreground/20 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Avg. Enrollment</CardTitle>
            <div className="p-2 bg-gradient-to-br from-muted-foreground to-primary rounded-lg">
              <BarChart3 className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-muted-foreground">{stats.averageEnrollment}</div>
          </CardContent>
        </Card>
      </div>

      {showCreateForm ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2>{editingActivity ? 'Edit Activity' : 'Create New Activity'}</h2>
            <Button variant="outline" onClick={handleFormCancel}>
              Cancel
            </Button>
          </div>
          <CreateActivityForm 
            onSubmit={handleFormSubmit}
            initialData={editingActivity || undefined}
          />
        </div>
      ) : (
        <Tabs defaultValue="activities" className="space-y-4">
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="activities">Activities</TabsTrigger>
              <TabsTrigger value="participation">Participation</TabsTrigger>
            </TabsList>
            
            <Button 
              onClick={() => setShowCreateForm(true)}
              className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Activity
            </Button>
          </div>

          <TabsContent value="activities" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2>Manage Activities</h2>
              <Badge variant="secondary">{activities.length} activities</Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activities.map((activity) => (
                <ActivityCard
                  key={activity.id}
                  activity={activity}
                  isAdmin={true}
                  onEdit={handleEdit}
                />
              ))}
            </div>

            {activities.length === 0 && (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3>No activities created yet</h3>
                  <p className="text-muted-foreground text-center mb-4">
                    Create your first activity to get started
                  </p>
                  <Button 
                    onClick={() => setShowCreateForm(true)}
                    className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Create Activity
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="participation" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2>Participation Overview</h2>
              <Badge variant="secondary">{stats.totalEnrollments} total registrations</Badge>
            </div>

            <ParticipationTable 
              activities={activities}
              registrations={registrations}
            />
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}