
import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "CEO, TechFlow Solutions",
      company: "TechFlow",
      content: "Nebula AI transformed our customer service completely. The chatbot handles 80% of our inquiries, and our team can focus on complex issues. ROI was evident within the first month.",
      rating: 5,
      avatar: "SC"
    },
    {
      name: "Michael Rodriguez",
      role: "Operations Director",
      company: "Global Manufacturing",
      content: "The workflow automation they built saved us 15 hours per week on manual processes. The team's expertise and support throughout the project was exceptional.",
      rating: 5,
      avatar: "MR"
    },
    {
      name: "Emma Thompson",
      role: "CTO, DataVault Inc",
      company: "DataVault",
      content: "Working with Nebula AI was a game-changer. Their custom AI solution increased our processing speed by 60% while maintaining 99.8% accuracy. Highly recommended!",
      rating: 5,
      avatar: "ET"
    },
    {
      name: "David Park",
      role: "Founder",
      company: "RetailPro",
      content: "The AI automation solutions delivered exactly what was promised. Customer satisfaction improved dramatically, and our operational efficiency reached new heights.",
      rating: 5,
      avatar: "DP"
    }
  ];

  return (

    
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">What our clients say</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it. See what industry leaders say about our AI solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-card/50 backdrop-blur-sm border-border hover:bg-card/80 transition-all duration-300">
              <CardContent className="p-8">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                
                <div className="relative mb-6">
                  <Quote className="absolute -top-2 -left-2 h-8 w-8 text-muted-foreground/30" />
                  <p className="text-lg leading-relaxed pl-6">
                    "{testimonial.content}"
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-gradient-to-r from-blue-600 to-emerald-600 text-white font-semibold">
                      {testimonial.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.role}, {testimonial.company}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
