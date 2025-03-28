"use client"

import { Button } from "./Button"
import { Card, CardContent } from "./Card"
import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "./Avatar"
import { Badge } from "./Badge"
import Link from "./Link"


export default function TeamSection({ hackathonId }) {
  const [teams, setTeams] = useState([
    {
      id: "team1",
      name: "Blockchain Innovators",
      members: [
        { id: "user1", name: "Alex", avatar: "/placeholder.svg?height=40&width=40" },
        { id: "user2", name: "Jamie", avatar: "/placeholder.svg?height=40&width=40" },
      ],
      description:
        "Building a decentralized protocol for cross-chain asset transfers with minimal fees and maximum security.",
      openToMembers: true,
      skills: ["Solidity", "React", "Smart Contracts"],
    },
    {
      id: "team2",
      name: "DeFi Disruptors",
      members: [
        { id: "user3", name: "Taylor", avatar: "/placeholder.svg?height=40&width=40" },
        { id: "user4", name: "Jordan", avatar: "/placeholder.svg?height=40&width=40" },
        { id: "user5", name: "Casey", avatar: "/placeholder.svg?height=40&width=40" },
      ],
      description:
        "Creating a novel lending protocol that optimizes capital efficiency through dynamic interest rates and risk assessment.",
      openToMembers: false,
      skills: ["DeFi", "Solidity", "Financial Modeling"],
    },
  ])

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-semibold mb-1">Teams</h2>
          <p className="text-muted-foreground">
            Join an existing team or create your own to participate in this hackathon
          </p>
        </div>
        <Button className="gap-2">
          <img src="./plus.svg" alt="plus"  className="h-4 w-4" />
           Create Team
        </Button>
      </div>

      {teams.length > 0 ? (
        <div className="grid grid-cols-1 gap-6">
          {teams.map((team) => (
            <Card key={team.id} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xl font-semibold">{team.name}</h3>
                      {team.openToMembers ? (
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Open to members</Badge>
                      ) : (
                        <Badge variant="outline" className="text-muted-foreground">
                          Team complete
                        </Badge>
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
                      <img src="./users.svg" alt="users" className="h-4 w-4" />
                      <span>{team.members.length} members</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4">
                    <div className="flex -space-x-2">
                      {team.members.map((member) => (
                        <Avatar key={member.id} className="border-2 border-background">
                          <AvatarImage src={member.avatar} alt={member.name} />
                          <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                      ))}
                      {team.openToMembers && (
                        <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center border-2 border-background">
                          <img src="./plus.svg" alt="plus" className="h-4 w-4 text-muted-foreground" />
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col gap-2">
                      <Button variant="outline" size="sm" className="gap-2" asChild>
                        <Link href={`/teams/${team.id}`}>
                          <img src="./users.svg" alt="users" className="h-4 w-4" />
                          View Team
                        </Link>
                      </Button>
                      {team.openToMembers && (
                        <Button size="sm" className="gap-2">
                          <img src="./user-plus.svg" alt="userplus" className="h-4 w-4"/>
                          Request to Join
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-muted/30 rounded-lg">
          <img src="./users.svg" alt="users" className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold mb-2">No teams yet</h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Be the first to create a team for this hackathon and start recruiting members.
          </p>
          <Button className="gap-2">
            <img src="./plus.svg" alt="plus" className="h-4 w-4"  />
            Create Team
          </Button>
        </div>
      )}
    </div>
  )
}

