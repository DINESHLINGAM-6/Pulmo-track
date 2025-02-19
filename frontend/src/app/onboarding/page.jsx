import OnboardingForm from "@/components/OnboardingForm";

export default function Onboarding() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Patient Demographics
      </h1>
      <OnboardingForm />
    </div>
  );
}
