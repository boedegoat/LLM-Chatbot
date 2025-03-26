import { useState } from "react"
import { Button } from "./Button"
import { Card, CardContent, CardHeader, CardTitle } from "./Card"
import Input from "./Input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./Select"
import { Checkbox } from "./Checkbox"
import { Label } from "./Label"
import { Avatar, AvatarFallback, AvatarImage } from "./Avatar"
import { Badge } from "./Badge"
import Navbar from "./Navbar"
import Footer from "./Footer"

export default function TeamFinderPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedHackathon, setSelectedHackathon] = useState("")

  const hackathons = [
    { id: "nights", name: "nights" },
    { id: "web3-summit", name: "web3 summit" },
  ]

  const users = [
    {
      id: "user1",
      name: "Alex",
      avatar: "/placeholder.svg?height=40&width=40",
      bio: "Full-stack developer with 5 years of experience. Passionate about blockchain and web3 technologies.",
      skills: ["React", "Solidity", "Node.js"],
      hackathons: ["nights"],
      lookingForTeam: true,
    },
    {
      id: "user2",
      name: "Jamie",
      avatar: "/placeholder.svg?height=40&width=40",
      bio: "UI/UX designer specializing in web3 applications. Looking to join a team for the web3 summit hackathon.",
      skills: ["UI/UX", "Figma", "Frontend"],
      hackathons: ["web3-summit"],
      lookingForTeam: true,
    },
    {
      id: "user3",
      name: "Taylor",
      avatar: "/placeholder.svg?height=40&width=40",
      bio: "Smart contract developer with experience in DeFi protocols. Interested in building innovative financial applications.",
      skills: ["Solidity", "Ethereum", "DeFi"],
      hackathons: ["nights", "web3-summit"],
      lookingForTeam: true,
    },
  ]

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      searchQuery === "" ||
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.bio.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.skills.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesHackathon =
      selectedHackathon === "" ||
      selectedHackathon === "all" ||
      user.hackathons.includes(selectedHackathon)

    return matchesSearch && matchesHackathon
  })

  return (
    <div>
        <Navbar/>
            <div className="container mx-auto py-12">
                <div className="max-w-4xl mx-auto">
                    {/* Page Header */}
                    <div className="text-center mb-12">
                    <h1 className="text-3xl font-mono mb-3">team finder</h1>
                    <p className="text-gray-600">
                        Find team members with complementary skills for your hackathon project
                    </p>
                    </div>

                    {/* Search Card */}
                    <Card className="border border-gray-200 rounded-md mb-8 bg-white">
                    <CardHeader className="border-b border-gray-200 p-4">
                        <CardTitle className="text-lg font-semibold text-black">
                        Search Participants
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4">
                        <div className="space-y-4">
                        {/* Search + Select Row */}
                        <div className="flex flex-col md:flex-row gap-4">
                            {/* Search Input */}
                            <div className="relative flex-1">
                            <img
                                src="/search.svg"
                                className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400"
                                alt="Search icon"
                            />
                            <Input
                                placeholder="Search by name, skills, or bio..."
                                className="pl-10 border border-gray-300 text-black placeholder-gray-400 focus:ring-2 focus:ring-gray-400"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            </div>

                            {/* Hackathon Select */}
                            <Select
                            value={selectedHackathon}
                            onValueChange={setSelectedHackathon}
                            >
                            <SelectTrigger className="w-full md:w-[200px] border border-gray-300 focus:ring-2 focus:ring-gray-400">
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

                        {/* Checkbox */}
                        <div className="flex items-center gap-2">
                            <Checkbox
                            id="lookingForTeam"
                            defaultChecked
                            className="form-checkbox h-4 w-4 text-black border-gray-300 focus:ring-black"
                            />
                            <Label
                            htmlFor="lookingForTeam"
                            className="text-sm text-gray-800"
                            >
                            Only show users looking for a team
                            </Label>
                        </div>
                        </div>
                    </CardContent>
                    </Card>

                    {/* Results */}
                    <div className="space-y-6">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-semibold text-black">
                        Results ({filteredUsers.length})
                        </h2>
                        <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-1 border border-gray-300 text-black hover:bg-gray-100"
                        >
                        <img src="filter.svg" alt="Filter icon" className="h-4 w-4" />
                        More Filters
                        </Button>
                    </div>

                    {/* User List */}
                    {filteredUsers.length > 0 ? (
                        <div className="grid grid-cols-1 gap-4">
                        {filteredUsers.map((user) => (
                            <Card
                            key={user.id}
                            className="border border-gray-200 rounded-md bg-white"
                            >
                            <CardContent className="p-6">
                                <div className="flex flex-col md:flex-row md:items-center gap-4">
                                {/* Avatar */}
                                <Avatar className="h-16 w-16">
                                    <AvatarImage src={user.avatar} alt={user.name} />
                                    <AvatarFallback>
                                    {user.name.charAt(0)}
                                    </AvatarFallback>
                                </Avatar>

                                {/* User Info */}
                                <div className="flex-1">
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
                                    <div className="flex items-center gap-2">
                                        <h3 className="text-lg font-semibold text-black">
                                        {user.name}
                                        </h3>
                                        {user.lookingForTeam && (
                                        <Badge
                                            className="border border-gray-300 text-black px-2 py-1 text-xs rounded-md"
                                        >
                                            Looking for team
                                        </Badge>
                                        )}
                                    </div>
                                    {/* Hackathon Badges */}
                                    <div className="flex flex-wrap gap-1">
                                        {user.hackathons.map((hackathon) => (
                                        <Badge
                                            key={hackathon}
                                            className="border border-gray-300 text-gray-600 px-2 py-1 text-xs rounded-md"
                                        >
                                            {hackathon}
                                        </Badge>
                                        ))}
                                    </div>
                                    </div>

                                    {/* Bio */}
                                    <p className="text-sm text-gray-600 mb-3">
                                    {user.bio}
                                    </p>

                                    {/* Skills */}
                                    <div className="flex flex-wrap gap-1 mb-4">
                                    {user.skills.map((skill) => (
                                        <Badge
                                        key={skill}
                                        className="bg-gray-100 text-gray-800 px-2 py-1 text-xs rounded-md hover:bg-gray-200"
                                        >
                                        {skill}
                                        </Badge>
                                    ))}
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-2 self-start md:self-center">
                                    <Button
                                    variant="outline"
                                    size="sm"
                                    className="border border-gray-300 text-black hover:bg-gray-100"
                                    >
                                    View Profile
                                    </Button>
                                    <Button
                                    size="sm"
                                    className="bg-black text-white hover:bg-gray-900"
                                    >
                                    Invite to Team
                                    </Button>
                                </div>
                                </div>
                            </CardContent>
                            </Card>
                        ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 bg-gray-50 rounded-md">
                        <img
                            src="/users.svg"
                            className="h-12 w-12 text-gray-400 mx-auto mb-4"
                            alt="No users"
                        />
                        <p className="text-gray-600 mb-4">
                            No participants found matching your search criteria.
                        </p>
                        <Button
                            onClick={() => {
                            setSearchQuery("")
                            setSelectedHackathon("")
                            }}
                            className="bg-black text-white hover:bg-gray-900"
                        >
                            Clear Filters
                        </Button>
                        </div>
                    )}
                    </div>
                </div>
            </div>
        <Footer/>
    </div>
  )
}
