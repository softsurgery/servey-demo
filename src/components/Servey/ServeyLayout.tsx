import React, { useState } from "react";
import { cn } from "../../utils/cn";
import { Step, Stepper, useStepper } from "../ui/stepper";
import { Button } from "../ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ServeyLayoutProps {
  className?: string;
}

interface StepItem {
  label: string;
  inputType: string; 
  placeholder?: string; 
  options?: { value: string; label: string }[]; 
}

const stepContent: StepItem[] = [
  {
    label: "Email",
    inputType: "email",
    placeholder: "Enter your email address",
  },
  {
    label: "Name, Email, and Phone",
    inputType: "grouped",
    placeholders: ["Enter your name", "Enter your phone number"],
  },
  {
    label: "Feedback",
    inputType: "select",
    options: [
      { value: "1", label: "Very Satisfied" },
      { value: "2", label: "Satisfied" },
      { value: "3", label: "Neutral" },
      { value: "4", label: "Unsatisfied" },
      { value: "5", label: "Very Unsatisfied" },
    ],
  },
  {
    label: "Additional Feedback",
    inputType: "textarea",
    placeholder: "Your additional feedback...",
  },
];

export const ServeyLayout: React.FC<ServeyLayoutProps> = ({ className }) => {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    phone: "",
    feedback: "",
    additionalFeedback: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    if (id === "grouped-email") {
      setFormData({ ...formData, email: value });
    } else if (id === "grouped-phone") {
      setFormData({ ...formData, phone: value });
    } else {
      setFormData({ ...formData, [id]: value });
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:5000", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      console.log(result.message);
    } catch (error) {
      console.error("Error submitting survey:", error);
    }
  };

  const steps: StepItem[] = [
    { label: "Step 1", inputType: "email" },
    { label: "Step 2", inputType: "grouped" },
    { label: "Step 3", inputType: "select" },
    { label: "Step 4", inputType: "textarea" },
  ];

  return (
    <div className={cn("flex w-full flex-col gap-4", className)}>
      <Stepper initialStep={0} steps={steps}>
        {steps.map((stepProps, index) => {
          const { label, inputType, placeholder, options } = stepContent[index];
          return (
            <Step key={label} {...stepProps}>
              <div className="h-40 flex items-center justify-center my-2 border bg-secondary text-primary rounded-md">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor={`${inputType}-1`}>{label}</Label>
                  {inputType === "grouped" ? (
                    <>
                      <Input
                        type="text"
                        id={`${inputType}-name`}
                        placeholder={stepContent[index].placeholders![0]}
                        value={formData.name}
                        onChange={handleChange}
                      />
                      <Input
                        type="tel"
                        id={`${inputType}-phone`}
                        placeholder={stepContent[index].placeholders![1]}
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </>
                  ) : inputType === "select" ? (
                    <select
                      id={inputType}
                      name={inputType}
                      onChange={handleChange}
                      className="border-gray-300 focus:ring-1 focus:ring-gray-400 focus:border-gray-400 w-full px-3 py-2 rounded-md"
                    >
                      {options?.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <Input
                      type={inputType}
                      id={inputType}
                      placeholder={placeholder}
                      value={formData[inputType as keyof typeof formData] as string}
                      onChange={handleChange}
                    />
                  )}
                </div>
              </div>
            </Step>
          );
        })}
        <Footer handleSubmit={handleSubmit} />
      </Stepper>
    </div>
  );
};

interface FooterProps {
  handleSubmit: () => void;
}

const Footer: React.FC<FooterProps> = ({ handleSubmit }) => {
  const {
    nextStep,
    prevStep,
    resetSteps,
    hasCompletedAllSteps,
    isLastStep,
    isOptionalStep,
    isDisabledStep,
  } = useStepper();

  return (
    <>
      {hasCompletedAllSteps && (
        <div className="h-40 flex items-center justify-center my-2 border bg-secondary text-primary rounded-md">
          <h1 className="text-xl">Woohoo! All steps completed! 🎉</h1>
        </div>
      )}
      <div className="w-full flex justify-end gap-2">
        {hasCompletedAllSteps ? (
          <Button size="sm" onClick={resetSteps}>
            Reset
          </Button>
        ) : (
          <>
            <Button
              disabled={isDisabledStep}
              onClick={prevStep}
              size="sm"
              variant="secondary"
            >
              Prev
            </Button>
            <Button size="sm" onClick={isLastStep ? handleSubmit : nextStep}>
              {isLastStep ? "Finish" : isOptionalStep ? "Skip" : "Next"}
            </Button>
          </>
        )}
      </div>
    </>
  );
};
