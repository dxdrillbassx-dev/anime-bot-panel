import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  MessageSquare, 
  Send, 
  Search, 
  Clock,
  Check,
  CheckCheck,
  Bot,
  User,
  Paperclip,
  Smile
} from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

const Messenger = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedConversation, setSelectedConversation] = useState<any>(null)
  const [newMessage, setNewMessage] = useState("")

  const conversations = [
    {
      id: 1,
      user: {
        username: "CyberNinja",
        discriminator: "0001",
        avatar: "/placeholder.svg"
      },
      lastMessage: "Hey, can you help me with the video upload command?",
      timestamp: "2 minutes ago",
      unreadCount: 2,
      isOnline: true
    },
    {
      id: 2,
      user: {
        username: "PixelMaster",
        discriminator: "1337",
        avatar: "/placeholder.svg"
      },
      lastMessage: "Thanks for the quick response!",
      timestamp: "1 hour ago",
      unreadCount: 0,
      isOnline: false
    },
    {
      id: 3,
      user: {
        username: "GameLord",
        discriminator: "4567",
        avatar: "/placeholder.svg"
      },
      lastMessage: "The bot seems to be offline in our server",
      timestamp: "3 hours ago",
      unreadCount: 1,
      isOnline: true
    }
  ]

  const messages = selectedConversation ? [
    {
      id: 1,
      content: "Hey, can you help me with the video upload command?",
      sender: "user",
      timestamp: "2:30 PM",
      status: "delivered"
    },
    {
      id: 2,
      content: "Of course! The upload command allows you to upload videos directly to the bot. Just use `/upload` followed by your file attachment.",
      sender: "bot",
      timestamp: "2:31 PM",
      status: "delivered"
    },
    {
      id: 3,
      content: "What's the maximum file size limit?",
      sender: "user",
      timestamp: "2:32 PM",
      status: "read"
    },
    {
      id: 4,
      content: "The current limit is 100MB per file. For larger files, you might want to use a file sharing service and provide the link instead.",
      sender: "bot",
      timestamp: "2:33 PM",
      status: "read"
    },
    {
      id: 5,
      content: "Perfect, that should work for my needs. Thanks!",
      sender: "user",
      timestamp: "2:35 PM",
      status: "read"
    }
  ] : []

  const filteredConversations = conversations.filter(conversation =>
    conversation.user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conversation.user.discriminator.includes(searchTerm)
  )

  const sendMessage = () => {
    if (newMessage.trim() && selectedConversation) {
      // In a real app, this would send the message via API
      console.log("Sending message:", newMessage)
      setNewMessage("")
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Bot Messenger
          </h1>
          <p className="text-muted-foreground mt-1">
            Direct message users through your Discord bot
          </p>
        </div>
        <Badge className="bg-green-500/10 text-green-400 border-green-500/20 px-3 py-1">
          <div className="h-2 w-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
          Bot Active
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
        {/* Conversations List */}
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Conversations</CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search conversations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[480px]">
              <div className="space-y-1 p-3">
                {filteredConversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    onClick={() => setSelectedConversation(conversation)}
                    className={`p-3 rounded-lg cursor-pointer transition-all duration-200 hover:bg-secondary/80 ${
                      selectedConversation?.id === conversation.id 
                        ? 'bg-primary/10 border border-primary/20' 
                        : ''
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="relative">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={conversation.user.avatar} />
                          <AvatarFallback className="bg-gradient-primary text-primary-foreground text-sm">
                            {conversation.user.username.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        {conversation.isOnline && (
                          <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-500 rounded-full border-2 border-card"></div>
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium truncate">
                            {conversation.user.username}
                          </p>
                          <span className="text-xs text-muted-foreground">
                            {conversation.timestamp}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground truncate mt-1">
                          {conversation.lastMessage}
                        </p>
                      </div>
                      
                      {conversation.unreadCount > 0 && (
                        <Badge className="bg-primary text-primary-foreground text-xs min-w-[20px] h-5 rounded-full flex items-center justify-center">
                          {conversation.unreadCount}
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Chat Area */}
        <div className="lg:col-span-2">
          {selectedConversation ? (
            <Card className="bg-card/50 backdrop-blur-sm border-border/50 h-full flex flex-col">
              <CardHeader className="border-b border-border/50">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={selectedConversation.user.avatar} />
                      <AvatarFallback className="bg-gradient-primary text-primary-foreground">
                        {selectedConversation.user.username.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    {selectedConversation.isOnline && (
                      <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-500 rounded-full border-2 border-card"></div>
                    )}
                  </div>
                  <div>
                    <CardTitle className="text-base">
                      {selectedConversation.user.username}#{selectedConversation.user.discriminator}
                    </CardTitle>
                    <CardDescription className="text-xs">
                      {selectedConversation.isOnline ? 'Online' : 'Offline'}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="flex-1 flex flex-col p-0">
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender === 'bot' ? 'justify-start' : 'justify-end'}`}
                      >
                        <div className={`max-w-[70%] ${
                          message.sender === 'bot' 
                            ? 'bg-secondary rounded-lg rounded-bl-none' 
                            : 'bg-primary text-primary-foreground rounded-lg rounded-br-none'
                        } p-3`}>
                          <div className="flex items-start space-x-2">
                            {message.sender === 'bot' && (
                              <Bot className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                            )}
                            <div className="flex-1">
                              <p className="text-sm">{message.content}</p>
                              <div className="flex items-center justify-between mt-2">
                                <span className="text-xs opacity-70">{message.timestamp}</span>
                                {message.sender === 'bot' && (
                                  <div className="flex items-center space-x-1">
                                    {message.status === 'read' ? (
                                      <CheckCheck className="h-3 w-3 text-blue-400" />
                                    ) : (
                                      <Check className="h-3 w-3 opacity-70" />
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                <div className="border-t border-border/50 p-4">
                  <div className="flex items-end space-x-2">
                    <div className="flex-1">
                      <Textarea
                        placeholder="Type your message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="min-h-[40px] max-h-[120px] resize-none"
                      />
                    </div>
                    <div className="flex space-x-1">
                      <Button variant="ghost" size="sm" className="h-10 w-10 p-0">
                        <Paperclip className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-10 w-10 p-0">
                        <Smile className="h-4 w-4" />
                      </Button>
                      <Button 
                        onClick={sendMessage}
                        disabled={!newMessage.trim()}
                        className="h-10 bg-gradient-primary hover:shadow-glow transition-all duration-300"
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="bg-card/50 backdrop-blur-sm border-border/50 h-full">
              <CardContent className="flex flex-col items-center justify-center h-full">
                <MessageSquare className="h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">Select a Conversation</h3>
                <p className="text-muted-foreground text-center">
                  Choose a conversation from the list to start messaging users through your bot
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

export default Messenger