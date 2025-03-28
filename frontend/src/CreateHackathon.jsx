import { Button } from "./Button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./Card"
import  Input  from "./Input"
import { Textarea } from "./Textarea"
import { Label } from "./Label"
import { cn } from "./utils"
import { useState, useEffect } from "react"
import { useRouter } from "./Router"
import { useAuth } from "./Auth-provider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./Select"
import { useBackend } from './Backend'


export default function CreateHackathonPage() {
//   const { user, isLoading: authLoading } = useAuth()
  const { login, logout, isAuthenticated, principal } = useBackend()
  const { navigate } = useRouter()

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    prize: 1000,
    maxTeamSize: 4,
    rules: "",
  })
  const [startDate, setStartDate] = useState(undefined)
  const [endDate, setEndDate] = useState(undefined)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")

  // Redirect if not logged in
//   useEffect(() => {
//     if (!authLoading && !user) {
//       navigate("/login")
//     }
//   }, [user, authLoading, router])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSliderChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value[0] }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!startDate || !endDate) {
      setError("Please select both start and end dates")
      return
    }

    if (endDate < startDate) {
      setError("End date cannot be before start date")
      return
    }

    setIsSubmitting(true)
    setError("")

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // In a real app, this would be an API call to create the hackathon
      const hackathonData = {
        id: `hackathon_${Date.now()}`,
        ...formData,
        startDate: startDate,
        endDate: endDate,
        // organizer: user?.name,
        // organizerId: user?.id,
        participants: 0,
        status: "upcoming",
        createdAt: new Date().toISOString(),
      }

      // Store in localStorage for demo purposes
      const existingHackathons = JSON.parse(localStorage.getItem("hackathons") || "[]")
      localStorage.setItem("hackathons", JSON.stringify([...existingHackathons, hackathonData]))

      router.push(`/hackathons/${hackathonData.id}`)
    } catch (err) {
      setError("Failed to create hackathon. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

//   if (authLoading) {
//     return (
//       <div className="container mx-auto py-20 flex justify-center items-center">
//         <img src="/loader2.svg" alt="loader" className="h-8 w-8 animate-spin text-purple-600"/>
//       </div>
//     )
//   }

//   if (!user) {
//     return null // Will redirect in useEffect
//   }

  return (
    <div className="container mx-auto py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-mono mb-8 text-center">create a hackathon</h1>

        <Card>
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle>Hackathon Details</CardTitle>
              <CardDescription>Provide information about your hackathon to attract participants</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {error && <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">{error}</div>}

              <div className="space-y-2">
                <Label htmlFor="title">Hackathon Title</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="e.g., Web3 Summit, DeFi Challenge"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Describe your hackathon, its goals, and what participants can expect"
                  className="min-h-[120px]"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={formData.category} onValueChange={(value) => handleSelectChange("category", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="defi">DeFi</SelectItem>
                    <SelectItem value="nft">NFT</SelectItem>
                    <SelectItem value="dao">DAO</SelectItem>
                    <SelectItem value="gaming">Gaming</SelectItem>
                    <SelectItem value="social">Social</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Start Date</Label>
                    <Input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        required
                    />
                </div>

                <div className="space-y-2">
                  <Label>End Date</Label>
                    <Input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        required
                    />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="prize">Total Prize Pool (USD)</Label>
                <Input
                  id="prize"
                  name="prize"
                  type="number"
                  placeholder="e.g., 1000"
                  value={formData.prize}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="maxTeamSize">Maximum Team Size</Label>
                    <Input
                    id="maxTeamSize"
                    name="maxTeamSize"
                    type="number"
                    value={formData.maxTeamSize}
                    onChange={handleInputChange}
                    className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="rules">Rules & Guidelines</Label>
                <Textarea
                  id="rules"
                  name="rules"
                  placeholder="Outline the rules, judging criteria, and any guidelines for participants"
                  className="min-h-[120px]"
                  value={formData.rules}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="ml-auto" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <img src="/loader2.svg" alt="loader" className="mr-2 h-4 w-4 animate-spin"/>
                    Creating...
                  </>
                ) : (
                  "Create Hackathon"
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}

