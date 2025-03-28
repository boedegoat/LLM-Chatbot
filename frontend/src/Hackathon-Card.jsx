import { Card, CardContent } from "./Card"
import { Badge } from "./Badge"
import { Button } from "./Button"
import Link from "./Link"

export default function HackathonCard({ hackathon }) {
  // Handle undefined category with a default value
  const category = hackathon.category || "general"

  // Format prize value to handle different data types
  const formatPrize = (prize) => {
    if (typeof prize === "number") {
      return `$${prize}`
    }
    return prize
  }

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardContent className="p-0">
        <div className="flex flex-col sm:flex-row">
          <div className="w-full sm:w-32 h-32 bg-slate-100 flex items-center justify-center p-4">
            <img
              src={hackathon.image || "/placeholder.svg"}
              alt={hackathon.title}
              className="max-w-full max-h-full object-contain"
            />
          </div>
          <div className="p-6 flex-1">
            <div className="flex flex-wrap gap-2 mb-2">
              <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 border-blue-200">
                {category.toUpperCase()}
              </Badge>
              <Badge variant="outline" className="text-muted-foreground">
                <img src="/clock.svg" className="h-3 w-3 mr-1"/>
                {hackathon.status || "Upcoming"}
              </Badge>
            </div>

            <h3 className="text-xl font-semibold mb-2">{hackathon.title}</h3>
            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{hackathon.description}</p>

            <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
              <div className="flex items-center text-muted-foreground">
                <img src="/calendar.svg"/>
                <span>
                  {hackathon.startDate} - {hackathon.endDate}
                </span>
              </div>
              <div className="flex items-center text-muted-foreground">
                <img src="/trophy.svg" className="h-4 w-4 mr-1"/>
                <span>{formatPrize(hackathon.prize)}</span>
              </div>
              <div className="flex items-center text-muted-foreground">
                <img src="/users.svg" className="h-4 w-4 mr-1"/>
                <span>{hackathon.participants} participants</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <div className="bg-muted/30 p-4 flex justify-between border-t">
        <div className="text-sm">
          {hackathon.organizer && (
            <>
              By <span className="font-medium">{hackathon.organizer}</span>
            </>
          )}
        </div>
        <Button size="sm" variant="ghost" asChild>
          <Link href={`/explore/1`} className="gap-1">
            View Details
            <img src="arrowright.svg" className="h-4 w-4"/> 
          </Link>
        </Button>
      </div>
    </Card>
  )
}

