import { Button } from "./Button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./Card";
import Lightbulb from "../public/lightbulb.svg";
import Users from "../public/users.svg";
import Code from "../public/clock.svg";
import Wallet from "../public/wallet.svg";
import Link from "./Link";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function ToolsPage() {
  return (
    <div >
      <Navbar/>
        <div className="container mx-auto py-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-3xl font-mono mb-3">tools for builders</h1>
              <p className="text-muted-foreground">Enhance your hackathon experience with these powerful tools</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* AI Idea Generator Card */}
              <Card className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-md bg-blue-50 text-blue-600">
                      <img src={Lightbulb} alt="Idea Generator" className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-xl">AI Idea Generator</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm">
                    Generate innovative project ideas based on hackathon themes using our AI assistant.
                  </CardDescription>
                </CardContent>
                <CardFooter className="bg-slate-50 border-t">
                  <Link href="/Idea-generator" className="w-full">
                    <Button variant="ghost" className="w-full justify-start">Explore Tool</Button>
                  </Link>
                </CardFooter>
              </Card>

              {/* Team Finder Card */}
              <Card className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-md bg-blue-50 text-blue-600">
                      <img src={Users} alt="Team Finder" className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-xl">Team Finder</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm">
                    Find team members with complementary skills for your hackathon project.
                  </CardDescription>
                </CardContent>
                <CardFooter className="bg-slate-50 border-t">
                  <Link href="/Team-finder" className="w-full">
                    <Button variant="ghost" className="w-full justify-start">Explore Tool</Button>
                  </Link>
                </CardFooter>
              </Card>

              {/* Code Templates Card */}
              <Card className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-md bg-blue-50 text-blue-600">
                      <img src={Code} alt="Code Templates" className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-xl">Code Templates</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm">
                    Jump-start your project with pre-built templates for common web3 applications.
                  </CardDescription>
                </CardContent>
                <CardFooter className="bg-slate-50 border-t">
                  <Link href="/Code-Templates" className="w-full">
                    <Button variant="ghost" className="w-full justify-start">Explore Tool</Button>
                  </Link>
                </CardFooter>
              </Card>

              {/* Team Wallet Manager Card */}
              <Card className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-md bg-blue-50 text-blue-600">
                      <img src={Wallet} alt="Wallet Manager" className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-xl">Team Wallet Manager</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm">
                    Manage your team's funds and distribute prizes among team members.
                  </CardDescription>
                </CardContent>
                <CardFooter className="bg-slate-50 border-t">
                  <Link href="/Create-Wallet" className="w-full">
                    <Button variant="ghost" className="w-full justify-start">Explore Tool</Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
        <Footer/>
    </div>
  );
}
