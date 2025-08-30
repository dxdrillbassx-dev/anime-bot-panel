import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Users as UsersIcon, 
  Search, 
  UserPlus, 
  MoreHorizontal,
  Crown,
  Shield,
  Calendar,
  MessageSquare,
  Activity,
  Ban,
  UserMinus
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const Users = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedUser, setSelectedUser] = useState<any>(null)

  const users = [
    {
      id: 1,
      username: "CyberNinja",
      discriminator: "0001",
      avatar: "/placeholder.svg",
      joinDate: "2023-06-15",
      lastActive: "2 hours ago",
      messagesCount: 1247,
      videosUploaded: 12,
      role: "admin",
      status: "online",
      badges: ["premium", "early_supporter"]
    },
    {
      id: 2,
      username: "PixelMaster",
      discriminator: "1337",
      avatar: "/placeholder.svg",
      joinDate: "2023-08-22",
      lastActive: "1 day ago",
      messagesCount: 856,
      videosUploaded: 8,
      role: "moderator",
      status: "away",
      badges: ["premium"]
    },
    {
      id: 3,
      username: "GameLord",
      discriminator: "4567",
      avatar: "/placeholder.svg",
      joinDate: "2024-01-10",
      lastActive: "5 minutes ago",
      messagesCount: 324,
      videosUploaded: 3,
      role: "member",
      status: "online",
      badges: []
    },
    {
      id: 4,
      username: "StreamQueen",
      discriminator: "9999",
      avatar: "/placeholder.svg",
      joinDate: "2023-12-03",
      lastActive: "1 week ago",
      messagesCount: 2156,
      videosUploaded: 25,
      role: "member",
      status: "offline",
      badges: ["premium", "content_creator"]
    }
  ]

  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.discriminator.includes(searchTerm)
  )

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-500/10 text-red-400 border-red-500/20'
      case 'moderator': return 'bg-blue-500/10 text-blue-400 border-blue-500/20'
      default: return 'bg-gray-500/10 text-gray-400 border-gray-500/20'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500'
      case 'away': return 'bg-yellow-500'
      case 'busy': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin': return Crown
      case 'moderator': return Shield
      default: return UsersIcon
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            User Management
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage Discord server members and their permissions
          </p>
        </div>
        <Button className="bg-gradient-primary hover:shadow-glow transition-all duration-300">
          <UserPlus className="h-4 w-4 mr-2" />
          Invite User
        </Button>
      </div>

      {/* Search and Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardContent className="p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search users by username or discriminator..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold">{filteredUsers.length}</div>
            <p className="text-sm text-muted-foreground">Total Users</p>
          </CardContent>
        </Card>
      </div>

      {/* Users List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.map((user) => {
          const RoleIcon = getRoleIcon(user.role)
          
          return (
            <Card 
              key={user.id} 
              className="bg-card/50 backdrop-blur-sm border-border/50 hover:shadow-glow transition-all duration-300 group"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Avatar className="h-12 w-12 ring-2 ring-primary/20">
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback className="bg-gradient-primary text-primary-foreground">
                          {user.username.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className={`absolute -bottom-1 -right-1 h-4 w-4 ${getStatusColor(user.status)} rounded-full border-2 border-card`}></div>
                    </div>
                    <div>
                      <CardTitle className="text-base group-hover:text-primary transition-colors">
                        {user.username}
                      </CardTitle>
                      <CardDescription className="text-xs">
                        #{user.discriminator}
                      </CardDescription>
                    </div>
                  </div>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setSelectedUser(user)}>
                        <Activity className="h-4 w-4 mr-2" />
                        View Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Send Message
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        <Ban className="h-4 w-4 mr-2" />
                        Ban User
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>

              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <Badge className={getRoleColor(user.role)}>
                    <RoleIcon className="h-3 w-3 mr-1" />
                    {user.role}
                  </Badge>
                  <span className="text-xs text-muted-foreground capitalize">{user.status}</span>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Messages</span>
                    <span className="font-medium">{user.messagesCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Videos</span>
                    <span className="font-medium">{user.videosUploaded}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Last Active</span>
                    <span className="font-medium">{user.lastActive}</span>
                  </div>
                </div>

                {user.badges.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {user.badges.map((badge, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {badge.replace('_', ' ')}
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* User Profile Modal */}
      <Dialog open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>User Profile</DialogTitle>
            <DialogDescription>Detailed information about the user</DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <Avatar className="h-16 w-16 ring-2 ring-primary/20">
                  <AvatarImage src={selectedUser.avatar} />
                  <AvatarFallback className="bg-gradient-primary text-primary-foreground text-lg">
                    {selectedUser.username.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-semibold">{selectedUser.username}#{selectedUser.discriminator}</h3>
                  <Badge className={getRoleColor(selectedUser.role)}>
                    {selectedUser.role}
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Join Date</label>
                  <p className="text-sm">{selectedUser.joinDate}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Status</label>
                  <p className="text-sm capitalize">{selectedUser.status}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Messages Sent</label>
                  <p className="text-sm">{selectedUser.messagesCount}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Videos Uploaded</label>
                  <p className="text-sm">{selectedUser.videosUploaded}</p>
                </div>
              </div>

              <div className="flex space-x-2">
                <Button className="flex-1">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
                <Button variant="destructive" className="flex-1">
                  <UserMinus className="h-4 w-4 mr-2" />
                  Remove User
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {filteredUsers.length === 0 && (
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <UsersIcon className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-lg font-medium mb-2">No users found</p>
            <p className="text-muted-foreground text-center">
              Try adjusting your search terms
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default Users