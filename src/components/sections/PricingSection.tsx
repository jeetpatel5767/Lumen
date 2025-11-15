
import { Check, ArrowRight, Star } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const PricingSection = () => {
  const plans = [
    {
      name: "Starter",
      price: "$2,997",
      period: "/month",
      description: "Perfect for small businesses looking to automate basic processes.",
      features: [
        "1 AI Chatbot Implementation",
        "Basic Workflow Automation",
        "Email & Chat Support",
        "Monthly Performance Reports",
        "Standard Integrations",
        "2 Revision Rounds"
      ],
      popular: false,
      cta: "Get Started"
    },
    {
      name: "Professional",
      price: "$5,997",
      period: "/month",
      description: "Ideal for growing companies ready to scale with comprehensive AI solutions.",
      features: [
        "3 AI Solutions Implementation",
        "Advanced Workflow Automation",
        "Priority Support & Slack Channel",
        "Bi-weekly Strategy Calls",
        "Custom Integrations",
        "Unlimited Revisions",
        "Performance Analytics Dashboard",
        "Team Training Sessions"
      ],
      popular: true,
      cta: "Most Popular"
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      description: "Tailored AI transformation for large organizations with complex needs.",
      features: [
        "Unlimited AI Solutions",
        "Custom AI Development",
        "Dedicated Account Manager",
        "Weekly Strategy Sessions",
        "Enterprise Integrations",
        "White-label Solutions",
        "24/7 Priority Support",
        "Custom SLA Agreement",
        "Advanced Security Features"
      ],
      popular: false,
      cta: "Contact Sales"
    }
  ];

  return (
    <section id="pricing" className="py-20 px-4 ">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Plans to suit your needs</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose the perfect plan to accelerate your AI transformation journey.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card key={index} className={`relative bg-card/50 backdrop-blur-sm border-border hover:bg-card/80 transition-all duration-300 ${plan.popular ? 'ring-2 ring-primary scale-105' : ''}`}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-gradient-to-r from-blue-600 to-emerald-600 text-white px-4 py-1">
                    <Star className="w-3 h-3 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                <div className="mb-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.period && <span className="text-muted-foreground">{plan.period}</span>}
                </div>
                <CardDescription className="text-base">
                  {plan.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <Check className="h-5 w-5 text-emerald-400 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  className={`w-full ${plan.popular 
                    ? 'bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white' 
                    : 'border-border hover:bg-accent'
                  }`}
                  variant={plan.popular ? 'default' : 'outline'}
                  size="lg"
                >
                  {plan.cta}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            All plans include a 30-day money-back guarantee
          </p>
          <Button variant="ghost" className="text-primary hover:text-primary/80">
            Compare all features <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
