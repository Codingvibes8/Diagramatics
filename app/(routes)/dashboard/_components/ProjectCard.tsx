"use client";

import { MoreHorizontal, Star } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ProjectCardProps {
  title: string;
  editedAt: string;
  thumbnailGradient?: string;
  isStarred?: boolean;
}

export function ProjectCard({ 
  title, 
  editedAt, 
  thumbnailGradient = "from-blue-600 to-cyan-500",
  isStarred = false 
}: ProjectCardProps) {
  return (
    <Card className="group bg-card border-none overflow-hidden hover:ring-2 hover:ring-blue-500/50 transition-all duration-300">
      <div className={`h-32 w-full bg-gradient-to-br ${thumbnailGradient} relative p-4 flex items-center justify-center`}>
        {/* Abstract diagram elements for decoration */}
        <div className="absolute inset-0 bg-black/10" />
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute top-2 right-2 text-white/70 hover:text-white hover:bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Star className={`h-4 w-4 ${isStarred ? "fill-current text-yellow-400" : ""}`} />
        </Button>
      </div>
      
      <CardContent className="p-4 py-3">
        <h3 className="font-medium text-white truncate">{title}</h3>
        <p className="text-xs text-muted-foreground mt-1">{editedAt}</p>
      </CardContent>
    </Card>
  );
}
