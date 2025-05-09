import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"

export interface TestimonialAuthor {
  name: string
  title?: string
  avatar?: string
}

interface TestimonialCardProps {
  author: TestimonialAuthor
  text: string
  href?: string
}

export function TestimonialCard({ 
  author, 
  text, 
  href 
}: TestimonialCardProps) {
  const CardWrapper = href ? 
    ({ children }: { children: React.ReactNode }) => (
      <a 
        href={href} 
        className="transition-opacity hover:opacity-80 focus:opacity-80"
        target="_blank" 
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ) : 
    ({ children }: { children: React.ReactNode }) => <>{children}</>

  return (
    <CardWrapper>
      <Card className={cn(
        "w-[300px] h-full mx-2 flex flex-col",
        "border border-border bg-card text-card-foreground shadow-sm"
      )}>
        <CardContent className="flex h-full flex-col justify-between gap-4 p-6">
          <p className="text-sm text-muted-foreground">{text}</p>
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              {author.avatar && (
                <AvatarImage src={author.avatar || "/placeholder.svg"} alt={author.name} />
              )}
              <AvatarFallback>
                {author.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <p className="text-sm font-medium leading-none">{author.name}</p>
              {author.title && (
                <p className="text-xs text-muted-foreground">{author.title}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </CardWrapper>
  )
}
