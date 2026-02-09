import { useState } from "react";
import { toast } from "sonner";
import { Users, MessageCircle, Heart, Share2, MapPin, Calendar, Trophy, Star, Send, Image, Smile } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import ShareModal from "@/components/ShareModal";
import pokharaImg from "@/assets/pokhara.jpg";
import everestImg from "@/assets/everest.jpg";
import { PageTransition, FadeUpSection, StaggerSection, StaggerItem } from "@/components/animations";
import { motion } from "framer-motion";

const posts = [
  {
    id: 1,
    author: "Sarah Chen",
    avatar: "SC",
    location: "San Francisco, USA",
    date: "2 days ago",
    content: "Just finished the Everest Base Camp VR tour and I'm speechless! The attention to detail is incredible. Already planning my real trip for next year! 🏔️",
    image: everestImg,
    likes: 234,
    comments: 45,
    liked: false,
    badges: ["Peak Seeker", "Culture Explorer"],
  },
  {
    id: 2,
    author: "Raj Sharma",
    avatar: "RS",
    location: "Mumbai, India",
    date: "5 days ago",
    content: "The Pokhara lakeside experience brought back so many memories. I visited 10 years ago and TravelLens captured the essence perfectly. The sunrise over Machhapuchhre is still magical! ✨",
    image: pokharaImg,
    likes: 189,
    comments: 32,
    liked: true,
    badges: ["Valley Explorer", "Safety Champion"],
  },
];

const topContributors = [
  { name: "Maya Thapa", points: 12450, badge: "Explorer Elite", avatar: "MT" },
  { name: "John Smith", points: 9820, badge: "Cultural Guide", avatar: "JS" },
  { name: "Priya Patel", points: 8540, badge: "VR Pioneer", avatar: "PP" },
  { name: "Alex Kim", points: 7230, badge: "Story Teller", avatar: "AK" },
];

const upcomingEvents = [
  {
    title: "Virtual Dashain Festival Celebration",
    date: "Oct 15, 2024",
    participants: 1250,
  },
  {
    title: "Live Q&A: Trekking in Nepal",
    date: "Oct 20, 2024",
    participants: 890,
  },
  {
    title: "Photography Workshop: Himalayan Landscapes",
    date: "Oct 25, 2024",
    participants: 650,
  },
];

const Community = () => {
  const [likedPosts, setLikedPosts] = useState<{ [key: number]: boolean }>({ 2: true });
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<typeof posts[0] | null>(null);
  const [newPostContent, setNewPostContent] = useState("");

  const handleLike = (postId: number) => {
    setLikedPosts(prev => ({ ...prev, [postId]: !prev[postId] }));
  };

  const handleShare = (post: typeof posts[0]) => {
    setSelectedPost(post);
    setShareModalOpen(true);
  };

  return (
    <PageTransition className="min-h-screen bg-background">
      <Navbar />
      
      <PageHeader
        tag="Community"
        title="Connect with Fellow"
        highlight="Explorers"
        subtitle="Share experiences, discover stories, and join a global community of virtual travelers."
      />

      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Feed */}
            <div className="lg:col-span-2 space-y-6">
              {/* Create Post */}
              <FadeUpSection>
                <div className="bg-card rounded-2xl border border-border p-6">
                  <div className="flex items-start gap-4">
                    <Avatar>
                      <AvatarFallback className="bg-primary/20 text-primary">
                        YO
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <Textarea 
                        placeholder="Share your travel experience or learning journey..."
                        value={newPostContent}
                        onChange={(e) => setNewPostContent(e.target.value)}
                        className="bg-secondary border-border min-h-[100px] resize-none"
                      />
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm" className="gap-2" onClick={() => toast.info("Photo upload coming soon!")}>
                            <Image className="w-4 h-4" />
                            Photo
                          </Button>
                          <Button variant="ghost" size="sm" className="gap-2" onClick={() => toast.info("Emoji picker coming soon!")}>
                            <Smile className="w-4 h-4" />
                            Emoji
                          </Button>
                        </div>
                        <Button className="bg-primary gap-2" onClick={() => {
                          if (newPostContent.trim()) {
                            toast.success("Post shared!", { description: "Your experience has been shared with the community." });
                            setNewPostContent("");
                          } else {
                            toast.error("Please write something to share.");
                          }
                        }}>
                          <Send className="w-4 h-4" />
                          Share
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeUpSection>

              <FadeUpSection delay={0.1}>
                <h2 className="font-display text-2xl font-medium text-foreground">
                  Community Feed
                </h2>
              </FadeUpSection>

              {posts.map((post, idx) => (
                <FadeUpSection key={post.id} delay={0.15 + idx * 0.1}>
                  <div className="bg-card rounded-2xl border border-border overflow-hidden">
                    <div className="p-6">
                      <div className="flex items-start gap-4 mb-4">
                        <Avatar>
                          <AvatarFallback className="bg-primary/20 text-primary">
                            {post.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-semibold text-foreground">{post.author}</span>
                            {post.badges.map((badge) => (
                              <span key={badge} className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-primary/20 text-primary">
                                {badge}
                              </span>
                            ))}
                            <span className="text-xs text-muted-foreground">•</span>
                            <span className="text-sm text-muted-foreground">{post.date}</span>
                          </div>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <MapPin className="w-3 h-3" />
                            {post.location}
                          </div>
                        </div>
                      </div>
                      <p className="text-foreground mb-4">{post.content}</p>
                    </div>
                    <div className="relative">
                      <img
                        src={post.image}
                        alt="Post"
                        className="w-full aspect-video object-cover"
                      />
                      <div className="absolute bottom-3 right-3">
                        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-sm">
                          <div className="w-4 h-4 rounded-full bg-primary flex items-center justify-center">
                            <span className="text-primary-foreground font-bold text-[8px]">TL</span>
                          </div>
                          <span className="text-white/90 text-xs font-medium">TravelLens</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 flex items-center justify-between border-t border-border">
                      <div className="flex items-center gap-6">
                        <motion.button 
                          whileTap={{ scale: 1.3 }}
                          onClick={() => handleLike(post.id)}
                          className={`flex items-center gap-2 transition-colors ${
                            likedPosts[post.id] ? "text-red-500" : "text-muted-foreground hover:text-red-500"
                          }`}
                        >
                          <Heart className={`w-5 h-5 ${likedPosts[post.id] ? "fill-current" : ""}`} />
                          <span>{post.likes + (likedPosts[post.id] ? 1 : 0)}</span>
                        </motion.button>
                        <button onClick={() => toast.info("Comments coming soon!", { description: "Community discussions are being developed." })} className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                          <MessageCircle className="w-5 h-5" />
                          <span>{post.comments}</span>
                        </button>
                      </div>
                      <button 
                        onClick={() => handleShare(post)}
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        <Share2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </FadeUpSection>
              ))}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <FadeUpSection delay={0.1}>
                <div className="bg-card rounded-2xl border border-border p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Trophy className="w-5 h-5 text-primary" />
                    <h3 className="font-display text-lg font-semibold text-foreground">
                      Top Contributors
                    </h3>
                  </div>
                  <div className="space-y-4">
                    {topContributors.map((contributor, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <span className={`text-sm font-bold w-4 ${
                          index === 0 ? "text-yellow-500" : 
                          index === 1 ? "text-gray-400" : 
                          index === 2 ? "text-amber-600" : "text-muted-foreground"
                        }`}>
                          {index + 1}
                        </span>
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="bg-primary/20 text-primary text-xs">
                            {contributor.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="font-medium text-foreground text-sm">
                            {contributor.name}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {contributor.badge}
                          </div>
                        </div>
                        <div className="text-sm font-semibold text-primary">
                          {contributor.points.toLocaleString()}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeUpSection>

              <FadeUpSection delay={0.2}>
                <div className="bg-card rounded-2xl border border-border p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Calendar className="w-5 h-5 text-primary" />
                    <h3 className="font-display text-lg font-semibold text-foreground">
                      Upcoming Events
                    </h3>
                  </div>
                  <div className="space-y-4">
                    {upcomingEvents.map((event, index) => (
                      <div key={index} className="p-3 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors cursor-pointer">
                        <div className="font-medium text-foreground text-sm mb-1">
                          {event.title}
                        </div>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>{event.date}</span>
                          <span className="flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            {event.participants}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full mt-4" onClick={() => toast.info("Events calendar coming soon!", { description: "We're building a full events platform." })}>
                    View All Events
                  </Button>
                </div>
              </FadeUpSection>

              <FadeUpSection delay={0.3}>
                <div className="bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl border border-primary/20 p-6">
                  <h3 className="font-display text-lg font-semibold text-foreground mb-4">
                    Community Stats
                  </h3>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-primary">45K+</div>
                      <div className="text-xs text-muted-foreground">Members</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary">12K+</div>
                      <div className="text-xs text-muted-foreground">Posts</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary">89</div>
                      <div className="text-xs text-muted-foreground">Countries</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary">1.2M</div>
                      <div className="text-xs text-muted-foreground">VR Tours</div>
                    </div>
                  </div>
                </div>
              </FadeUpSection>
            </div>
          </div>
        </div>
      </section>

      {selectedPost && (
        <ShareModal 
          isOpen={shareModalOpen}
          onClose={() => setShareModalOpen(false)}
          title={`Check out ${selectedPost.author}'s experience on TravelLens!`}
          description={selectedPost.content.slice(0, 100) + "..."}
        />
      )}

      <Footer />
    </PageTransition>
  );
};

export default Community;
