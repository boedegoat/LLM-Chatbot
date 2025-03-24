import * as React from "react"
import { Card, CardContent, CardFooter } from "./Card"
import { Badge } from "./Badge"
import { Button } from "./Button"
import Link from "./Link"
import { useState } from "react"
import { cn } from "./utils"

export default function FeaturedHackathons() {
  const [activeCategory, setActiveCategory] = useState("all")

  const categories = [
    { id: "all", name: "All" }, 
    { id: "defi", name: "DeFi" },
    { id: "nft", name: "NFT" },
    { id: "dao", name: "DAO" },
    { id: "gaming", name: "Gaming" },
  ]

  const hackathons = [
    {
      id: "defi-summit",
      title: "DeFi Summit 2025",
      description: "Build the future of decentralized finance with innovative solutions and protocols.",
      startDate: "Mar 15, 2025",
      endDate: "Apr 4, 2025",
      prize: "$50,000",
      participants: 120,
      category: "defi",
      status: "upcoming",
      image: "/placeholder.svg?height=80&width=80",
      organizer: "DeFi Alliance",
      featured: true,
    },
    {
      id: "nft-creators",
      title: "NFT Creators Hackathon",
      description: "Create the next generation of digital collectibles and NFT marketplaces.",
      startDate: "Apr 10, 2025",
      endDate: "Apr 25, 2025",
      prize: "$30,000",
      participants: 85,
      category: "nft",
      status: "upcoming",
      image: "/placeholder.svg?height=80&width=80",
      organizer: "NFT Collective",
      featured: true,
    },
    {
      id: "dao-governance",
      title: "DAO Governance Challenge",
      description: "Reimagine governance for decentralized autonomous organizations.",
      startDate: "May 5, 2025",
      endDate: "May 20, 2025",
      prize: "$25,000",
      participants: 65,
      category: "dao",
      status: "upcoming",
      image: "/placeholder.svg?height=80&width=80",
      organizer: "DAO Alliance",
      featured: true,
    },
    {
      id: "web3-gaming",
      title: "Web3 Gaming Hackathon",
      description: "Build the next generation of blockchain-based games and gaming platforms.",
      startDate: "Jun 1, 2025",
      endDate: "Jun 21, 2025",
      prize: "$40,000",
      participants: 95,
      category: "gaming",
      status: "upcoming",
      image: "/placeholder.svg?height=80&width=80",
      organizer: "GameFi Foundation",
      featured: true,
    },
  ]

  const filteredHackathons =
    activeCategory === "all" ? hackathons : hackathons.filter((h) => h.category === activeCategory)

  return (
    <div>
      <div className="flex overflow-x-auto pb-4 mb-6 gap-2 scrollbar-hide">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={activeCategory === category.id ? "default" : "outline"}
            className={cn("rounded-full", activeCategory === category.id ? "bg-purple-600 hover:bg-purple-700" : "")}
            onClick={() => setActiveCategory(category.id)}
          >
            {category.name}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredHackathons.map((hackathon) => (
          <Card key={hackathon.id} className="overflow-hidden hover:shadow-md transition-shadow">
            <CardContent className="p-0">
              <div className="flex flex-col sm:flex-row">
                <div className="w-full sm:w-32 h-32 bg-purple-100 flex items-center justify-center p-4">
                  <img
                    src={hackathon.image || "/placeholder.svg"}
                    alt={hackathon.title}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
                <div className="p-6 flex-1">
                  <div className="flex flex-wrap gap-2 mb-2">
                    <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100 border-purple-200">
                      {hackathon.category.toUpperCase()}
                    </Badge>
                    <Badge variant="outline" className="text-muted-foreground">
                      <img src="/clock.svg" className="h-3 w-3 mr-1" />
                      Upcoming
                    </Badge>
                  </div>

                  <h3 className="text-xl font-semibold mb-2">{hackathon.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{hackathon.description}</p>

                  <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
                    <div className="flex items-center text-muted-foreground">
                      <img src="/calendar.svg" className="h-4 w-4 mr-1" />
                      <span>
                        {hackathon.startDate} - {hackathon.endDate}
                      </span>
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <img src="/trophy.svg" className="h-4 w-4 mr-1" />
                      <span>{hackathon.prize}</span>
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <img src="/users.svg" className="h-4 w-4 mr-1" />
                      <span>{hackathon.participants} participants</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-muted/30 p-4 flex justify-between">
              <div className="text-sm">
                By <span className="font-medium">{hackathon.organizer}</span>
              </div>
              <Button size="sm" variant="ghost" asChild>
                <Link href={`/explore/${hackathon.id}`} className="gap-1">
                  View Details
                  <img src="/arrowright.svg" className="h-4 w-4 mr-1" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

