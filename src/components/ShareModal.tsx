import { useState } from "react";
import { Copy, Check, Facebook, Twitter, MessageCircle, Send, Linkedin, Mail, Link2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  url?: string;
}

// Instagram icon component
const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

// Pinterest icon component
const PinterestIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z"/>
  </svg>
);

// Reddit icon component
const RedditIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>
  </svg>
);

const ShareModal = ({ isOpen, onClose, title, description, url = window.location.href }: ShareModalProps) => {
  const [copied, setCopied] = useState(false);

  const shareText = `${title} - ${description}`;
  const encodedText = encodeURIComponent(shareText);
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = [
    {
      name: "Facebook",
      icon: Facebook,
      color: "bg-[#1877F2] hover:bg-[#1877F2]/90",
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}`,
    },
    {
      name: "X",
      icon: Twitter,
      color: "bg-black hover:bg-black/90 dark:bg-white dark:hover:bg-white/90 dark:text-black",
      url: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
    },
    {
      name: "WhatsApp",
      icon: MessageCircle,
      color: "bg-[#25D366] hover:bg-[#25D366]/90",
      url: `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
    },
    {
      name: "Instagram",
      icon: InstagramIcon,
      color: "bg-gradient-to-tr from-[#833AB4] via-[#FD1D1D] to-[#F77737] hover:opacity-90",
      url: `https://www.instagram.com/`,
      note: "Copy link to share",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      color: "bg-[#0A66C2] hover:bg-[#0A66C2]/90",
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    },
    {
      name: "Telegram",
      icon: Send,
      color: "bg-[#0088CC] hover:bg-[#0088CC]/90",
      url: `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`,
    },
    {
      name: "Pinterest",
      icon: PinterestIcon,
      color: "bg-[#E60023] hover:bg-[#E60023]/90",
      url: `https://pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encodedText}`,
    },
    {
      name: "Reddit",
      icon: RedditIcon,
      color: "bg-[#FF4500] hover:bg-[#FF4500]/90",
      url: `https://www.reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`,
    },
    {
      name: "Email",
      icon: Mail,
      color: "bg-muted hover:bg-muted/80 text-foreground",
      url: `mailto:?subject=${encodedTitle}&body=${encodedText}%0A%0A${encodedUrl}`,
    },
  ];

  const handleCopy = async () => {
    await navigator.clipboard.writeText(`${shareText}\n\n${url}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = (shareUrl: string) => {
    window.open(shareUrl, "_blank", "width=600,height=400");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg bg-card border-border max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-xl">Share to Social Media</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Preview with TravelLens branding */}
          <div className="p-4 bg-secondary/50 rounded-xl relative">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">TL</span>
              </div>
              <span className="font-semibold text-foreground">TravelLens</span>
            </div>
            <p className="text-sm text-foreground">{title}</p>
            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{description}</p>
            <div className="absolute top-3 right-3">
              <span className="text-[10px] text-muted-foreground/60 font-medium">travellens.app</span>
            </div>
          </div>

          {/* Share Buttons - 3 column grid */}
          <div className="grid grid-cols-3 gap-2">
            {shareLinks.map((link) => (
              <Button
                key={link.name}
                onClick={() => handleShare(link.url)}
                className={`${link.color} text-white gap-1.5 text-xs h-10 px-2`}
                title={link.note}
              >
                <link.icon className="w-4 h-4 flex-shrink-0" />
                <span className="truncate">{link.name}</span>
              </Button>
            ))}
          </div>

          {/* Copy Link */}
          <div className="flex items-center gap-2 p-3 bg-secondary rounded-lg">
            <Link2 className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            <input
              type="text"
              value={url}
              readOnly
              className="flex-1 bg-transparent text-sm text-foreground outline-none min-w-0"
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopy}
              className="gap-1 flex-shrink-0"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-green-500">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Copy
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareModal;
