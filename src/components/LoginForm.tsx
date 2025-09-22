import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Calendar } from "lucide-react";

interface LoginFormProps {
  onLogin: (user: { name: string; role: 'admin' | 'student'; id: string }) => void;
}

export function LoginForm({ onLogin }: LoginFormProps) {
  const [name, setName] = useState("");
  const [role, setRole] = useState<'admin' | 'student'>('student');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onLogin({
        name: name.trim(),
        role,
        id: Math.random().toString(36).substr(2, 9)
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-yellow-900/30 to-gray-900">
      <Card className="w-full max-w-md shadow-2xl border-yellow-400/30 bg-gray-900/90 backdrop-blur-sm">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full shadow-lg">
              <Calendar className="h-12 w-12 text-black" />
            </div>
          </div>
          <CardTitle className="text-2xl bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent">
            ExtracurricularHub
          </CardTitle>
          <CardDescription className="text-yellow-200">
            Manage your student activities and events
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select value={role} onValueChange={(value) => setRole(value as 'admin' | 'student')}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button type="submit" className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black shadow-lg transition-all duration-300 hover:shadow-xl">
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}