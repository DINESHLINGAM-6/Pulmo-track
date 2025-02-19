"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { Button } from '@/components/ui/button';

export default function PatientDemographics() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    age: '',
    gender: '',
    documents: [],
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    router.prefetch('/reports');
  }, [router]);

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({ ...prev, documents: files }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, phone, age, gender, documents } = formData;

    if (!name || !phone || !age || !gender || documents.length === 0) {
      alert('Please fill out all fields and upload at least one document.');
      return;
    }

    setLoading(true);
    try {
      const formPayload = new FormData();
      formPayload.append('name', name);
      formPayload.append('phone', phone);
      formPayload.append('age', age);
      formPayload.append('gender', gender);
      documents.forEach((doc, i) => {
        formPayload.append(`document_${i}`, doc);
      });

      const res = await fetch('/api/patient-demographics', {
        method: 'POST',
        body: formPayload,
      });

      if (!res.ok) {
        throw new Error('Submission failed');
      }
      setMessage('Patient demographics submitted successfully!');
    } catch (error) {
      console.error(error);
      alert('Error submitting patient details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-blue-600">Patient Demographics</h1>
      {message && <p className="text-green-600 mb-4">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          placeholder="Full Name"
          onChange={(e) => handleChange('name', e.target.value)}
          className="w-full p-3 border rounded"
          required
        />
        <PhoneInput
          country={'us'}
          value={formData.phone}
          onChange={(value) => handleChange('phone', value)}
          inputClass="w-full p-3 border rounded"
          required
        />
        <input
          name="age"
          placeholder="Age (in years)"
          onChange={(e) => handleChange('age', e.target.value)}
          className="w-full p-3 border rounded"
          type="number"
          min="1"
          max="120"
          required
        />
        <div className="flex gap-4 items-center">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="gender"
              value="Male"
              onChange={(e) => handleChange('gender', e.target.value)}
              required
            /> Male
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="gender"
              value="Female"
              onChange={(e) => handleChange('gender', e.target.value)}
            /> Female
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="gender"
              value="Other"
              onChange={(e) => handleChange('gender', e.target.value)}
            /> Other
          </label>
        </div>
        <input
          type="file"
          multiple
          onChange={handleFileUpload}
          className="w-full p-3 border rounded"
          required
        />
        <Button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Submit'}
        </Button>
      </form>
      <Button
        onClick={() => router.push('/reports')}
        className="mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
      >
        Go to Reports
      </Button>
    </div>
  );
}
