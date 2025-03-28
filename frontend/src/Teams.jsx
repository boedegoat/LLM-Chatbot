import { useState } from "react"
import { Button } from "./Button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./Card"
import  Input  from "./Input"
import { Textarea } from "./Textarea"
import { Label } from "./Label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./Tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./Select"
import { Badge } from "./Badge"
import { Avatar, AvatarFallback, AvatarImage } from "./Avatar"
import { Switch } from "./Switch"
import { useRouter } from "./Router"
import { useAuth } from "./Auth-provider"
import Link from "./Link"

export default function TeamsPage() {
//   const { user } = useAuth()
//   const router = useRouter()

  const [searchQuery, setSearchQuery] = useState("")
  const [selectedHackathon, setSelectedHackathon] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    hackathon: "",
    maxMembers: 4,
    openToMembers: true,
    skills: [],
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedSkills, setSelectedSkills] = useState([])

  // Redirect if not logged in
//   if (!user) {

//   }

  const hackathons = [
    { id: "nights", name: "nights" },
    { id: "web3-summit", name: "web3 summit" },
    { id: "defi-summit", name: "DeFi Summit 2025" },
    { id: "nft-creators", name: "NFT Creators Hackathon" },
  ]

  const availableSkills = [
    "Solidity",
    "React",
    "Node.js",
    "Smart Contracts",
    "UI/UX",
    "Frontend",
    "Backend",
    "Web3.js",
    "Ethers.js",
    "DeFi",
    "NFT",
    "DAO",
    "Gaming",
  ]

  const teams = [
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
      hackathon: "nights",
      hackathonName: "nights",
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
      openToMembers: true,
      hackathon: "web3-summit",
      hackathonName: "web3 summit",
      skills: ["DeFi", "Solidity", "Financial Modeling"],
    },
    {
      id: "team3",
      name: "NFT Explorers",
      members: [
        { id: "user6", name: "Morgan", avatar: "/placeholder.svg?height=40&width=40" },
        { id: "user7", name: "Riley", avatar: "/placeholder.svg?height=40&width=40" },
      ],
      description:
        "Developing a platform for dynamic NFTs that evolve based on real-world events and user interactions.",
      openToMembers: true,
      hackathon: "nft-creators",
      hackathonName: "NFT Creators Hackathon",
      skills: ["NFT", "React", "Node.js", "UI/UX"],
    },
  ]

  const toggleSkill = (skill) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter((s) => s !== skill))
    } else {
      setSelectedSkills([...selectedSkills, skill])
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (checked) => {
    setFormData((prev) => ({ ...prev, openToMembers: checked }))
  }

  const handleCreateTeam = async (e) => {
    e.preventDefault()

    if (!formData.name || !formData.description || !formData.hackathon) {
      // Show error
      return
    }

    setIsSubmitting(true)

    // Simulate team creation - in a real app, this would call an API
    // setTimeout(() => {
    //   // In a real app, this would redirect to the new team page
    //   router.push("/teams/team-created")
    //   setIsSubmitting(false)
    // }, 1500)
  }

  const filteredTeams = teams.filter((team) => {
    const matchesSearch =
      searchQuery === "" ||
      team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      team.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      team.skills.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesHackathon = selectedHackathon === "" || team.hackathon === selectedHackathon

    return matchesSearch && matchesHackathon && team.openToMembers
  })

  return (
    <div className="container mx-auto py-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-mono mb-8 text-center">teams</h1>

        <Tabs defaultValue="join">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="join">Join a Team</TabsTrigger>
            <TabsTrigger value="create">Create a Team</TabsTrigger>
          </TabsList>

          <TabsContent value="join">
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Find a Team</CardTitle>
                <CardDescription>Browse teams that are looking for members with your skills</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                      <img src="/search.svg" alt="search" className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground"  />
                      <Input
                        placeholder="Search by team name, description, or skills..."
                        className="pl-10"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <Select value={selectedHackathon} onValueChange={setSelectedHackathon}>
                      <SelectTrigger className="w-full md:w-[200px]">
                        <SelectValue placeholder="All hackathons" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All hackathons</SelectItem>
                        {hackathons.map((h) => (
                          <SelectItem key={h.id} value={h.id}>
                            {h.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-sm font-medium mb-2 block">Filter by skills</Label>
                    <div className="flex flex-wrap gap-2">
                      {availableSkills.map((skill) => (
                        <Badge
                          key={skill}
                          variant={selectedSkills.includes(skill) ? "default" : "outline"}
                          className={`cursor-pointer ${selectedSkills.includes(skill) ? "bg-blue-600 hover:bg-blue-700" : ""}`}
                          onClick={() => toggleSkill(skill)}
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Available Teams ({filteredTeams.length})</h2>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <img src="/filter.svg" alt="filter" className="h-4 w-4" />   
                  More Filters
                </Button>
              </div>

              {filteredTeams.length > 0 ? (
                <div className="grid grid-cols-1 gap-6">
                  {filteredTeams.map((team) => (
                    <Card key={team.id} className="overflow-hidden">
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row gap-6">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="text-xl font-semibold">{team.name}</h3>
                              <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Open to members</Badge>
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
                              <img src="/users.svg" alt="users" className="h-4 w-4" />   
                              <span>{team.members.length} members</span>
                              <span className="text-muted-foreground">•</span>
                              <span>Hackathon: {team.hackathonName}</span>
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
                              <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center border-2 border-background">
                                <img src="/plus.svg" alt="plus"  className="h-4 w-4 text-muted-foreground" />
                              </div>
                            </div>

                            <div className="flex flex-col gap-2">
                              <Button variant="outline" size="sm" className="gap-2" asChild>
                                <Link href={`/teams/${team.id}`}>
                                  <img src="/users.svg" alt="users" className="h-4 w-4" />   
                                  View Team
                                </Link>
                              </Button>
                              <Button size="sm" className="gap-2">
                                <img src="/user-plus.svg" alt="userplus" className="h-4 w-4" />   
                                Request to Join
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-slate-50 rounded-md">
                  <img src="/users.svg" alt="users" className="h-16 w-16 mx-auto text-muted-foreground mb-4" />   
                  <h3 className="text-xl font-semibold mb-2">No teams found</h3>
                  <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                    No teams match your search criteria. Try adjusting your filters or create your own team.
                  </p>
                  <Button onClick={() => document.querySelector('[data-value="create"]')?.click()}>
                    Create a Team
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="create">
            <Card>
              <CardHeader>
                <CardTitle>Create a New Team</CardTitle>
                <CardDescription>Start your own team and recruit members with the skills you need</CardDescription>
              </CardHeader>
              <form onSubmit={handleCreateTeam}>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Team Name</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Enter your team name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Team Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      placeholder="Describe your team, project idea, and what you're looking to build"
                      className="min-h-[120px]"
                      value={formData.description}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="hackathon">Select Hackathon</Label>
                    <Select
                      value={formData.hackathon}
                      onValueChange={(value) => handleSelectChange("hackathon", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a hackathon" />
                      </SelectTrigger>
                      <SelectContent>
                        {hackathons.map((h) => (
                          <SelectItem key={h.id} value={h.id}>
                            {h.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Skills Needed</Label>
                    <div className="flex flex-wrap gap-2">
                      {availableSkills.map((skill) => (
                        <Badge
                          key={skill}
                          variant={formData.skills.includes(skill) ? "default" : "outline"}
                          className={`cursor-pointer ${formData.skills.includes(skill) ? "bg-blue-600 hover:bg-blue-700" : ""}`}
                          onClick={() => {
                            if (formData.skills.includes(skill)) {
                              setFormData((prev) => ({
                                ...prev,
                                skills: prev.skills.filter((s) => s !== skill),
                              }))
                            } else {
                              setFormData((prev) => ({
                                ...prev,
                                skills: [...prev.skills, skill],
                              }))
                            }
                          }}
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="maxMembers">Maximum Team Size</Label>
                    <Select
                      value={formData.maxMembers.toString()}
                      onValueChange={(value) => handleSelectChange("maxMembers", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select maximum team size" />
                      </SelectTrigger>
                      <SelectContent>
                        {[2, 3, 4, 5, 6].map((size) => (
                          <SelectItem key={size} value={size.toString()}>
                            {size} members
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch id="openToMembers" checked={formData.openToMembers} onCheckedChange={handleSwitchChange} />
                    <Label htmlFor="openToMembers">Open to new members</Label>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="ml-auto" disabled={isSubmitting}>
                    {isSubmitting ? "Creating..." : "Create Team"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

