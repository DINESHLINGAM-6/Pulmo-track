"use client";
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/nextjs';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

export default function PatientDemographics() {
  const router = useRouter();

  useEffect(() => {
    router.prefetch('/report/page');
  }, [router]);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    age: '',
    gender: '',
    documents: [],
  });
  const [message, setMessage] = useState('');

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({ ...prev, documents: files }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, phone, age, gender, documents } = formData;

    if (!name || !phone || !age || !gender || documents.length === 0) {
      alert('Please fill out all fields including a valid phone number and upload at least one document before submitting.');
      return;
    }

    console.log('Form Data:', formData);
    setMessage('Your patient demographics have been successfully submitted!');
  };

  useEffect(() => {
    if (message) {
      console.log(message);
    }
  }, [message]);

  return (
    <>
      <SignedIn>
        <div className="p-8 bg-white shadow-lg rounded-lg h-screen w-full max-w-4xl mx-auto overflow-auto min-h-screen">
          <h1 className="text-4xl font-bold mb-6 text-center text-primary">Patient Demographics</h1>
          {message && <p className="text-green-600 text-center mb-4">{message}</p>}
          <form onSubmit={handleSubmit} className="space-y-6">
            <input name="name" placeholder="Full Name" onChange={(e) => handleChange('name', e.target.value)} className="w-full p-3 border rounded-lg" required />
            <PhoneInput country={'us'} value={formData.phone} onChange={(value) => handleChange('phone', value)} inputClass="w-full p-3 border rounded-lg" required/>
            <input name="age" placeholder="Age (in years)" onChange={(e) => handleChange('age', e.target.value)} className="w-full p-3 border rounded-lg" type="number" min="1" max="120" required />
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <label className="flex items-center gap-2">
                <input type="radio" name="gender" value="Male" onChange={(e) => handleChange('gender', e.target.value)} required /> Male
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="gender" value="Female" onChange={(e) => handleChange('gender', e.target.value)} /> Female
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="gender" value="Other" onChange={(e) => handleChange('gender', e.target.value)} /> Other
              </label>
            </div>
            <input type="file" multiple onChange={handleFileUpload} className="w-full p-3 border rounded-lg" required />
            <Button type="submit" className="w-full bg-primary text-white py-4 text-lg rounded-xl hover:bg-primary-dark shadow-md">Submit</Button>
          </form>
          <Button onClick={() => router.push('/report/page')} className="fixed bottom-4 right-4 bg-gradient-to-r from-blue-500 to-green-400 text-white py-2 px-4 text-sm rounded-lg hover:from-blue-600 hover:to-green-500 shadow-md mt-4">Clinical Documentation</Button>
        </div>
      </SignedIn>
      <SignedOut>
        {typeof window !== "undefined" && <RedirectToSignIn />}
      </SignedOut>
    </>
  );
}
