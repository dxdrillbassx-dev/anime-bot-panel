import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { 
  Terminal, 
  Search, 
  Plus, 
  Play, 
  Pause, 
  Edit3, 
  Trash2,
  Settings,
  Code,
  Hash,
  MoreHorizontal,
  BarChart3
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
import { Switch } from "@/components/ui/switch"

const Commands = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCommand, setSelectedCommand] = useState<any>(null)

  const commands = [
    {
      id: 1,
      name: "play",
      description: "Play a video or audio file",
      usage: "/play <video_name>",
      category: "Media",
      permissions: ["use_slash_commands"],
      isEnabled: true,
      usageCount: 1247,
      lastUsed: "2 minutes ago",
      aliases: ["p", "start"],
      cooldown: 3
    },
    {
      id: 2,
      name: "upload",
      description: "Upload a new video to the bot",
      usage: "/upload <file>",
      category: "Media",
      permissions: ["attach_files", "use_slash_commands"],
      isEnabled: true,
      usageCount: 456,
      lastUsed: "1 hour ago",
      aliases: ["up"],
      cooldown: 30
    },
    {
      id: 3,
      name: "userinfo",
      description: "Get information about a user",
      usage: "/userinfo [@user]",
      category: "Utility",
      permissions: ["use_slash_commands"],
      isEnabled: true,
      usageCount: 892,
      lastUsed: "15 minutes ago",
      aliases: ["info", "whois"],
      cooldown: 5
    },
    {
      id: 4,
      name: "ban",
      description: "Ban a user from the server",
      usage: "/ban <@user> [reason]",
      category: "Moderation",
      permissions: ["ban_members", "use_slash_commands"],
      isEnabled: true,
      usageCount: 23,
      lastUsed: "3 days ago",
      aliases: [],
      cooldown: 0
    },
    {
      id: 5,
      name: "stats",
      description: "Show bot statistics and information",
      usage: "/stats",
      category: "Utility",
      permissions: ["use_slash_commands"],
      isEnabled: false,
      usageCount: 334,
      lastUsed: "1 week ago",
      aliases: ["statistics", "info"],
      cooldown: 10
    }
  ]

  const filteredCommands = commands.filter(command =>
    command.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    command.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    command.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'media': return 'bg-purple-500/10 text-purple-400 border-purple-500/20'
      case 'moderation': return 'bg-red-500/10 text-red-400 border-red-500/20'
      case 'utility': return 'bg-blue-500/10 text-blue-400 border-blue-500/20'
      default: return 'bg-gray-500/10 text-gray-400 border-gray-500/20'
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'media': return Play
      case 'moderation': return Settings
      case 'utility': return Code
      default: return Hash
    }
  }

  const toggleCommand = (commandId: number) => {
    // In a real app, this would make an API call
    console.log(`Toggling command ${commandId}`)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Bot Commands
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage and configure your Discord bot commands
          </p>
        </div>
        <Button className="bg-gradient-primary hover:shadow-glow transition-all duration-300">
          <Plus className="h-4 w-4 mr-2" />
          New Command
        </Button>
      </div>

      {/* Search and Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3">
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardContent className="p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search commands..."
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
            <div className="text-2xl font-bold text-green-400">{commands.filter(c => c.isEnabled).length}</div>
            <p className="text-sm text-muted-foreground">Active</p>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold">{commands.length}</div>
            <p className="text-sm text-muted-foreground">Total</p>
          </CardContent>
        </Card>
      </div>

      {/* Commands List */}
      <div className="space-y-4">
        {filteredCommands.map((command) => {
          const CategoryIcon = getCategoryIcon(command.category)
          
          return (
            <Card 
              key={command.id} 
              className="bg-card/50 backdrop-blur-sm border-border/50 hover:shadow-glow transition-all duration-300"
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-gradient-primary rounded-lg">
                      <Terminal className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <div>
                      <CardTitle className="flex items-center space-x-2">
                        <span className="font-mono text-lg">/{command.name}</span>
                        <Badge className={getCategoryColor(command.category)}>
                          <CategoryIcon className="h-3 w-3 mr-1" />
                          {command.category}
                        </Badge>
                      </CardTitle>
                      <CardDescription className="mt-1">
                        {command.description}
                      </CardDescription>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch 
                      checked={command.isEnabled}
                      onCheckedChange={() => toggleCommand(command.id)}
                    />
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setSelectedCommand(command)}>
                          <BarChart3 className="h-4 w-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit3 className="h-4 w-4 mr-2" />
                          Edit Command
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <label className="text-muted-foreground font-medium">Usage</label>
                    <p className="font-mono bg-secondary/50 px-2 py-1 rounded mt-1">
                      {command.usage}
                    </p>
                  </div>
                  
                  <div>
                    <label className="text-muted-foreground font-medium">Total Uses</label>
                    <p className="font-semibold mt-1">{command.usageCount.toLocaleString()}</p>
                  </div>

                  <div>
                    <label className="text-muted-foreground font-medium">Last Used</label>
                    <p className="mt-1">{command.lastUsed}</p>
                  </div>

                  <div>
                    <label className="text-muted-foreground font-medium">Cooldown</label>
                    <p className="mt-1">{command.cooldown}s</p>
                  </div>
                </div>

                {command.aliases.length > 0 && (
                  <div className="mt-4">
                    <label className="text-muted-foreground font-medium text-sm">Aliases</label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {command.aliases.map((alias, index) => (
                        <Badge key={index} variant="outline" className="font-mono text-xs">
                          /{alias}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Command Details Modal */}
      <Dialog open={!!selectedCommand} onOpenChange={() => setSelectedCommand(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Command Details</DialogTitle>
            <DialogDescription>Detailed information and statistics</DialogDescription>
          </DialogHeader>
          {selectedCommand && (
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-gradient-primary rounded-lg">
                  <Terminal className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold font-mono">/{selectedCommand.name}</h3>
                  <p className="text-muted-foreground">{selectedCommand.description}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Category</label>
                  <p className="text-sm">{selectedCommand.category}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Usage Count</label>
                  <p className="text-sm font-semibold">{selectedCommand.usageCount.toLocaleString()}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Last Used</label>
                  <p className="text-sm">{selectedCommand.lastUsed}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Cooldown</label>
                  <p className="text-sm">{selectedCommand.cooldown} seconds</p>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">Required Permissions</label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedCommand.permissions.map((permission: string, index: number) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {permission.replace(/_/g, ' ')}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex space-x-2">
                <Button className="flex-1">
                  <Edit3 className="h-4 w-4 mr-2" />
                  Edit Command
                </Button>
                <Button variant="destructive" className="flex-1">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Command
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {filteredCommands.length === 0 && (
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Terminal className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-lg font-medium mb-2">No commands found</p>
            <p className="text-muted-foreground text-center">
              Try adjusting your search terms or create a new command
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default Commands