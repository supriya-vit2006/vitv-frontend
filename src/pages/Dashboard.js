import React, { useState } from 'react';
import TravelForm from '../components/TravelForm';
import GroupList from '../components/GroupList';
import ChatRoom from '../components/ChatRoom';
import API from '../utils/api';

const Dashboard = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSource, setSelectedSource] = useState('VIT');
  const [selectedDestination, setSelectedDestination] = useState('Katpadi');
  const [selectedGroupType, setSelectedGroupType] = useState('');
  const [joinedGroupId, setJoinedGroupId] = useState(null);

  // Once travel info is created, user can create a group from travel entry
  const createGroupFromTravel = async () => {
    if (!selectedDate) return alert('Select date to create group');
    try {
      const res = await API.post('/group/create-from-travel', { dateOfTravel: selectedDate });
      alert('Group created successfully');
      setJoinedGroupId(res.data._id);
    } catch (error) {
      alert(error.response?.data?.message || 'Error creating group');
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-6 p-4">
      <h2 className="text-3xl mb-6">Dashboard</h2>

      <TravelForm
        onTravelCreated={() => {
          alert('Travel info saved.');
        }}
      />

      <div className="mb-6">
        <label className="font-semibold mr-2">Select Date (for groups):</label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="p-2 border rounded mr-4"
        />
        <label className="font-semibold mr-2">Source:</label>
        <select
          value={selectedSource}
          onChange={(e) => setSelectedSource(e.target.value)}
          className="p-2 border rounded mr-4"
        >
          <option value="VIT">VIT</option>
          <option value="Katpadi">Katpadi</option>
          <option value="Chennai Airport">Chennai Airport</option>
        </select>
        <label className="font-semibold mr-2">Destination:</label>
        <select
          value={selectedDestination}
          onChange={(e) => setSelectedDestination(e.target.value)}
          className="p-2 border rounded mr-4"
        >
          <option value="VIT">VIT</option>
          <option value="Katpadi">Katpadi</option>
          <option value="Chennai Airport">Chennai Airport</option>
        </select>
        <label className="font-semibold mr-2">Group Type:</label>
        <select
          value={selectedGroupType}
          onChange={(e) => setSelectedGroupType(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">All</option>
          <option value="Girls Only">Girls Only</option>
          <option value="Boys Only">Boys Only</option>
          <option value="Mixed Group">Mixed Group</option>
        </select>
      </div>

      <button
        onClick={createGroupFromTravel}
        className="mb-4 bg-green-700 text-white px-4 py-2 rounded"
        disabled={!selectedDate}
      >
        Create Group from Travel Info
      </button>

      <GroupList
        dateOfTravel={selectedDate}
        source={selectedSource}
        destination={selectedDestination}
        groupType={selectedGroupType}
      />

      {joinedGroupId && (
        <div className="mt-6">
          <h3 className="text-2xl mb-2">Group Chat</h3>
          <ChatRoom groupId={joinedGroupId} />
        </div>
      )}
    </div>
  );
};

export default Dashboard;