
import { Plus, Minus } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQSection = () => {
  const faqs = [
    {
      question: "How long does it take to implement an AI solution?",
      answer: "Implementation timelines vary based on complexity. Simple chatbots can be deployed in 2-3 weeks, while comprehensive automation systems typically take 6-12 weeks. We provide detailed timelines during our initial consultation."
    },
    {
      question: "Do you provide training for our team?",
      answer: "Yes! We include comprehensive training sessions with all our plans. Our team ensures your staff is fully equipped to manage and optimize the AI solutions we implement."
    },
    {
      question: "What if the AI solution doesn't meet our expectations?",
      answer: "We offer a 30-day money-back guarantee and unlimited revisions during the development phase. Our goal is to ensure complete satisfaction with every solution we deliver."
    },
    {
      question: "Can you integrate with our existing systems?",
      answer: "Absolutely. We specialize in seamless integrations with popular platforms like Salesforce, HubSpot, Shopify, and custom APIs. We assess your current tech stack during discovery to ensure smooth integration."
    },
    {
      question: "How do you ensure data security and privacy?",
      answer: "We follow enterprise-grade security protocols including end-to-end encryption, SOC 2 compliance, and GDPR adherence. All data processing is secured and can be hosted on your preferred infrastructure."
    },
    {
      question: "What ongoing support do you provide?",
      answer: "All plans include ongoing support, performance monitoring, and optimization. We provide regular reports, system updates, and are available for troubleshooting and enhancements."
    },
    {
      question: "Can we start with a smaller project before committing to a full solution?",
      answer: "Definitely! We recommend starting with a pilot project to demonstrate value. Our Starter plan is perfect for testing the waters before scaling to more comprehensive solutions."
    },
    {
      question: "How do you measure the ROI of AI implementations?",
      answer: "We establish clear KPIs before implementation and provide detailed analytics dashboards. Common metrics include time savings, cost reduction, accuracy improvements, and customer satisfaction scores."
    }
  ];

  return (
    <section className="py-20 px-4 ">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">FAQ</h2>
          <p className="text-xl text-muted-foreground">
            Common questions about our AI automation services and process.
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="bg-card/50 backdrop-blur-sm border border-border rounded-lg px-6">
              <AccordionTrigger className="text-left text-lg font-medium hover:no-underline py-6">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-6 leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Still have questions? We're here to help.
          </p>
          <a href="#contact" className="text-primary hover:text-primary/80 font-medium">
            Get in touch with our team →
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
