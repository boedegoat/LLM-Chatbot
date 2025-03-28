import { Button } from "./Button"
import { Badge } from "./Badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./Tabs"
import { Card, CardContent, CardHeader, CardTitle } from "./Card"
import TeamSection from "./Team-section"
import IdeaGenerator from "./Idea-generator"



export default function HackathonPage( params ) {
  // In a real app, you would fetch this data based on the ID
  const hackathon = {
    id: params.id,
    title: params.id === "nights" ? "nights" : "web3 summit",
    description:
      params.id === "nights"
        ? "nights season 1 is an exciting event where people from all fields come together to work on their ideas and create amazing projects. whether you're a developer, designer, or entrepreneur, this is your chance to shine!"
        : "join the web3 summit hackathon to build the future of decentralized applications. focus on blockchain, smart contracts, and decentralized finance.",
    startDate: params.id === "nights" ? "3/15/2025" : "5/10/2025",
    endDate: params.id === "nights" ? "4/4/2025" : "5/25/2025",
    prize: params.id === "nights" ? 500 : 2000,
    projects: 0,
    participants: params.id === "nights" ? 25 : 0,
    image: "/placeholder.svg?height=200&width=200",
    rules:
      "1. All code must be written during the hackathon period.\n2. Teams can have up to 4 members.\n3. Projects must be open source.\n4. Judging will be based on innovation, technical difficulty, design, and usefulness.",
    prizes: [
      { place: "1st Place", amount: params.id === "nights" ? 300 : 1200 },
      { place: "2nd Place", amount: params.id === "nights" ? 150 : 600 },
      { place: "3rd Place", amount: params.id === "nights" ? 50 : 200 },
    ],
  }

  return (
    <div className="container mx-auto py-12">
      <div className="flex flex-col md:flex-row gap-8 mb-8">
        <div className="w-full md:w-2/3">
          <div className="flex items-center gap-4 mb-6">
            <h1 className="text-3xl font-mono">{hackathon.title}</h1>
          </div>

          <div className="flex flex-wrap gap-6 mb-8">
            <div className="flex items-center gap-2">
=              <img src="/calendar.svg" alt="Calendar" className="h-5 w-5 text-blue-600"/>
              <span>
                {hackathon.startDate} - {hackathon.endDate}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <img src="/trophy.svg" alt="Trophy" className="h-5 w-5 text-blue-600"/>

              <span>${hackathon.prize} in prizes</span>
            </div>
            <div className="flex items-center gap-2">
              <img src="/users.svg" alt="Users" className="h-5 w-5 text-blue-600"/>

              <span>{hackathon.participants} participants</span>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-3">About</h2>
            <p className="text-muted-foreground whitespace-pre-line">{hackathon.description}</p>
          </div>

          <Tabs defaultValue="details">
            <TabsList className="mb-4">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="teams">Teams</TabsTrigger>
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="generate">Generate Idea</TabsTrigger>
            </TabsList>
            <TabsContent value="details">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Rules</h3>
                  <p className="text-muted-foreground whitespace-pre-line">{hackathon.rules}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Prizes</h3>
                  <div className="space-y-2">
                    {hackathon.prizes.map((prize, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-md">
                        <span className="font-medium">{prize.place}</span>
                        <span className="text-blue-600 font-semibold">${prize.amount}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="teams">
              <TeamSection hackathonId={params.id} />
            </TabsContent>
            <TabsContent value="projects">
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">No projects submitted yet.</p>
                <Button>Submit a project</Button>
              </div>
            </TabsContent>
            <TabsContent value="generate">
              <IdeaGenerator hackathon={hackathon} />
            </TabsContent>
          </Tabs>
        </div>

        <div className="w-full md:w-1/3">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col gap-4">
                <Button className="w-full">Join Hackathon</Button>
                <Button variant="outline" className="w-full">
                  Create Team
                </Button>
                <Button variant="outline" className="w-full flex items-center gap-2">
                  <img src="/share2.svg" alt="share" className="h-4 w-4"  />
                  Share
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-3">Timeline</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-1 h-full bg-blue-600 relative">
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-3 h-3 rounded-full bg-blue-600"></div>
                </div>
                <div>
                  <p className="font-medium">Registration Opens</p>
                  <p className="text-sm text-muted-foreground">{hackathon.startDate}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-1 h-full bg-blue-600 relative">
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-3 h-3 rounded-full bg-blue-600"></div>
                </div>
                <div>
                  <p className="font-medium">Hacking Begins</p>
                  <p className="text-sm text-muted-foreground">{hackathon.startDate}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-1 h-full bg-blue-600 relative">
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-3 h-3 rounded-full bg-blue-600"></div>
                </div>
                <div>
                  <p className="font-medium">Submissions Due</p>
                  <p className="text-sm text-muted-foreground">{hackathon.endDate}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="relative">
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-3 h-3 rounded-full bg-blue-600"></div>
                </div>
                <div>
                  <p className="font-medium">Winners Announced</p>
                  <p className="text-sm text-muted-foreground">{hackathon.endDate} (6PM UTC)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

