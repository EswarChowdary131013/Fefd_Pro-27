import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Activity } from "./ActivityCard";
import { Progress } from "./ui/progress";

interface ParticipationTableProps {
  activities: Activity[];
  registrations: Record<string, string[]>; // activityId -> userIds
}

export function ParticipationTable({ activities, registrations }: ParticipationTableProps) {
  const getEnrollmentRate = (activity: Activity) => {
    const enrolled = registrations[activity.id]?.length || 0;
    return Math.round((enrolled / activity.capacity) * 100);
  };

  const getStatusColor = (status: Activity['status']) => {
    switch (status) {
      case 'upcoming': return 'default';
      case 'ongoing': return 'secondary';
      case 'completed': return 'outline';
      default: return 'default';
    }
  };

  const sortedActivities = [...activities].sort((a, b) => {
    if (a.status !== b.status) {
      const statusOrder = { upcoming: 0, ongoing: 1, completed: 2 };
      return statusOrder[a.status] - statusOrder[b.status];
    }
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });

  if (activities.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <div className="text-center">
            <h3>No activities to display</h3>
            <p className="text-muted-foreground">Create some activities to see participation data</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Participation Overview</CardTitle>
        <CardDescription>
          Track enrollment and participation across all activities
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Activity</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Enrollment</TableHead>
                <TableHead>Progress</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedActivities.map((activity) => {
                const enrolled = registrations[activity.id]?.length || 0;
                const enrollmentRate = getEnrollmentRate(activity);
                
                return (
                  <TableRow key={activity.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{activity.title}</div>
                        <div className="text-sm text-muted-foreground">
                          {activity.instructor}
                        </div>
                      </div>
                    </TableCell>
                    
                    <TableCell>
                      <Badge variant="secondary" className="capitalize">
                        {activity.category}
                      </Badge>
                    </TableCell>
                    
                    <TableCell>
                      <div className="text-sm">
                        <div>{activity.date}</div>
                        <div className="text-muted-foreground">{activity.time}</div>
                      </div>
                    </TableCell>
                    
                    <TableCell>
                      <Badge variant={getStatusColor(activity.status)} className="capitalize">
                        {activity.status}
                      </Badge>
                    </TableCell>
                    
                    <TableCell>
                      <div className="text-sm">
                        <div>{enrolled}/{activity.capacity}</div>
                        <div className="text-muted-foreground">
                          {enrollmentRate}% full
                        </div>
                      </div>
                    </TableCell>
                    
                    <TableCell>
                      <div className="w-full">
                        <Progress 
                          value={enrollmentRate} 
                          className="h-2" 
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}