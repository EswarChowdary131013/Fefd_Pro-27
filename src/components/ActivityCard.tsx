import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { CalendarDays, MapPin, Users, Clock } from "lucide-react";

export interface Activity {
  id: string;
  title: string;
  description: string;
  category: 'sports' | 'academic' | 'arts' | 'community' | 'technology';
  date: string;
  time: string;
  location: string;
  capacity: number;
  enrolled: number;
  instructor: string;
  status: 'upcoming' | 'ongoing' | 'completed';
}

interface ActivityCardProps {
  activity: Activity;
  isRegistered?: boolean;
  isAdmin?: boolean;
  onRegister?: (activityId: string) => void;
  onEdit?: (activity: Activity) => void;
  onViewDetails?: (activity: Activity) => void;
}

const categoryColors = {
  sports: 'bg-gradient-to-r from-green-500 to-green-600 text-white',
  academic: 'bg-gradient-to-r from-blue-500 to-blue-600 text-white',
  arts: 'bg-gradient-to-r from-purple-500 to-purple-600 text-white',
  community: 'bg-gradient-to-r from-orange-500 to-orange-600 text-white',
  technology: 'bg-gradient-to-r from-indigo-500 to-indigo-600 text-white'
};

export function ActivityCard({ 
  activity, 
  isRegistered = false, 
  isAdmin = false,
  onRegister,
  onEdit,
  onViewDetails 
}: ActivityCardProps) {
  const spotsRemaining = activity.capacity - activity.enrolled;
  const isFull = spotsRemaining <= 0;

  return (
    <Card className="h-full flex flex-col shadow-lg hover:shadow-xl transition-all duration-300 border-primary/20 hover:border-primary/40 bg-gradient-to-br from-card via-card to-primary/5">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="line-clamp-2">{activity.title}</CardTitle>
            <div className="flex items-center space-x-2">
              <Badge className={categoryColors[activity.category]}>
                {activity.category}
              </Badge>
              <Badge variant={activity.status === 'upcoming' ? 'default' : activity.status === 'ongoing' ? 'secondary' : 'outline'}>
                {activity.status}
              </Badge>
            </div>
          </div>
        </div>
        <CardDescription className="line-clamp-3">
          {activity.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-1 space-y-4">
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <CalendarDays className="h-4 w-4" />
            <span>{activity.date}</span>
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{activity.time}</span>
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{activity.location}</span>
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Users className="h-4 w-4" />
            <span>{activity.enrolled}/{activity.capacity} enrolled</span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Avatar className="h-8 w-8">
            <AvatarFallback>{activity.instructor.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div className="text-sm">
            <p className="text-muted-foreground">Instructor</p>
            <p>{activity.instructor}</p>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex flex-col space-y-2">
        {!isAdmin && (
          <Button 
            className={`w-full transition-all duration-300 ${
              isRegistered 
                ? "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700" 
                : "bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
            } text-white shadow-lg hover:shadow-xl`}
            disabled={isFull || isRegistered || activity.status !== 'upcoming'}
            onClick={() => onRegister?.(activity.id)}
          >
            {isRegistered ? "✓ Registered" : isFull ? "Full" : "Register"}
          </Button>
        )}
        
        <div className="flex w-full space-x-2">
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={() => onViewDetails?.(activity)}
          >
            View Details
          </Button>
          
          {isAdmin && (
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={() => onEdit?.(activity)}
            >
              Edit
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}