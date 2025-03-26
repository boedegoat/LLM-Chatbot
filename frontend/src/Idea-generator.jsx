import { useState, useEffect } from "react"
import { Button } from "./Button"
import { Card, CardContent, CardHeader, CardTitle } from "./Card"
import { Textarea } from "./Textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./Select"
import { Label } from "./Label"
import { Badge } from "./Badge"
import  Input  from "./Input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./Tabs"


export default function IdeaGenerator() {
  const [hackathon, setHackathon] = useState("")
  const [skills, setSkills] = useState("")
  const [interests, setInterests] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedIdeas, setGeneratedIdeas] = useState([])
  const [savedIdeas, setSavedIdeas] = useState([])
  const [selectedTags, setSelectedTags] = useState([])
  const [hackathons, setHackathons] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedHackathonDetails, setSelectedHackathonDetails] = useState(null)

  const availableTags = [
    "DeFi",
    "NFT",
    "DAO",
    "Gaming",
    "Social",
    "Identity",
    "Privacy",
    "Scalability",
    "Infrastructure",
    "Interoperability",
    "AI",
    "ML",
    "Data",
    "Governance",
    "Payments",
    "Metaverse",
  ]

  useEffect(() => {
    setTimeout(() => {
      const mockHackathons = [
        {
          id: "eth-global",
          title: "ETH Global",
          description: "The world's largest Ethereum hackathon",
          category: "defi",
          startDate: "2025-04-15",
          endDate: "2025-04-17",
          prize: "$50,000",
          image: "/placeholder.svg?height=200&width=400",
        },
        {
          id: "solana-summer",
          title: "Solana Summer Hack",
          description: "Build the future of Solana",
          category: "nft",
          startDate: "2025-06-01",
          endDate: "2025-06-15",
          prize: "$75,000",
          image: "/placeholder.svg?height=200&width=400",
        },
        {
          id: "polygon-hack",
          title: "Polygon Hackathon",
          description: "Scaling solutions for Web3",
          category: "gaming",
          startDate: "2025-05-10",
          endDate: "2025-05-12",
          prize: "$30,000",
          image: "/placeholder.svg?height=200&width=400",
        },
        {
          id: "dao-summit",
          title: "DAO Summit",
          description: "Revolutionizing governance in Web3",
          category: "dao",
          startDate: "2025-07-20",
          endDate: "2025-07-25",
          prize: "$40,000",
          image: "/placeholder.svg?height=200&width=400",
        },
      ]

      setHackathons(mockHackathons)
      setIsLoading(false)
    }, 1000)
  }, [])

  // Update selected hackathon details when hackathon changes
  useEffect(() => {
    if (hackathon && hackathons.length > 0) {
      const selected = hackathons.find((h) => h.id === hackathon) || null
      setSelectedHackathonDetails(selected)
    } else {
      setSelectedHackathonDetails(null)
    }
  }, [hackathon, hackathons])

  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag))
    } else {
      setSelectedTags([...selectedTags, tag])
    }
  }

  const saveIdea = (idea) => {
    if (!savedIdeas.includes(idea)) {
      setSavedIdeas([...savedIdeas, idea])
    }
  }

  const generateIdeas = async () => {
    if (!hackathon) return

    setIsGenerating(true)

    // Simulate AI generation - in a real app, this would call an API
    setTimeout(() => {
      const categoryIdeas = {
        defi: [
          `A decentralized insurance protocol that uses AI to assess risk and determine premiums for crypto assets at ${selectedHackathonDetails?.title}.`,
          `A yield optimization platform that automatically moves funds between different DeFi protocols to maximize returns, perfect for ${selectedHackathonDetails?.title} participants.`,
          `A cross-chain liquidity aggregator that finds the best rates across multiple DEXs and bridges, addressing the interoperability challenges highlighted at ${selectedHackathonDetails?.title}.`,
          `A DeFi dashboard that provides real-time risk assessment and portfolio management tools for ${selectedHackathonDetails?.title} participants.`,
        ],
        nft: [
          `A platform for creating dynamic NFTs that evolve based on real-world events or user interactions, showcasing the innovation potential at ${selectedHackathonDetails?.title}.`,
          `A decentralized marketplace for fractional ownership of high-value NFTs, perfect for the ${selectedHackathonDetails?.title} community.`,
          `An NFT-based identity verification system for secure access to web3 services, addressing the identity challenges discussed at ${selectedHackathonDetails?.title}.`,
          `A tool for converting intellectual property into revenue-generating NFTs with built-in royalty distribution for creators at ${selectedHackathonDetails?.title}.`,
        ],
        dao: [
          `A reputation-based voting system for DAOs that weights votes based on contribution history, ideal for the governance focus of ${selectedHackathonDetails?.title}.`,
          `A DAO treasury management tool that optimizes capital allocation across different investment strategies for communities participating in ${selectedHackathonDetails?.title}.`,
          `A cross-DAO collaboration platform that allows multiple DAOs to coordinate on shared initiatives, perfect for the collaborative spirit of ${selectedHackathonDetails?.title}.`,
          `A DAO formation toolkit with customizable governance templates and legal compliance features for projects launching at ${selectedHackathonDetails?.title}.`,
        ],
        gaming: [
          `A blockchain-based game that uses real-world weather data to influence in-game environments, showcasing the creative potential at ${selectedHackathonDetails?.title}.`,
          `A platform for creating interoperable gaming assets that can be used across multiple games, addressing the composability challenges discussed at ${selectedHackathonDetails?.title}.`,
          `A play-to-earn game that rewards players for completing educational challenges about blockchain technology, perfect for the educational aspects of ${selectedHackathonDetails?.title}.`,
          `A decentralized matchmaking service for competitive gaming with reputation tracking on-chain, ideal for the gaming focus of ${selectedHackathonDetails?.title}.`,
        ],
      }

      // Default to defi if category not found
      const category = selectedHackathonDetails?.category || "defi"
      let ideas = categoryIdeas[category] || categoryIdeas.defi

      // Personalize ideas based on skills and interests if provided
      if (skills.trim() || interests.trim()) {
        ideas = ideas.map((idea) => {
          const skillsPhrase = skills.trim() ? ` utilizing your ${skills} skills` : ""
          const interestsPhrase = interests.trim() ? ` and focusing on your interest in ${interests}` : ""
          return idea.replace(".", `${skillsPhrase}${interestsPhrase}.`)
        })
      }

      // Filter or prioritize ideas based on selected tags
      if (selectedTags.length > 0) {
        // Simple randomization to simulate tag-based filtering
        ideas = ideas.sort(() => Math.random() - 0.5)
      }

      setGeneratedIdeas(ideas)
      setIsGenerating(false)
    }, 2000)
  }

  const refineIdea = (ideaIndex) => {
    if (!generatedIdeas[ideaIndex]) return

    setIsGenerating(true)

    // Simulate refining an idea
    setTimeout(() => {
      const refinedIdeas = [...generatedIdeas]
      refinedIdeas[ideaIndex] =
        `${refinedIdeas[ideaIndex]} [REFINED] This idea has been enhanced with more technical details and implementation strategies specific to ${selectedHackathonDetails?.title}.`
      setGeneratedIdeas(refinedIdeas)
      setIsGenerating(false)
    }, 1500)
  }

  return (
    <div className="container mx-auto py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-3">AI Idea Generator</h1>
          <p className="text-muted-foreground text-lg">
            Generate innovative project ideas tailored to specific hackathons using our AI assistant
          </p>
        </div>

        <Tabs defaultValue="generate" className="mb-8">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="generate">Generate Ideas</TabsTrigger>
            <TabsTrigger value="saved">Saved Ideas ({savedIdeas.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="generate">
            <Card>
              <CardHeader>
                <CardTitle>Generate Hackathon Project Ideas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="hackathon">Select Hackathon</Label>
                  {isLoading ? (
                    <div className="h-10 bg-muted animate-pulse rounded-md"></div>
                  ) : (
                    <Select value={hackathon} onValueChange={setHackathon}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a hackathon" />
                      </SelectTrigger>
                      <SelectContent>
                        {hackathons.map((h) => (
                          <SelectItem key={h.id} value={h.id}>
                            {h.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                </div>

                {selectedHackathonDetails && (
                  <Card className="bg-muted/50 border-dashed">
                    <CardContent className="p-4">
                      <div className="flex flex-col md:flex-row gap-4 items-start">
                        {selectedHackathonDetails.image && (
                          <img
                            src={selectedHackathonDetails.image || "/placeholder.svg"}
                            alt={selectedHackathonDetails.title}
                            className="rounded-md w-full md:w-1/3 object-cover"
                          />
                        )}
                        <div>
                          <h3 className="text-lg font-semibold">{selectedHackathonDetails.title}</h3>
                          <p className="text-sm text-muted-foreground mb-2">{selectedHackathonDetails.description}</p>
                          <div className="flex flex-wrap gap-2 mt-2">
                            <Badge variant="outline">{selectedHackathonDetails.category}</Badge>
                            <Badge variant="outline">Prize: {selectedHackathonDetails.prize}</Badge>
                            <Badge variant="outline">
                              {new Date(selectedHackathonDetails.startDate).toLocaleDateString()} -
                              {new Date(selectedHackathonDetails.endDate).toLocaleDateString()}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                <div className="space-y-2">
                  <Label htmlFor="skills">Your Technical Skills</Label>
                  <Input
                    id="skills"
                    placeholder="e.g., Solidity, React, Node.js, Smart Contracts..."
                    value={skills}
                    onChange={(e) => setSkills(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="interests">Your Interests & Project Goals</Label>
                  <Textarea
                    id="interests"
                    placeholder="Describe what you're interested in building and your project goals..."
                    className="min-h-[120px]"
                    value={interests}
                    onChange={(e) => setInterests(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Relevant Technologies & Concepts</Label>
                  <div className="flex flex-wrap gap-2">
                    {availableTags.map((tag) => (
                      <Badge
                        key={tag}
                        variant={selectedTags.includes(tag) ? "default" : "outline"}
                        className={`cursor-pointer ${
                          selectedTags.includes(tag) ? "bg-primary hover:bg-primary/90" : ""
                        }`}
                        onClick={() => toggleTag(tag)}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Button onClick={generateIdeas} disabled={isGenerating || !hackathon} className="w-full">
                  {isGenerating ? (
                    <>
                      <img src="./loader" alt="loader" className="h-4 w-4 mr-2 animate-spin" />
                      Generating Ideas...
                    </>
                  ) : (
                    <>
                      <img src="./lightbulb" alt="lightbulb" className="h-4 w-4 mr-2" />
                      Generate Ideas
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {generatedIdeas.length > 0 && (
              <div className="mt-8 space-y-6">
                <h2 className="text-2xl font-semibold">Generated Ideas</h2>
                <p className="text-muted-foreground">
                  Here are some project ideas tailored to {selectedHackathonDetails?.title} based on your preferences
                </p>

                {generatedIdeas.map((idea, index) => (
                  <Card key={index} className="overflow-hidden border-l-4 border-l-primary">
                    <CardContent className="p-6">
                      <div className="flex gap-4">
                        <div className="rounded-full bg-primary/10 p-3 h-12 w-12 flex-shrink-0">
                          <img src="./lightbulb" alt="lightbulb" className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <p className="mb-4 text-lg">{idea}</p>
                          <div className="flex flex-wrap gap-2 justify-between">
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm" className="gap-1">
                                <img src="./thumbs-up" alt="thumbsup" className="h-4 w-4" />
                                Like
                              </Button>
                              <Button variant="outline" size="sm" className="gap-1">
                                <img src="./thumbs-down" alt="thumbsdown" className="h-4 w-4" />
                                Dislike
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="gap-1"
                                onClick={() => refineIdea(index)}
                                disabled={isGenerating}
                              >
                                {isGenerating ? (
                                  <img src="./loader" alt="loader" className="h-4 w-4 animate-spin" />
                                ) : (
                                  <img src="./refresh-cw" alt="refreshcw" className="h-4 w-4" />
                                )}
                                Refine
                              </Button>
                            </div>
                            <Button
                              size="sm"
                              className="gap-1"
                              onClick={() => saveIdea(idea)}
                              disabled={savedIdeas.includes(idea)}
                            >
                              <img src="./bookmark-plus" alt="bookmark" className="h-4 w-4" />
                              {savedIdeas.includes(idea) ? "Saved" : "Save Idea"}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="saved">
            <Card>
              <CardHeader>
                <CardTitle>Your Saved Ideas</CardTitle>
              </CardHeader>
              <CardContent>
                {savedIdeas.length === 0 ? (
                  <div className="text-center py-12">
                    <img src="./lightbulb" alt="lightbulb" className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">No saved ideas yet</h3>
                    <p className="text-muted-foreground mb-4">Generate and save ideas to access them later</p>
                    <Button
                      variant="outline"
                      onClick={() => document.querySelector('[data-value="generate"]')?.click()}
                    >
                      Generate Ideas
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {savedIdeas.map((idea, index) => (
                      <Card key={index} className="border-l-4 border-l-primary">
                        <CardContent className="p-4">
                          <p>{idea}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

