import Image from 'next/image';
import { Leaf, Sun, Waves, Thermometer, Droplets } from 'lucide-react';
import { getImage } from '@/lib/placeholder-images';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const features = [
  {
    icon: <Droplets className="h-8 w-8 text-primary" />,
    title: "Unmatched Softness",
    description: "Our double-gauze muslin gets softer with every wash, providing a gentle, luxurious feel against your skin."
  },
  {
    icon: <Waves className="h-8 w-8 text-primary" />,
    title: "Exceptionally Breathable",
    description: "The open weave of muslin allows for superior airflow, keeping you cool and comfortable in warmer weather."
  },
  {
    icon: <Thermometer className="h-8 w-8 text-primary" />,
    title: "Naturally Regulating",
    description: "Muslin is a lightweight insulator, helping you stay warm in the cool and cool in the heat."
  },
  {
    icon: <Leaf className="h-8 w-8 text-primary" />,
    title: "Eco-Friendly & Sustainable",
    description: "Made from natural fibers and colored with plant-based dyes, our fabric is kind to the earth."
  }
];

export default function WhySaruPage() {
  const whySaruImage = getImage('why-saru-1');

  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Why Saru?</h1>
            <p className="text-lg text-muted-foreground">The Simple Magic of Muslin Fabric</p>
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
              Saru is more than just a name; it's our word for muslin, a fabric cherished for centuries for its unique qualities. We chose muslin not just for its beauty, but for the incredible benefits it brings to your daily life. It's a fabric that cares for you, just as we care for the way it's made.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature) => (
              <Card key={feature.title} className="text-center">
                <CardHeader>
                  <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="!font-headline">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
