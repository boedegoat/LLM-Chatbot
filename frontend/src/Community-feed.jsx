"use client"

import { Button } from "./Button"
import { Card, CardContent, CardFooter } from "./Card"
import { Textarea } from "./Text-Area"
import { Avatar, AvatarFallback, AvatarImage } from "./Avatar"
import { Badge } from "./Badge"
import { useState } from "react"
import Link from "./Link"

export default function CommunityFeed() {
  const [newPost, setNewPost] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Initialize with the existing posts
  const [posts, setPosts] = useState([
    {
      id: "post1",
      user: {
        id: "user1",
        name: "Alex Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Web3 Developer",
      },
      content:
        "Just registered for the DeFi Summit 2025! Looking for team members with experience in Solidity and React. DM me if you're interested in collaborating!",
      likes: 24,
      liked: false,
      comments: 8,
      timestamp: "2 hours ago",
      hackathon: {
        id: "defi-summit",
        title: "DeFi Summit 2025",
      },
    },
    {
      id: "post2",
      user: {
        id: "user2",
        name: "Sarah Chen",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "DeFi Researcher",
      },
      content:
        "Excited to share our project from the NFT Creators Hackathon! We built a platform for dynamic NFTs that evolve based on real-world events. Check it out and let me know what you think!",
      likes: 42,
      liked: false,
      comments: 15,
      timestamp: "1 day ago",
      hackathon: {
        id: "nft-creators",
        title: "NFT Creators Hackathon",
      },
      projectImage: "/placeholder.svg?height=300&width=600",
    },
    {
      id: "post3",
      user: {
        id: "user3",
        name: "Michael Torres",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "UI/UX Designer",
      },
      content:
        "Looking for feedback on our DAO governance dashboard design. We're trying to make complex voting mechanisms more accessible to non-technical users. Any suggestions?",
      likes: 18,
      liked: false,
      comments: 7,
      timestamp: "3 days ago",
      projectImage: "/placeholder.svg?height=300&width=600",
    },
  ])

  const handleSubmit = () => {
    if (!newPost.trim()) return

    setIsSubmitting(true)

    // Create a new post object
    const newPostObj = {
      id: `post${Date.now()}`, // Generate a unique ID
      user: {
        id: "current-user", // In a real app, this would be the current user's ID
        name: "You", // In a real app, this would be the current user's name
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Web3 Enthusiast", // In a real app, this would be the current user's role
      },
      content: newPost,
      likes: 0,
      liked: false,
      comments: 0,
      timestamp: "Just now",
      // Optional: add hackathon tag if selected
    }

    // Add the new post to the beginning of the posts array
    setPosts([newPostObj, ...posts])

    // Reset the form
    setNewPost("")
    setIsSubmitting(false)
  }

  const handleLike = (postId) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          // Toggle like status
          const newLikedStatus = !post.liked
          return {
            ...post,
            liked: newLikedStatus,
            likes: newLikedStatus ? post.likes + 1 : post.likes - 1,
          }
        }
        return post
      }),
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex gap-4">
            <Avatar className="h-10 w-10">
              <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Your avatar" />
              <AvatarFallback>YA</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <Textarea
                placeholder="Share your thoughts, projects, or questions with the community..."
                className="min-h-[100px] resize-none border-none focus-visible:ring-0 p-0 shadow-none"
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between border-t pt-4">
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" className="text-muted-foreground gap-2">
              <img src="/image.svg" className="h-4 w-4 " />
              Image
            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground gap-2">
              <img src="/hash.svg" className="h-4 w-4" />
              Hackathon
            </Button>
          </div>
          <Button onClick={handleSubmit} disabled={isSubmitting || !newPost.trim()} className="gap-2">
            <img src="/send.svg" className="h-4 w-4" />
            Post
          </Button>
        </CardFooter>
      </Card>

      {posts.map((post) => (
        <Card key={post.id}>
          <CardContent className="p-6">
            <div className="flex items-start gap-4 mb-4">
              <Avatar>
                <AvatarImage src={post.user.avatar} alt={post.user.name} />
                <AvatarFallback>{post.user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-2">
                  <Link
                    href={`/profile/${post.user.id}`}
                    className="font-semibold hover:text-purple-600 transition-colors"
                  >
                    {post.user.name}
                  </Link>
                  <span className="text-xs text-muted-foreground">•</span>
                  <span className="text-xs text-muted-foreground">{post.timestamp}</span>
                </div>
                <p className="text-xs text-muted-foreground">{post.user.role}</p>
              </div>
            </div>

            <div className="mb-4">
              <p className="whitespace-pre-line mb-4">{post.content}</p>
              {post.hackathon && (
                <Link href={`/explore/${post.hackathon.id}`}>
                  <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">#{post.hackathon.title}</Badge>
                </Link>
              )}
            </div>

            {post.projectImage && (
              <div className="mb-4 rounded-md overflow-hidden border">
                <img src={post.projectImage || "/placeholder.svg"} alt="Project" className="w-full h-auto" />
              </div>
            )}

            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                className={`gap-1 ${post.liked ? "text-red-500" : "text-muted-foreground"}`}
                onClick={() => handleLike(post.id)}
              >
                <img src={post.liked ? "/heart-filled.svg" : "/heart.svg"} className="h-4 w-4" alt="Like" />
                <span>{post.likes}</span>
              </Button>
              <Button variant="ghost" size="sm" className="gap-1 text-muted-foreground">
                <img src="/messagesquare.svg" className="h-4 w-4" />
                <span>{post.comments}</span>
              </Button>
              <Button variant="ghost" size="sm" className="gap-1 text-muted-foreground">
                <img src="/share2.svg" className="h-4 w-4" />
                Share
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}

      <div className="flex justify-center">
        <Button variant="outline">Load More</Button>
      </div>
    </div>
  )
}

