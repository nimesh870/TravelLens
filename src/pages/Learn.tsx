import { useState } from "react";
import { Play, Clock, BookOpen, Award, Users, ChevronRight, Brain, Trophy, Sparkles, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import QuizSection from "@/components/QuizSection";
import BadgeShowcase from "@/components/BadgeShowcase";
import heroImage from "@/assets/hero-nepal.jpg";
import kathmanduImg from "@/assets/kathmandu.jpg";
import lumbiniImg from "@/assets/lumbini.jpg";
import VideoModal from "@/components/VideoModal";
import { toast } from "sonner";
import { PageTransition, FadeUpSection, StaggerSection, StaggerItem } from "@/components/animations";
import { motion } from "framer-motion";

const courses = [
  {
    title: "Introduction to Nepali Culture",
    description: "Discover the rich traditions, festivals, and customs that define Nepal's unique cultural identity.",
    duration: "2 hours",
    lessons: 8,
    level: "Beginner",
    image: kathmanduImg,
    progress: 60,
  },
  {
    title: "Buddhism in the Himalayas",
    description: "Explore the spiritual heritage of Buddhism and its profound influence on Himalayan societies.",
    duration: "3 hours",
    lessons: 12,
    level: "Intermediate",
    image: lumbiniImg,
    progress: 0,
  },
  {
    title: "Himalayan Geography & Ecology",
    description: "Learn about the unique ecosystems, wildlife, and geological wonders of the Himalayan range.",
    duration: "2.5 hours",
    lessons: 10,
    level: "Beginner",
    image: heroImage,
    progress: 30,
  },
];

const featuredVideo = {
  title: "The Spirit of Nepal",
  description: "An immersive documentary journey through Nepal's most sacred sites and breathtaking landscapes.",
  duration: "45 min",
  views: "125K",
};

const userProgress = {
  level: 12,
  xp: 2450,
  xpToNextLevel: 3000,
  sustainabilityScore: 78,
  quizzesCompleted: 8,
  badgesEarned: 6,
};

const Learn = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);

  return (
    <PageTransition className="min-h-screen bg-background">
      <Navbar />
      
      <VideoModal
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
        videoUrl="https://youtu.be/MGSALKM2VeI?si=oHEMQSMm-axVGnkX"
        title="The Spirit of Nepal - Documentary"
      />

      <PageHeader
        tag="Learn"
        title="Master Travel"
        highlight="Knowledge"
        subtitle="Gamified learning that makes you a smarter, safer, and more respectful traveler."
      />

      {/* Progress Dashboard */}
      <section className="py-8 border-b border-border">
        <div className="container mx-auto px-6">
          <StaggerSection className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StaggerItem>
              <div className="bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl p-5 border border-primary/20">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-foreground">Level {userProgress.level}</div>
                    <div className="text-xs text-muted-foreground">Knowledge Passport</div>
                  </div>
                </div>
                <Progress value={(userProgress.xp / userProgress.xpToNextLevel) * 100} className="h-2 mb-1" />
                <div className="text-xs text-muted-foreground text-right">
                  {userProgress.xp} / {userProgress.xpToNextLevel} XP
                </div>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="bg-gradient-to-br from-green-500/20 to-green-500/5 rounded-2xl p-5 border border-green-500/20">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
                    <Target className="w-6 h-6 text-green-500" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-foreground">{userProgress.sustainabilityScore}%</div>
                    <div className="text-xs text-muted-foreground">Sustainability Score</div>
                  </div>
                </div>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <div 
                      key={i} 
                      className={`flex-1 h-2 rounded-full ${i < Math.floor(userProgress.sustainabilityScore / 20) ? "bg-green-500" : "bg-secondary"}`}
                    />
                  ))}
                </div>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="bg-gradient-to-br from-blue-500/20 to-blue-500/5 rounded-2xl p-5 border border-blue-500/20">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                    <Brain className="w-6 h-6 text-blue-500" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-foreground">{userProgress.quizzesCompleted}</div>
                    <div className="text-xs text-muted-foreground">Quizzes Completed</div>
                  </div>
                </div>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="bg-gradient-to-br from-purple-500/20 to-purple-500/5 rounded-2xl p-5 border border-purple-500/20">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                    <Trophy className="w-6 h-6 text-purple-500" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-foreground">{userProgress.badgesEarned}</div>
                    <div className="text-xs text-muted-foreground">Badges Earned</div>
                  </div>
                </div>
              </div>
            </StaggerItem>
          </StaggerSection>
        </div>
      </section>

      {/* Quick Learning Quizzes */}
      <QuizSection />

      {/* Featured Video */}
      <section className="py-12 bg-secondary/30">
        <div className="container mx-auto px-6">
          <FadeUpSection>
            <div className="relative rounded-2xl overflow-hidden aspect-video lg:aspect-[21/9]">
              <img
                src={heroImage}
                alt={featuredVideo.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
              
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsVideoOpen(true)}
                  className="w-24 h-24 rounded-full bg-primary/90 hover:bg-primary transition-colors flex items-center justify-center"
                >
                  <Play className="w-10 h-10 text-primary-foreground fill-current ml-1" />
                </motion.button>
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/20 text-primary border border-primary/30 mb-4 inline-block">
                  Featured Documentary
                </span>
                <h2 className="font-display text-3xl md:text-4xl font-medium text-foreground mb-2">
                  {featuredVideo.title}
                </h2>
                <p className="text-muted-foreground max-w-xl mb-4">
                  {featuredVideo.description}
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {featuredVideo.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {featuredVideo.views} views
                  </span>
                </div>
              </div>
            </div>
          </FadeUpSection>
        </div>
      </section>

      {/* Badge Showcase */}
      <BadgeShowcase />

      {/* Courses */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-6">
          <FadeUpSection className="flex justify-between items-center mb-8">
            <div>
              <h2 className="font-display text-3xl font-medium text-foreground mb-2">
                Interactive Courses
              </h2>
              <p className="text-muted-foreground">
                Learn at your own pace with expert-curated content
              </p>
            </div>
            <Button variant="outline" className="gap-2" onClick={() => toast.info("More courses coming soon!", { description: "We're developing new learning content." })}>
              View All Courses
              <ChevronRight className="w-4 h-4" />
            </Button>
          </FadeUpSection>

          <StaggerSection className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <StaggerItem key={course.title}>
                <div
                  onClick={() => {
                    setSelectedCourse(course.title);
                    toast.success(`Opening "${course.title}"`, { description: `${course.lessons} lessons • ${course.duration}` });
                  }}
                  className="group bg-card rounded-2xl overflow-hidden border border-border hover-lift cursor-pointer"
                >
                  <div className="aspect-video relative overflow-hidden">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 rounded-full text-xs font-medium glass-effect">
                        {course.level}
                      </span>
                    </div>
                    {course.progress > 0 && (
                      <div className="absolute bottom-0 left-0 right-0 bg-background/80 p-2">
                        <Progress value={course.progress} className="h-1" />
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                      {course.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {course.description}
                    </p>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {course.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <BookOpen className="w-4 h-4" />
                          {course.lessons} lessons
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerSection>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <StaggerSection className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "50+", label: "Video Lessons" },
              { value: "24", label: "Quizzes" },
              { value: "16", label: "Badges to Earn" },
              { value: "4.9", label: "Average Rating" },
            ].map((stat) => (
              <StaggerItem key={stat.label}>
                <div className="text-4xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </StaggerItem>
            ))}
          </StaggerSection>
        </div>
      </section>

      <Footer />
    </PageTransition>
  );
};

export default Learn;
