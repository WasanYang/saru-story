'use client';
import Image from 'next/image';
import { getImage } from '@/lib/placeholder-images';
import { useLanguage } from '@/providers/language-provider';
import { Leaf, Heart, Wind } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function StoryPage() {
  const storyImage1 = getImage('story-1');
  const storyImage2 = getImage('story-2');
  const storyImage3 = getImage('story-3');
  const storyImage4 = getImage('story-4');

  const { dictionary } = useLanguage();

  if (!dictionary?.story) {
    return null;
  }

  const sections = [
    {
      icon: <Heart className="h-8 w-8 text-primary" />,
      titleKey: "section1Title",
      p1Key: "section1p1",
      p2Key: "section1p2",
      image: storyImage2,
    },
    {
      icon: <Leaf className="h-8 w-8 text-primary" />,
      titleKey: "section2Title",
      p1Key: "section2p1",
      p2Key: "section2p2",
      image: storyImage3,
    },
    {
      icon: <Wind className="h-8 w-8 text-primary" />,
      titleKey: "section3Title",
      p1Key: "section3p1",
      p2Key: "section3p2",
      image: storyImage4,
    },
  ];

  return (
    <div className="bg-background">
      <section className="relative w-full h-[50vh] text-white">
        {storyImage1 && (
          <Image
            src={storyImage1.imageUrl}
            alt={storyImage1.description}
            fill
            className="object-cover"
            data-ai-hint={storyImage1.imageHint}
            priority
          />
        )}
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative container mx-auto h-full flex flex-col items-center justify-center text-center p-4">
          <h1 className="text-4xl md:text-6xl font-bold !font-headline mb-4">
            {dictionary.story.title}
          </h1>
          <p className="max-w-2xl text-lg md:text-xl font-body">
            {dictionary.story.subtitle}
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto space-y-16">
          
          <Card className="border-none shadow-none bg-transparent">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl !font-headline">{dictionary.story.introTitle}</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-lg max-w-none mx-auto text-center font-body text-foreground">
              <p>{dictionary.story.introP1}</p>
            </CardContent>
          </Card>

          {sections.map((section, index) => (
            <div key={index} className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
              <div className={`relative h-80 md:h-full rounded-lg overflow-hidden shadow-lg ${index % 2 === 1 ? 'md:order-last' : ''}`}>
                {section.image && (
                  <Image
                    src={section.image.imageUrl}
                    alt={section.image.description}
                    fill
                    className="object-cover"
                    data-ai-hint={section.image.imageHint}
                  />
                )}
              </div>
              <div className="flex flex-col items-start text-left">
                  <div className="mx-auto md:mx-0 bg-primary/10 p-3 rounded-full w-fit mb-4">
                    {section.icon}
                  </div>
                  <h2 className="text-2xl md:text-3xl !font-headline font-bold mb-4">{dictionary.story[section.titleKey]}</h2>
                  <div className="prose max-w-none font-body text-foreground/80">
                    <p>{dictionary.story[section.p1Key]}</p>
                    <p>{dictionary.story[section.p2Key]}</p>
                  </div>
              </div>
            </div>
          ))}

          <Card className="text-center border-t border-border pt-12 mt-16 bg-transparent shadow-none">
            <CardHeader>
              <CardTitle className="text-3xl !font-headline">{dictionary.story.outroTitle}</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-lg max-w-none mx-auto font-body text-foreground">
                <p>{dictionary.story.outroP1}</p>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}
