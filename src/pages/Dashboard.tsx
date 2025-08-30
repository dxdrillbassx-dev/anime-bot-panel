import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  Users, 
  Video, 
  MessageSquare, 
  Activity,
  Server,
  Clock,
  TrendingUp,
  Bot
} from "lucide-react"

const Dashboard = () => {
  const stats = [
    {
      title: "Total Users",
      value: "1,234",
      change: "+12%",
      icon: Users,
      description: "Active bot users"
    },
    {
      title: "Videos Managed",
      value: "567",
      change: "+8%",
      icon: Video,
      description: "Total uploaded videos"
    },
    {
      title: "Messages Today",
      value: "8,456",
      change: "+23%",
      icon: MessageSquare,
      description: "Bot interactions"
    },
    {
      title: "Uptime",
      value: "99.9%",
      change: "Stable",
      icon: Activity,
      description: "Server availability"
    }
  ]

  const serverInfo = [
    { label: "Bot Version", value: "v2.1.0" },
    { label: "Last Restart", value: "2 hours ago" },
    { label: "Memory Usage", value: "45%" },
    { label: "CPU Usage", value: "23%" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Monitor your Discord bot's performance and activity
          </p>
        </div>
        <Badge 
          variant="secondary" 
          className="bg-green-500/10 text-green-400 border-green-500/20 px-3 py-1"
        >
          <div className="h-2 w-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
          Online
        </Badge>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card 
            key={stat.title} 
            className="bg-card/50 backdrop-blur-sm border-border/50 hover:shadow-glow transition-all duration-300 group"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-primary group-hover:scale-110 transition-transform duration-300" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center space-x-2 mt-2">
                <Badge 
                  variant={stat.change.includes('+') ? "default" : "secondary"}
                  className="text-xs"
                >
                  {stat.change}
                </Badge>
                <p className="text-xs text-muted-foreground">{stat.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bot Status */}
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bot className="h-5 w-5 text-primary" />
              <span>Bot Status</span>
            </CardTitle>
            <CardDescription>Current bot information and health</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {serverInfo.map((info, index) => (
              <div key={info.label} className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{info.label}</span>
                <div className="flex items-center space-x-2">
                  {info.label.includes('Usage') && (
                    <Progress 
                      value={parseInt(info.value)} 
                      className="w-20 h-2" 
                    />
                  )}
                  <span className="text-sm font-medium">{info.value}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <span>Recent Activity</span>
            </CardTitle>
            <CardDescription>Latest bot interactions and events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { action: "User joined server", time: "2 minutes ago", type: "join" },
                { action: "Video uploaded", time: "5 minutes ago", type: "video" },
                { action: "Command executed", time: "8 minutes ago", type: "command" },
                { action: "Message sent", time: "12 minutes ago", type: "message" },
              ].map((activity, index) => (
                <div key={index} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-secondary/50 transition-colors">
                  <div className={`h-2 w-2 rounded-full ${
                    activity.type === 'join' ? 'bg-green-500' :
                    activity.type === 'video' ? 'bg-blue-500' :
                    activity.type === 'command' ? 'bg-purple-500' :
                    'bg-orange-500'
                  }`}></div>
                  <div className="flex-1">
                    <p className="text-sm">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Dashboard