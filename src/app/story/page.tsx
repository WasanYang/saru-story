import Image from 'next/image';
import { Leaf, Sun, Wind } from 'lucide-react';
import { getImage } from '@/lib/placeholder-images';

export default function StoryPage() {
  const storyImage = getImage('story-1');
  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Story</h1>
            <p className="text-lg text-muted-foreground">From a Simple Thread to a Sustainable Dream</p>
          </div>

          <div className="prose prose-lg max-w-none mx-auto font-body text-foreground">
            <p>
              Saru Story began not in a design studio, but in a quiet moment of appreciation for the simple things. It started with a love for fabrics that feel like a second skin, for clothes that don't constrict but flow, and for a way of living that honors both people and the planet.
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

            <h2 className="!font-headline">The Discovery of Muslin</h2>
            <p>
              Our journey led us to muslin, or 'Saru' as it's known in many cultures. This ancient fabric, known for its incredible softness and breathability, captivated us. We were fascinated by its history, traditionally used to swaddle newborns, a testament to its gentle and protective nature. We wondered: why should this comfort be limited to babies?
            </p>
            <p>
              This question sparked our mission: to bring the nurturing comfort of muslin to everyday wear. We envisioned a line of clothing that embodies a sense of calm, ease, and understated elegance.
            </p>

            <h2 className="!font-headline">A Commitment to Craft and Community</h2>
            <p>
              We believe the 'how' is just as important as the 'what'. That's why we partner with small communities of artisans, who have been perfecting the art of weaving for generations. Our fabrics are dyed using natural, plant-based ingredients, a slow and intentional process that results in unique, earthy hues that are kind to your skin and the environment.
            </p>
            <p>
              Every Saru Story piece is a celebration of this collaboration—a blend of traditional craftsmanship and contemporary design. It's more than just clothing; it's a piece of a story, a commitment to mindful consumption, and an invitation to live more softly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
