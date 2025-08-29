import React, { useEffect, useState } from 'react';
import API from '../utils/api';

const GroupList = ({ dateOfTravel, source, destination, groupType }) => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [selectedGroupId, setSelectedGroupId] = useState(null);

  const fetchGroups = async () => {
    setLoading(true);
    setMessage('');
    try {
      const params = {
        dateOfTravel,
        source,
        destination,
      };
      if (groupType) params.groupType = groupType;

      const res = await API.get('/group/list', { params });
      setGroups(res.data);
      if (res.data.length === 0) {
        setMessage('No groups found for selected filters');
      }
    } catch (error) {
      setMessage('Error loading groups');
    }
    setLoading(false);
  };

  useEffect(() => {
    if (dateOfTravel && source && destination) fetchGroups();
  }, [dateOfTravel, source, destination, groupType]);

  const handleRequestJoin = async (groupId) => {
    try {
      await API.post(`/group/request-join/${groupId}`);
      alert('Join request sent');
      fetchGroups();
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to send join request');
    }
  };

  return (
    <div className="border p-4 rounded">
      <h3 className="text-xl mb-4">Available Groups</h3>
      {loading ? (
        <p>Loading...</p>
      ) : message ? (
        <p>{message}</p>
      ) : (
        <ul>
          {groups.map((group) => (
            <li
              key={group.groupId}
              className="border mb-2 p-2 rounded flex justify-between items-center"
            >
              <div>
                <p>
                  <strong>Creator:</strong> {group.creatorUsername}
                </p>
                <p>
                  Group of {group.groupSize}, {group.seatsLeft} seats left
                </p>
                <p>
                  Travel Time: {group.timeOfTravel}, Type: {group.groupType}
                </p>
              </div>
              <button
                onClick={() => handleRequestJoin(group.groupId)}
                className="bg-blue-600 text-white px-3 py-1 rounded"
              >
                Request to Join
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GroupList;