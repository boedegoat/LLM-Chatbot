import { Button } from "./Button"
import { Card, CardContent, CardHeader, CardTitle } from "./Card"
import { Textarea } from "./Text-Area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./Select"
import { Label } from "./Label"
import { useState } from "react"
import Navbar from "./Navbar"
import Footer from "./Footer"

export default function IdeaGeneratorPage() {
  const [hackathon, setHackathon] = useState("")
  const [interests, setInterests] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedIdeas, setGeneratedIdeas] = useState([])

  const hackathons = [
    { id: "nights", name: "nights" },
    { id: "web3-summit", name: "web3 summit" },
  ]

  const generateIdeas = async () => {
    if (!hackathon || !interests.trim()) return

    setIsGenerating(true)

    // Simulate AI generation - in a real app, this would call an API
    setTimeout(() => {
      const ideas = [
        `A decentralized platform for ${hackathon} participants to collaborate and share resources securely using blockchain technology.`,
        `An AI-powered tool that helps ${hackathon} teams identify potential vulnerabilities in their smart contracts before deployment.`,
        `A web3 social network specifically designed for hackathon participants to showcase their projects and receive community feedback.`,
        `A decentralized funding platform that allows ${hackathon} projects to receive micro-investments from the community.`,
      ]

      setGeneratedIdeas(ideas)
      setIsGenerating(false)
    }, 2000)
  }

  return (
    <div>
        <Navbar/>
            <div className="container mx-auto py-12">
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-12">
                    <h1 className="text-3xl font-mono mb-3">AI idea generator</h1>
                    <p className="text-muted-foreground">Generate innovative project ideas for your next hackathon</p>
                    </div>

                    <Card className="mb-8">
                    <CardHeader>
                        <CardTitle>Generate Ideas</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                        <Label htmlFor="hackathon">Select Hackathon</Label>
                        <Select value={hackathon} onValueChange={setHackathon}>
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
                        <Label htmlFor="interests">Your Interests & Skills</Label>
                        <Textarea
                            id="interests"
                            placeholder="Describe your interests, skills, and what kind of project you'd like to build..."
                            className="min-h-[120px]"
                            value={interests}
                            onChange={(e) => setInterests(e.target.value)}
                        />
                        </div>

                        <Button
                        onClick={generateIdeas}
                        disabled={isGenerating || !hackathon || !interests.trim()}
                        className="w-full"
                        >
                        {isGenerating ? (
                            <>
                            <img src="./loader2.svg" className="h-4 w-4 mr-2 animate-spin" />
                            Generating Ideas...
                            </>
                        ) : (
                            <>
                            <img src="./lightbulb.svg" className="h-4 w-4 mr-2" />
                            Generate Ideas
                            </>
                        )}
                        </Button>
                    </CardContent>
                    </Card>

                    {generatedIdeas.length > 0 && (
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold">Generated Ideas</h2>
                        {generatedIdeas.map((idea, index) => (
                        <Card key={index}>
                            <CardContent className="p-6">
                            <div className="flex items-start gap-3">
                                <div className="p-2 rounded-full bg-yellow-50 text-yellow-600">
                                <img src ="./lightbulb.svg" className="h-5 w-5" />
                                </div>
                                <div className="flex-1">
                                <p>{idea}</p>
                                <div className="mt-4 flex justify-end">
                                    <Button variant="outline" size="sm" className="flex items-center gap-1">
                                    <img src="./save.svg" className="h-3 w-3" />
                                    Save Idea
                                    </Button>
                                </div>
                                </div>
                            </div>
                            </CardContent>
                        </Card>
                        ))}
                    </div>
                    )}
                </div>
            </div>
        <Footer/>
    </div>
  )
}

