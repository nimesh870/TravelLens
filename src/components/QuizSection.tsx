import { useState } from "react";
import { 
  Play, Brain, Award, ChevronRight, CheckCircle, XCircle, 
  Trophy, Zap, Share2, RotateCcw
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { quizzes, Quiz, QuizQuestion } from "@/data/quizzes";
import ShareModal from "./ShareModal";

interface QuizCardProps {
  quiz: Quiz;
  onStart: (quiz: Quiz) => void;
  isCompleted?: boolean;
  score?: number;
}

const QuizCard = ({ quiz, onStart, isCompleted, score }: QuizCardProps) => {
  const difficultyColors = {
    easy: "text-green-400 bg-green-500/20 border-green-500/30",
    medium: "text-amber-400 bg-amber-500/20 border-amber-500/30",
    hard: "text-red-400 bg-red-500/20 border-red-500/30",
  };

  return (
    <div className="group bg-card rounded-2xl border border-border overflow-hidden hover-lift transition-all">
      {/* Badge Preview */}
      <div className={`h-24 bg-gradient-to-br ${quiz.badge.color} flex items-center justify-center relative`}>
        <span className="text-5xl">{quiz.badge.icon}</span>
        {isCompleted && (
          <div className="absolute top-3 right-3 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
            <CheckCircle className="w-5 h-5 text-white" />
          </div>
        )}
      </div>

      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${difficultyColors[quiz.difficulty]}`}>
            {quiz.difficulty}
          </span>
          <span className="text-xs text-muted-foreground">{quiz.location}</span>
        </div>

        <h3 className="font-display text-lg font-semibold text-foreground mb-2">
          {quiz.title}
        </h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {quiz.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-sm">
            <span className="flex items-center gap-1 text-muted-foreground">
              <Brain className="w-4 h-4" />
              {quiz.questions.length} Q
            </span>
            <span className="flex items-center gap-1 text-primary">
              <Zap className="w-4 h-4" />
              +{quiz.xpReward} XP
            </span>
          </div>

          <Button 
            size="sm" 
            onClick={() => onStart(quiz)}
            className={isCompleted ? "bg-secondary text-foreground" : "bg-primary"}
          >
            {isCompleted ? (
              <>
                <RotateCcw className="w-4 h-4 mr-1" />
                Retry
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-1" />
                Start
              </>
            )}
          </Button>
        </div>

        {isCompleted && score !== undefined && (
          <div className="mt-4 pt-4 border-t border-border">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Best Score</span>
              <span className={`font-semibold ${score >= 80 ? "text-green-400" : score >= 60 ? "text-amber-400" : "text-red-400"}`}>
                {score}%
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

interface QuizPlayerProps {
  quiz: Quiz;
  onComplete: (score: number) => void;
  onExit: () => void;
}

const QuizPlayer = ({ quiz, onComplete, onExit }: QuizPlayerProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);

  const question = quiz.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / quiz.questions.length) * 100;

  const handleAnswer = (answerIndex: number) => {
    if (isAnswered) return;
    
    setSelectedAnswer(answerIndex);
    setIsAnswered(true);
    
    if (answerIndex === question.correctAnswer) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      const finalScore = Math.round((score / quiz.questions.length) * 100);
      setShowResults(true);
      onComplete(finalScore);
    }
  };

  if (showResults) {
    const finalScore = Math.round((score / quiz.questions.length) * 100);
    const passed = finalScore >= 70;

    return (
      <div className="fixed inset-0 bg-background/95 backdrop-blur-lg z-50 flex items-center justify-center p-4">
        <div className="bg-card rounded-3xl border border-border p-8 max-w-md w-full text-center">
          {/* Badge Animation */}
          <div className={`w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br ${quiz.badge.color} flex items-center justify-center ${passed ? "animate-scale-in" : ""}`}>
            <span className="text-6xl">{quiz.badge.icon}</span>
          </div>

          <h2 className="font-display text-3xl font-bold text-foreground mb-2">
            {passed ? "Congratulations!" : "Keep Learning!"}
          </h2>
          
          <p className="text-muted-foreground mb-6">
            {passed 
              ? `You've earned the ${quiz.badge.name} badge!`
              : "Practice makes perfect. Try again to earn this badge."
            }
          </p>

          <div className="flex items-center justify-center gap-6 mb-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-foreground">{score}</div>
              <div className="text-sm text-muted-foreground">Correct</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary">{finalScore}%</div>
              <div className="text-sm text-muted-foreground">Score</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-amber-400">+{passed ? quiz.xpReward : Math.floor(quiz.xpReward / 2)}</div>
              <div className="text-sm text-muted-foreground">XP Earned</div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" className="flex-1" onClick={onExit}>
              Back to Quizzes
            </Button>
            {passed && (
              <Button 
                className="flex-1 bg-primary gap-2" 
                onClick={() => setShareModalOpen(true)}
              >
                <Share2 className="w-4 h-4" />
                Share Badge
              </Button>
            )}
          </div>
        </div>

        <ShareModal 
          isOpen={shareModalOpen}
          onClose={() => setShareModalOpen(false)}
          title={`I earned the ${quiz.badge.name} badge on TravelLens!`}
          description={`Scored ${finalScore}% on the ${quiz.title} quiz. Test your knowledge too!`}
        />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-background/95 backdrop-blur-lg z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-3xl border border-border p-6 max-w-2xl w-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-display text-lg font-semibold text-foreground">
              {quiz.title}
            </h3>
            <p className="text-sm text-muted-foreground">
              Question {currentQuestion + 1} of {quiz.questions.length}
            </p>
          </div>
          <Button variant="ghost" onClick={onExit}>
            Exit
          </Button>
        </div>

        {/* Progress */}
        <Progress value={progress} className="h-2 mb-8" />

        {/* Question */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${
              question.category === "culture" ? "bg-purple-500/20 text-purple-400" :
              question.category === "safety" ? "bg-blue-500/20 text-blue-400" :
              question.category === "etiquette" ? "bg-amber-500/20 text-amber-400" :
              "bg-green-500/20 text-green-400"
            }`}>
              {question.category}
            </span>
          </div>
          <h4 className="font-display text-2xl font-semibold text-foreground">
            {question.question}
          </h4>
        </div>

        {/* Options */}
        <div className="space-y-3 mb-8">
          {question.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrect = index === question.correctAnswer;
            
            let optionClass = "bg-secondary border-border hover:border-primary/50";
            if (isAnswered) {
              if (isCorrect) {
                optionClass = "bg-green-500/20 border-green-500";
              } else if (isSelected && !isCorrect) {
                optionClass = "bg-red-500/20 border-red-500";
              }
            } else if (isSelected) {
              optionClass = "bg-primary/20 border-primary";
            }

            return (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                disabled={isAnswered}
                className={`w-full p-4 rounded-xl border-2 text-left transition-all ${optionClass}`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-background/50 flex items-center justify-center text-sm font-semibold">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="flex-1 text-foreground">{option}</span>
                  {isAnswered && isCorrect && (
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  )}
                  {isAnswered && isSelected && !isCorrect && (
                    <XCircle className="w-5 h-5 text-red-400" />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        {isAnswered && (
          <div className="mb-6 p-4 rounded-xl bg-secondary/50 border border-border animate-fade-in">
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">Explanation:</span> {question.explanation}
            </p>
          </div>
        )}

        {/* Next Button */}
        {isAnswered && (
          <Button onClick={handleNext} className="w-full bg-primary">
            {currentQuestion < quiz.questions.length - 1 ? "Next Question" : "See Results"}
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        )}
      </div>
    </div>
  );
};

const QuizSection = () => {
  const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(null);
  const [completedQuizzes, setCompletedQuizzes] = useState<{ [key: string]: number }>({});

  const handleQuizComplete = (score: number) => {
    if (activeQuiz) {
      setCompletedQuizzes(prev => ({
        ...prev,
        [activeQuiz.id]: Math.max(prev[activeQuiz.id] || 0, score),
      }));
    }
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-display text-3xl font-semibold text-foreground mb-2">
              Quick Learning Quizzes
            </h2>
            <p className="text-muted-foreground">
              Test your knowledge and earn badges before you travel
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Trophy className="w-5 h-5 text-primary" />
              <span>{Object.keys(completedQuizzes).length} / {quizzes.length} Completed</span>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quizzes.map((quiz) => (
            <QuizCard 
              key={quiz.id}
              quiz={quiz}
              onStart={setActiveQuiz}
              isCompleted={completedQuizzes[quiz.id] !== undefined}
              score={completedQuizzes[quiz.id]}
            />
          ))}
        </div>
      </div>

      {activeQuiz && (
        <QuizPlayer 
          quiz={activeQuiz}
          onComplete={handleQuizComplete}
          onExit={() => setActiveQuiz(null)}
        />
      )}
    </section>
  );
};

export default QuizSection;
