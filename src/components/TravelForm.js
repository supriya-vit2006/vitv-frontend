import React, { useState, useEffect } from 'react';
import API from '../utils/api';

const TravelForm = ({ onTravelCreated }) => {
  const [dateOfTravel, setDateOfTravel] = useState('');
  const [timeOfTravel, setTimeOfTravel] = useState('');
  const [source, setSource] = useState('VIT');
  const [destination, setDestination] = useState('Katpadi');
  const [groupSize, setGroupSize] = useState(2);
  const [groupType, setGroupType] = useState('Girls Only');
  const [message, setMessage] = useState('');
  const [existingEntry, setExistingEntry] = useState(null);

  // Set min and max dates for date picker
  const today = new Date().toISOString().split('T')[0];
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 15);
  const maxDateStr = maxDate.toISOString().split('T')[0];

  useEffect(() => {
    if (dateOfTravel) {
      API.get('/travel/my')
        .then((res) => {
          const existing = res.data.find(
            (entry) => new Date(entry.dateOfTravel).toISOString().split('T')[0] === dateOfTravel
          );
          if (existing) {
            setExistingEntry(existing);
            setTimeOfTravel(existing.timeOfTravel);
            setSource(existing.source);
            setDestination(existing.destination);
            setGroupSize(existing.groupSize);
            setGroupType(existing.groupType);
          } else {
            setExistingEntry(null);
          }
        })
        .catch(() => setExistingEntry(null));
    }
  }, [dateOfTravel]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (source === destination) {
      setMessage('Source and destination cannot be the same.');
      return;
    }
    try {
      await API.post('/travel/create', {
        dateOfTravel,
        timeOfTravel,
        source,
        destination,
        groupSize,
        groupType,
      });
      setMessage('Travel info saved successfully.');
      onTravelCreated && onTravelCreated();
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error saving travel info');
    }
  };

  return (
    <div className="border p-4 rounded mb-6">
      <h3 className="text-xl mb-4">{existingEntry ? 'Edit Travel Info' : 'Create Travel Info'}</h3>
      {message && <p className="mb-2 text-red-600">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="dateOfTravel" className="block font-semibold mb-1">
            Date of Travel:
          </label>
          <input
            type="date"
            id="dateOfTravel"
            value={dateOfTravel}
            min={today}
            max={maxDateStr}
            onChange={(e) => setDateOfTravel(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="timeOfTravel" className="block font-semibold mb-1">
            Time of Travel (HH:MM):
          </label>
          <input
            type="time"
            id="timeOfTravel"
            value={timeOfTravel}
            onChange={(e) => setTimeOfTravel(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="source" className="block font-semibold mb-1">
            Source:
          </label>
          <select
            id="source"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="VIT">VIT</option>
            <option value="Katpadi">Katpadi</option>
            <option value="Chennai Airport">Chennai Airport</option>
          </select>
        </div>
        <div>
          <label htmlFor="destination" className="block font-semibold mb-1">
            Destination:
          </label>
          <select
            id="destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="VIT">VIT</option>
            <option value="Katpadi">Katpadi</option>
            <option value="Chennai Airport">Chennai Airport</option>
          </select>
        </div>
        <div>
          <label htmlFor="groupSize" className="block font-semibold mb-1">
            Group Size:
          </label>
          <select
            id="groupSize"
            value={groupSize}
            onChange={(e) => setGroupSize(Number(e.target.value))}
            className="w-full p-2 border rounded"
          >
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
          </select>
        </div>
        <div>
          <label htmlFor="groupType" className="block font-semibold mb-1">
            Group Type:
          </label>
          <select
            id="groupType"
            value={groupType}
            onChange={(e) => setGroupType(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="Girls Only">Girls Only</option>
            <option value="Boys Only">Boys Only</option>
            <option value="Mixed Group">Mixed Group</option>
          </select>
        </div>
        <button type="submit" className="bg-green-600 text-white p-2 rounded w-full">
          {existingEntry ? 'Update Travel Info' : 'Create Travel Info'}
        </button>
      </form>
    </div>
  );
};

export default TravelForm;