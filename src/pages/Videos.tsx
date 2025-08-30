import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { 
  Video, 
  Search, 
  Upload, 
  Play, 
  Download, 
  Trash2, 
  Eye,
  Calendar,
  FileVideo,
  MoreHorizontal
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const Videos = () => {
  const [searchTerm, setSearchTerm] = useState("")

  const videos = [
    {
      id: 1,
      title: "Epic Gaming Montage #1",
      thumbnail: "/placeholder.svg",
      duration: "3:24",
      size: "45.2 MB",
      uploadedBy: "User123",
      uploadDate: "2024-01-15",
      views: 1234,
      status: "active"
    },
    {
      id: 2,
      title: "Funny Moments Compilation",
      thumbnail: "/placeholder.svg",
      duration: "5:17",
      size: "78.3 MB",
      uploadedBy: "GamerPro",
      uploadDate: "2024-01-14",
      views: 856,
      status: "active"
    },
    {
      id: 3,
      title: "Tutorial: Advanced Commands",
      thumbnail: "/placeholder.svg",
      duration: "12:45",
      size: "156.7 MB",
      uploadedBy: "BotAdmin",
      uploadDate: "2024-01-13",
      views: 2341,
      status: "featured"
    },
    {
      id: 4,
      title: "Server Highlights",
      thumbnail: "/placeholder.svg",
      duration: "8:32",
      size: "98.1 MB",
      uploadedBy: "Moderator",
      uploadDate: "2024-01-12",
      views: 567,
      status: "processing"
    }
  ]

  const filteredVideos = videos.filter(video =>
    video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    video.uploadedBy.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500/10 text-green-400 border-green-500/20'
      case 'featured': return 'bg-purple-500/10 text-purple-400 border-purple-500/20'
      case 'processing': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
      default: return 'bg-gray-500/10 text-gray-400 border-gray-500/20'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Video Management
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage uploaded videos and content from your Discord bot
          </p>
        </div>
        <Button className="bg-gradient-primary hover:shadow-glow transition-all duration-300">
          <Upload className="h-4 w-4 mr-2" />
          Upload Video
        </Button>
      </div>

      {/* Search and Filters */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search videos by title or uploader..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className="px-3 py-1">
                {filteredVideos.length} videos
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Videos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredVideos.map((video) => (
          <Card 
            key={video.id} 
            className="bg-card/50 backdrop-blur-sm border-border/50 hover:shadow-glow transition-all duration-300 group overflow-hidden"
          >
            <div className="relative aspect-video bg-secondary/50 overflow-hidden">
              <img 
                src={video.thumbnail} 
                alt={video.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Button 
                  size="sm" 
                  className="bg-primary/80 backdrop-blur-sm"
                >
                  <Play className="h-4 w-4" />
                </Button>
              </div>
              <div className="absolute bottom-2 right-2 bg-black/70 backdrop-blur-sm text-white text-xs px-2 py-1 rounded">
                {video.duration}
              </div>
              <Badge 
                className={`absolute top-2 left-2 ${getStatusColor(video.status)}`}
              >
                {video.status}
              </Badge>
            </div>
            
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <CardTitle className="text-sm line-clamp-2 group-hover:text-primary transition-colors">
                  {video.title}
                </CardTitle>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>

            <CardContent className="pt-0 space-y-2">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>by {video.uploadedBy}</span>
                <span>{video.size}</span>
              </div>
              
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Calendar className="h-3 w-3" />
                  <span>{video.uploadDate}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Eye className="h-3 w-3" />
                  <span>{video.views}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredVideos.length === 0 && (
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <FileVideo className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-lg font-medium mb-2">No videos found</p>
            <p className="text-muted-foreground text-center">
              {searchTerm ? "Try adjusting your search terms" : "Start by uploading your first video"}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default Videos