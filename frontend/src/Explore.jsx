import { Button } from "./Button"
import  Input  from "./Input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./Select"
import HackathonCard from "./Hackathon-Card"

export default function Explore() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-purple-50 to-background py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Explore Hackathons</h1>
            <p className="text-muted-foreground mb-8">
              Discover opportunities to build, learn, and win prizes in the web3 ecosystem
            </p>

            <div className="relative max-w-2xl mx-auto">
              <img src="./search.svg" alt="search" className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground"  />
              <Input placeholder="Search hackathons by name, technology, or category..." className="pl-10 pr-20" />
              <Button className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8" size="sm">
                Search
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <div className="w-full lg:w-64 flex-shrink-0">
              <div className="sticky top-24 space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">Filters</h2>
                  <Button variant="ghost" size="sm" className="h-8 text-sm">
                    Reset
                  </Button>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
                      <img src="./calendar.svg" alt="calendar" className="h-4 w-4" />
                      Time Frame
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <input type="checkbox" id="upcoming" className="rounded text-purple-600" />
                        <label htmlFor="upcoming" className="text-sm">
                          Upcoming
                        </label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input type="checkbox" id="active" className="rounded text-purple-600" />
                        <label htmlFor="active" className="text-sm">
                          Active
                        </label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input type="checkbox" id="past" className="rounded text-purple-600" />
                        <label htmlFor="past" className="text-sm">
                          Past
                        </label>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
                      <img src="./tag.svg" alt="tag" className="h-4 w-4" />
                      Categories
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <input type="checkbox" id="defi" className="rounded text-purple-600" />
                        <label htmlFor="defi" className="text-sm">
                          DeFi
                        </label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input type="checkbox" id="nft" className="rounded text-purple-600" />
                        <label htmlFor="nft" className="text-sm">
                          NFT
                        </label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input type="checkbox" id="dao" className="rounded text-purple-600" />
                        <label htmlFor="dao" className="text-sm">
                          DAO
                        </label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input type="checkbox" id="gaming" className="rounded text-purple-600" />
                        <label htmlFor="gaming" className="text-sm">
                          Gaming
                        </label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input type="checkbox" id="social" className="rounded text-purple-600" />
                        <label htmlFor="social" className="text-sm">
                          Social
                        </label>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
                      <img src="./dollarsign.svg" alt="dollarsign" className="h-4 w-4" />
                      Prize Pool
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <input type="checkbox" id="prize1" className="rounded text-purple-600" />
                        <label htmlFor="prize1" className="text-sm">
                          $0 - $5,000
                        </label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input type="checkbox" id="prize2" className="rounded text-purple-600" />
                        <label htmlFor="prize2" className="text-sm">
                          $5,000 - $20,000
                        </label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input type="checkbox" id="prize3" className="rounded text-purple-600" />
                        <label htmlFor="prize3" className="text-sm">
                          $20,000 - $50,000
                        </label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input type="checkbox" id="prize4" className="rounded text-purple-600" />
                        <label htmlFor="prize4" className="text-sm">
                          $50,000+
                        </label>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full">Apply Filters</Button>
                </div>
              </div>
            </div>

            {/* Hackathon Listings */}
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div>
                  <h2 className="text-xl font-semibold">All Hackathons</h2>
                  <p className="text-sm text-muted-foreground">Showing 12 results</p>
                </div>
                <div className="flex items-center gap-2">
                  <Select defaultValue="newest">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Newest First</SelectItem>
                      <SelectItem value="prize">Highest Prize</SelectItem>
                      <SelectItem value="participants">Most Participants</SelectItem>
                      <SelectItem value="endDate">Ending Soon</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="icon" className="h-10 w-10 lg:hidden">
                    <img src="./sliderhorizontal.svg" alt="slidershorizontal" className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6">
                <HackathonCard
                  hackathon={{
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
                  }}
                />

                <HackathonCard
                  hackathon={{
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
                  }}
                />

                <HackathonCard
                  hackathon={{
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
                  }}
                />

                <HackathonCard
                  hackathon={{
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
                  }}
                />
              </div>

              <div className="mt-8 flex justify-center">
                <Button variant="outline">Load More</Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

