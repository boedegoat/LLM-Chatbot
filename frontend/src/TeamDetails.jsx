"use client"

import { useState } from "react"
import { Button } from "./Button"
import { Card, CardContent, CardHeader, CardTitle } from "./Card"
import { Avatar, AvatarFallback, AvatarImage } from "./Avatar"
import { Badge } from "./Badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./Tabs"
import { Textarea } from "./Textarea"


export default function TeamDetails( params ) {
//   const { user } = useAuth()
  const [message, setMessage] = useState("")

  // In a real app, you would fetch this data based on the ID
  const team = {
    id: params.id,
    name: "Blockchain Innovators",
    description:
      "Building a decentralized protocol for cross-chain asset transfers with minimal fees and maximum security.",
    hackathon: {
      id: "nights",
      name: "nights",
    },
    members: [
      {
        id: "user1",
        name: "Alex",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Team Lead",
        skills: ["Solidity", "Smart Contracts", "DeFi"],
      },
      {
        id: "user2",
        name: "Jamie",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Frontend Developer",
        skills: ["React", "UI/UX", "Web3.js"],
      },
    ],
    openToMembers: true,
    maxMembers: 4,
    skills: ["Solidity", "React", "Smart Contracts"],
    repository: "https://github.com/blockchain-innovators/cross-chain-protocol",
    discussions: [
      {
        id: "disc1",
        user: { id: "user1", name: "Alex", avatar: "/placeholder.svg?height=40&width=40" },
        message:
          "I've set up the initial project structure. Let's discuss the architecture for the cross-chain protocol.",
        timestamp: "2 hours ago",
      },
      {
        id: "disc2",
        user: { id: "user2", name: "Jamie", avatar: "/placeholder.svg?height=40&width=40" },
        message:
          "Sounds good! I'm thinking we should use a bridge contract with a liquidity pool for each supported chain.",
        timestamp: "1 hour ago",
      },
    ],
  }

//   const isTeamMember = user && team.members.some((member) => member.id === user.id)
//   const isTeamLead = user && team.members.length > 0 && team.members[0].id === user.id

  const handleSendMessage = () => {
    if (!message.trim()) return

    // In a real app, this would send the message to an API
    console.log("Sending message:", message)
    setMessage("")
  }

  return (
    <div className="container mx-auto py-12">
      <div className="max-w-5xl mx-auto">
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h1 className="text-3xl font-bold">{team.name}</h1>
                  {team.openToMembers && (
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Open to members</Badge>
                  )}
                </div>

                <p className="text-muted-foreground mb-4">{team.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {team.skills.map((skill) => (
                    <Badge key={skill} variant="outline">
                      {skill}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <img src="/users.svg" alt="users" className="h-4 w-4"  />
                  <span>
                    {team.members.length} / {team.maxMembers} members
                  </span>
                  <span className="text-muted-foreground">•</span>
                  <span>Hackathon: {team.hackathon.name}</span>
                </div>
              </div>

              {/* <div className="flex flex-col gap-3">
                {isTeamMember ? (
                  <>
                    <Button className="gap-2" asChild>
                      <a href={team.repository} target="_blank" rel="noopener noreferrer">
                        <img src="/code.svg" alt="code" className="h-4 w-4" />
                        View Repository
                      </a>
                    </Button>
                    {isTeamLead && (
                      <Button variant="outline" className="gap-2">
                        <img src="/settings.svg" alt="settings" className="h-4 w-4"  />
                        Team Settings
                      </Button>
                    )}
                  </>
                ) : (
                  <>
                    <Button className="gap-2">
                      <img src="/user-plus.svg" alt="userplus" className="h-4 w-4"  />
                      Request to Join
                    </Button>
                    <Button variant="outline" className="gap-2">
                      <img src="/share2.svg" alt="share" className="h-4 w-4"  />
                      Share
                    </Button>
                  </>
                )}
              </div> */}
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="members">
          <TabsList className="mb-6">
            <TabsTrigger value="members">Members</TabsTrigger>
            <TabsTrigger value="discussions">Discussions</TabsTrigger>
            <TabsTrigger value="project">Project</TabsTrigger>
          </TabsList>

          <TabsContent value="members">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {team.members.map((member) => (
                <Card key={member.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={member.avatar} alt={member.name} />
                        <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                      </Avatar>

                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-semibold">{member.name}</h3>
                          <Badge variant="outline">{member.role}</Badge>
                        </div>

                        <div className="flex flex-wrap gap-1 mb-2">
                          {member.skills.map((skill) => (
                            <span key={skill} className="text-xs bg-muted px-2 py-0.5 rounded">
                              {skill}
                            </span>
                          ))}
                        </div>

                        <Button variant="ghost" size="sm" className="p-0 h-auto text-blue-600">
                          View Profile
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {team.openToMembers && team.members.length < team.maxMembers && (
                <Card className="border-dashed">
                  <CardContent className="p-6 flex flex-col items-center justify-center h-full text-center">
                    <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
                      <img src="/user-plus.svg" alt="userplus" className="h-6 w-6 text-muted-foreground"  />
                    </div>
                    <h3 className="font-semibold mb-2">Looking for Team Members</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      This team is looking for {team.maxMembers - team.members.length} more members to join
                    </p>
                    <Button size="sm">Request to Join</Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="discussions">
            <Card>
              <CardHeader>
                <CardTitle>Team Discussions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* <div className="space-y-4">
                  {team.discussions.map((discussion) => (
                    <div key={discussion.id} className="flex gap-4">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={discussion.user.avatar} alt={discussion.user.name} />
                        <AvatarFallback>{discussion.user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium">{discussion.user.name}</span>
                          <span className="text-xs text-muted-foreground">{discussion.timestamp}</span>
                        </div>
                        <p className="text-sm">{discussion.message}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {isTeamMember && (
                  <div className="flex gap-4 pt-4 border-t">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user?.avatar} alt={user?.name} />
                      <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 flex gap-2">
                      <Textarea
                        placeholder="Type your message..."
                        className="flex-1 min-h-[80px]"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                      />
                      <Button className="self-end" onClick={handleSendMessage}>
                        <img src="/message-square.svg" alt="message" className="h-4 w-4" />
                        <span className="sr-only">Send</span>
                      </Button>
                    </div>
                  </div>
                )} */}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="project">
            <Card>
              <CardHeader>
                <CardTitle>Project Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">Repository</h3>
                  <div className="flex items-center gap-2 p-3 bg-muted rounded-md">
                    <img src="/code.svg" alt="code" className="h-5 w-5 text-blue-600" />
                    <a
                      href={team.repository}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {team.repository}
                    </a>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">Project Status</h3>
                  <div className="p-3 bg-muted rounded-md">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Progress</span>
                      <span className="text-sm">25%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2.5">
                      <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "25%" }}></div>
                    </div>
                  </div>
                </div>

                {/* {isTeamMember && (
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold">Project Resources</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Button variant="outline" className="justify-start gap-2">
                        <img src="/code.svg" alt="code" className="h-4 w-4"  />
                        View Code Repository
                      </Button>
                      <Button variant="outline" className="justify-start gap-2">
                        <img src="/message-square.svg" alt="message" className="h-4 w-4" />
                        Team Chat
                      </Button>
                    </div>
                  </div>
                )} */}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

