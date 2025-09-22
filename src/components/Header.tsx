import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Bell, User, LogOut, Calendar } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";

interface HeaderProps {
  user: {
    name: string;
    role: 'admin' | 'student';
    id: string;
  } | null;
  onLogout: () => void;
  notifications: number;
}

export function Header({ user, onLogout, notifications }: HeaderProps) {
  return (
    <header className="border-b border-yellow-400/30 bg-gradient-to-r from-black via-yellow-900/20 to-black backdrop-blur-sm shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg shadow-lg">
                <Calendar className="h-6 w-6 text-black" />
              </div>
              <span className="font-semibold bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent text-lg">
                ExtracurricularHub
              </span>
            </div>
          </div>

          {user && (
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Button variant="ghost" size="sm" className="relative text-yellow-400 hover:text-yellow-300 hover:bg-yellow-900/20">
                  <Bell className="h-4 w-4" />
                  {notifications > 0 && (
                    <Badge 
                      variant="destructive" 
                      className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-red-600"
                    >
                      {notifications}
                    </Badge>
                  )}
                </Button>
              </div>

              <div className="flex items-center space-x-2 text-yellow-400">
                <User className="h-4 w-4" />
                <span>{user.name}</span>
                <Badge 
                  variant={user.role === 'admin' ? 'default' : 'secondary'}
                  className={user.role === 'admin' ? 'bg-yellow-500 text-black' : 'bg-yellow-600 text-black'}
                >
                  {user.role}
                </Badge>
              </div>

              <Button 
                onClick={onLogout}
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2"
                size="sm"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}