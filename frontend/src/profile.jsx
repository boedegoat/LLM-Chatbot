import { Button } from "./Button"
import { Card, CardContent, CardHeader } from "./Card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./Tabs"
import { Avatar, AvatarFallback, AvatarImage } from "./Avatar"
import { useState } from "react"

export default function ProfilePage() {
  const [user] = useState({
    name: "Alex",
    avatar: "/placeholder.svg?height=100&width=100",
    bio: "Web3 developer and hackathon enthusiast. Passionate about building decentralized applications and contributing to open-source projects.",
    followers: 42,
    following: 38,
    hackathonsParticipated: 5,
    hackathonsWon: 2,
    teams: [
      {
        id: "team1",
        name: "Blockchain Builders",
        hackathon: "nights",
        members: 3,
      },
    ],
    posts: [
      {
        id: "post1",
        content:
          "Just joined the nights hackathon! Looking for team members with experience in React and Solidity. DM me if interested!",
        likes: 12,
        comments: 3,
        timestamp: "2 hours ago",
      },
    ],
    projects: [
      {
        id: "project1",
        name: "DeFi Dashboard",
        description: "A comprehensive dashboard for tracking DeFi investments across multiple chains.",
        hackathon: "Web3 Summit",
        placement: "1st Place",
      },
    ],
  })

  return (
    <div className="container mx-auto py-12">
      <div className="max-w-4xl mx-auto">
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <Avatar className="h-24 w-24">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <h1 className="text-2xl font-semibold">{user.name}</h1>
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <img src="/square-pen.svg" alt="edit" className="h-3 w-3"  />
                    Edit Profile
                  </Button>
                </div>

                <p className="text-muted-foreground mb-4">{user.bio}</p>

                <div className="flex flex-wrap gap-6">
                  <div className="flex items-center gap-2">
                    <img src="/users.svg" alt="user" className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                      <span className="font-medium">{user.followers}</span> followers
                    </span>
                    <span className="text-sm text-muted-foreground">•</span>
                    <span className="text-sm">
                      <span className="font-medium">{user.following}</span> following
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <img src="/trophy.svg" alt="trophy" className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                      <span className="font-medium">{user.hackathonsWon}</span> hackathons won
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <img src="/wallet.svg" alt="wallet" className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Connected to Internet Identity</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="posts">
          <TabsList className="mb-6">
            <TabsTrigger value="posts">Posts</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="teams">Teams</TabsTrigger>
            <TabsTrigger value="wallet">Wallet</TabsTrigger>
          </TabsList>

          <TabsContent value="posts">
            {user.posts.length > 0 ? (
              <div className="space-y-4">
                {user.posts.map((post) => (
                  <Card key={post.id}>
                    <CardContent className="p-6">
                      <p className="mb-4">{post.content}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{post.likes} likes</span>
                        <span>{post.comments} comments</span>
                        <span>{post.timestamp}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-slate-50 rounded-md">
                <p className="text-muted-foreground mb-4">You haven&apos;t created any posts yet.</p>
                <Button>Create your first post</Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="projects">
            {user.projects.length > 0 ? (
              <div className="space-y-4">
                {user.projects.map((project) => (
                  <Card key={project.id}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-semibold">{project.name}</h3>
                        <div className="bg-green-50 text-green-600 text-xs font-medium px-2 py-1 rounded">
                          {project.placement}
                        </div>
                      </div>
                      <p className="text-muted-foreground mb-2">{project.description}</p>
                      <div className="text-sm text-muted-foreground">Hackathon: {project.hackathon}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-slate-50 rounded-md">
                <p className="text-muted-foreground mb-4">You haven&apos;t submitted any projects yet.</p>
                <Button>Submit a project</Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="teams">
            {user.teams.length > 0 ? (
              <div className="space-y-4">
                {user.teams.map((team) => (
                  <Card key={team.id}>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-2">{team.name}</h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>Hackathon: {team.hackathon}</span>
                        <span>{team.members} members</span>
                      </div>
                      <div className="mt-4">
                        <Button variant="outline" size="sm">
                          View Team
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-slate-50 rounded-md">
                <p className="text-muted-foreground mb-4">You haven&apos;t joined any teams yet.</p>
                <Button>Find a team</Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="wallet">
            <Card>
              <CardHeader>
                <h3 className="text-xl font-semibold">Team Wallet</h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="p-4 bg-slate-50 rounded-md">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Available Balance</span>
                      <span className="text-xl font-semibold">$500.00</span>
                    </div>
                    <div className="text-xs text-muted-foreground">From nights hackathon prize pool</div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Recent Transactions</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center p-3 bg-white border rounded-md">
                        <div>
                          <p className="font-medium">Prize Distribution</p>
                          <p className="text-xs text-muted-foreground">From nights hackathon</p>
                        </div>
                        <span className="text-green-600 font-medium">+$500.00</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button className="flex-1">Withdraw Funds</Button>
                    <Button variant="outline" className="flex-1">
                      View All Transactions
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

