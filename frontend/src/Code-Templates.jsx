import { Button } from "./Button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./Card"
import Footer from "./Footer"
import Navbar from "./Navbar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./Tabs"

export default function CodeTemplatesPage() {
  const templates = [
    {
      id: "nft-marketplace",
      title: "NFT Marketplace",
      description: "A complete NFT marketplace with minting, buying, and selling functionality.",
      category: "defi",
      technologies: ["Next.js", "Solidity", "IPFS"],
    },
    {
      id: "dao-governance",
      title: "DAO Governance",
      description: "A decentralized autonomous organization with voting and proposal mechanisms.",
      category: "dao",
      technologies: ["React", "Solidity", "The Graph"],
    },
    {
      id: "defi-dashboard",
      title: "DeFi Dashboard",
      description: "A dashboard for tracking DeFi investments across multiple protocols.",
      category: "defi",
      technologies: ["Next.js", "Ethers.js", "Tailwind CSS"],
    },
  ]

  return (
    <div>
        <Navbar/>
            <div className="container mx-auto py-12">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                    <h1 className="text-3xl font-mono mb-3">code templates</h1>
                    <p className="text-muted-foreground">
                        Jump-start your project with pre-built templates for common web3 applications
                    </p>
                    </div>

                    <Tabs defaultValue="all">
                    {/* Only changed the className here to add a bottom border */}
                    <div className="flex justify-between items-center mb-6">
                        <TabsList className="border-b border-gray-200">
                        {/* Added classes to each TabsTrigger for black text and underline on active */}
                        <TabsTrigger
                            value="all"
                            className="text-black pb-2 px-2 data-[state=active]:border-b-2 data-[state=active]:border-black"
                        >
                            All
                        </TabsTrigger>
                        <TabsTrigger
                            value="defi"
                            className="text-black pb-2 px-2 data-[state=active]:border-b-2 data-[state=active]:border-black"
                        >
                            DeFi
                        </TabsTrigger>
                        <TabsTrigger
                            value="dao"
                            className="text-black pb-2 px-2 data-[state=active]:border-b-2 data-[state=active]:border-black"
                        >
                            DAO
                        </TabsTrigger>
                        <TabsTrigger
                            value="nft"
                            className="text-black pb-2 px-2 data-[state=active]:border-b-2 data-[state=active]:border-black"
                        >
                            NFT
                        </TabsTrigger>
                        </TabsList>
                    </div>

                    <TabsContent value="all" className="mt-0">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {templates.map((template) => (
                            <Card key={template.id}>
                            <CardHeader>
                                <div className="flex items-center gap-2 mb-2">
                                <div className="p-2 rounded-md bg-blue-50 text-blue-600">
                                    <img src="code.svg" className="h-5 w-5" />
                                </div>
                                <CardTitle>{template.title}</CardTitle>
                                </div>
                                <CardDescription>{template.description}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-wrap gap-1 mb-4">
                                {template.technologies.map((tech) => (
                                    <span
                                    key={tech}
                                    className="px-2 py-1 bg-slate-100 text-slate-700 rounded text-xs font-medium"
                                    >
                                    {tech}
                                    </span>
                                ))}
                                </div>
                            </CardContent>
                            <CardFooter className="flex justify-between border-t pt-4">
                                <Button variant="outline" size="sm" className="flex items-center gap-1">
                                <img src="/copy.svg" className="h-3 w-3" />
                                Preview
                                </Button>
                                <Button size="sm" className="bg-black text-white flex items-center gap-1 px-3 py-1.5 rounded-md hover:bg-black">
                                <svg xmlns="/download.svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v12m0 0l-3-3m3 3l3-3m-9 6h12" />
                                </svg>
                                Use Template
                                </Button>
                            </CardFooter>
                            </Card>
                        ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="defi" className="mt-0">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {templates
                            .filter((template) => template.category === "defi")
                            .map((template) => (
                            <Card key={template.id}>
                                <CardHeader>
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="p-2 rounded-md bg-blue-50 text-blue-600">
                                    <img src="code.svg" className="h-5 w-5" />
                                    </div>
                                    <CardTitle>{template.title}</CardTitle>
                                </div>
                                <CardDescription>{template.description}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                <div className="flex flex-wrap gap-1 mb-4">
                                    {template.technologies.map((tech) => (
                                    <span
                                        key={tech}
                                        className="px-2 py-1 bg-slate-100 text-slate-700 rounded text-xs font-medium"
                                    >
                                        {tech}
                                    </span>
                                    ))}
                                </div>
                                </CardContent>
                                <CardFooter className="flex justify-between border-t pt-4">
                                <Button variant="outline" size="sm" className="flex items-center gap-1">
                                    <img src="/copy.svg" className="h-3 w-3" />
                                    Preview
                                </Button>
                                {/* Same black/white styling for “Use Template” */}
                                <Button size="sm" className="flex items-center gap-1 bg-black text-white hover:bg-black">
                                <svg xmlns="/download.svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v12m0 0l-3-3m3 3l3-3m-9 6h12" />
                                </svg>
                                    Use Template
                                </Button>
                                </CardFooter>
                            </Card>
                            ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="dao" className="mt-0">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {templates
                            .filter((template) => template.category === "dao")
                            .map((template) => (
                            <Card key={template.id}>
                                <CardHeader>
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="p-2 rounded-md bg-blue-50 text-blue-600">
                                    <img src="code.svg" className="h-5 w-5" />
                                    </div>
                                    <CardTitle>{template.title}</CardTitle>
                                </div>
                                <CardDescription>{template.description}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                <div className="flex flex-wrap gap-1 mb-4">
                                    {template.technologies.map((tech) => (
                                    <span
                                        key={tech}
                                        className="px-2 py-1 bg-slate-100 text-slate-700 rounded text-xs font-medium"
                                    >
                                        {tech}
                                    </span>
                                    ))}
                                </div>
                                </CardContent>
                                <CardFooter className="flex justify-between border-t pt-4">
                                <Button variant="outline" size="sm" className="flex items-center gap-1">
                                    <img src="/copy.svg" className="h-3 w-3" />
                                    Preview
                                </Button>
                                {/* Same black/white styling for “Use Template” */}
                                <Button size="sm" className="flex items-center gap-1 bg-black text-white hover:bg-black">
                                    <svg xmlns="/download.svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v12m0 0l-3-3m3 3l3-3m-9 6h12" />
                                    </svg>
                                    Use Template
                                </Button>
                                </CardFooter>
                            </Card>
                            ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="nft" className="mt-0">
                        <div className="text-center py-12 bg-slate-50 rounded-md">
                        <img src="code.svg" className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground mb-4">No NFT templates available yet. Check back soon!</p>
                        <Button>Request a Template</Button>
                        </div>
                    </TabsContent>
                    </Tabs>
                </div>
            </div>
        <Footer/>
    </div>
  )
}
