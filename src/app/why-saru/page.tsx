'use client';
import Image from 'next/image';
import { Leaf, Sun, Waves, Thermometer, Droplets } from 'lucide-react';
import { getImage } from '@/lib/placeholder-images';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/providers/language-provider';

const features = [
  {
    icon: <Droplets className="h-8 w-8 text-primary" />,
    titleKey: "featureSoftnessTitle",
    descriptionKey: "featureSoftnessDescription"
  },
  {
    icon: <Waves className="h-8 w-8 text-primary" />,
    titleKey: "featureBreathableTitle",
    descriptionKey: "featureBreathableDescription"
  },
  {
    icon: <Thermometer className="h-8 w-8 text-primary" />,
    titleKey: "featureRegulatingTitle",
    descriptionKey: "featureRegulatingDescription"
  },
  {
    icon: <Leaf className="h-8 w-8 text-primary" />,
    titleKey: "featureEcoFriendlyTitle",
    descriptionKey: "featureEcoFriendlyDescription"
  }
];

export default function WhySaruPage() {
  const whySaruImage = getImage('why-saru-1');
  const { dictionary } = useLanguage();

  if (!dictionary?.whySaru) {
    return null;
  }

  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{dictionary.whySaru.title}</h1>
            <p className="text-lg text-muted-foreground">{dictionary.whySaru.subtitle}</p>
          </div>

          <div className="relative h-96 my-12 rounded-lg overflow-hidden shadow-lg">
            {whySaruImage && (
              <Image
                src={whySaruImage.imageUrl}
                alt={whySaruImage.description}
                fill
                className="object-cover"
                data-ai-hint={whySaruImage.imageHint}
              />
            )}
          </div>

          <div className="prose prose-lg max-w-none mx-auto font-body text-foreground mb-16">
            <p>
              {dictionary.whySaru.p1}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature) => (
              <Card key={feature.titleKey} className="text-center">
                <CardHeader>
                  <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="!font-headline">{dictionary.home[feature.titleKey]}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{dictionary.home[feature.descriptionKey]}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}