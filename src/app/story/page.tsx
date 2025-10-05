'use client';
import Image from 'next/image';
import { getImage } from '@/lib/placeholder-images';
import { useLanguage } from '@/providers/language-provider';

export default function StoryPage() {
  const storyImage = getImage('story-1');
  const { dictionary } = useLanguage();

  if (!dictionary?.story) {
    return null;
  }

  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{dictionary.story.title}</h1>
            <p className="text-lg text-muted-foreground">{dictionary.story.subtitle}</p>
          </div>

          <div className="prose prose-lg max-w-none mx-auto font-body text-foreground">
            <p>
              {dictionary.story.p1}
            </p>
            
            <div className="relative h-96 my-12 rounded-lg overflow-hidden shadow-lg">
                {storyImage && (
                    <Image
                        src={storyImage.imageUrl}
                        alt={storyImage.description}
                        fill
                        className="object-cover"
                        data-ai-hint={storyImage.imageHint}
                    />
                )}
            </div>

            <h2 className="!font-headline">{dictionary.story.h2_1}</h2>
            <p>
              {dictionary.story.p2}
            </p>
            <p>
              {dictionary.story.p3}
            </p>

            <h2 className="!font-headline">{dictionary.story.h2_2}</h2>
            <p>
              {dictionary.story.p4}
            </p>
            <p>
              {dictionary.story.p5}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}