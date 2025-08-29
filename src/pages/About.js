import React, { useEffect, useState } from 'react';
import API from '../utils/api';

const About = () => {
  const [aboutData, setAboutData] = useState({ text: '', supportContact: '' });

  useEffect(() => {
    API.get('/about').then((res) => setAboutData(res.data));
  }, []);

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 border rounded">
      <h2 className="text-2xl mb-4">About</h2>
      <p>{aboutData.text}</p>
      <p className="mt-2">{aboutData.supportContact}</p>
    </div>
  );
};

export default About;