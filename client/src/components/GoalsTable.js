import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

const GoalsTable = () => {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingGoal, setEditingGoal] = useState(null);
  const [editForm, setEditForm] = useState({
    name: '',
    target_amount: '',
    current_amount: '',
    deadline: '',
  });
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [createForm, setCreateForm] = useState({
    name: '',
    target_amount: '',
    current_amount: '',
    deadline: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/goals')
      .then((response) => {
        if (response.status === 401) {
          throw new Error('Unauthorized');
        }
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setGoals(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Fetch error:', error);
  
        if (error.message === 'Unauthorized') {
          alert('Please log in to view/set your goals.');
          navigate('/login');
        } else {
          setError('Failed to fetch goals.');
        }
  
        setLoading(false);
      });
  }, [navigate]);

  const getTimeToDeadline = (deadline) => {
    const now = new Date();
    const end = new Date(deadline);
    const diff = end - now;
    if (diff <= 0) return 'Past due';

    const msInYear = 1000 * 60 * 60 * 24 * 365.25;
    const msInMonth = msInYear / 12;

    const years = Math.floor(diff / msInYear);
    const months = Math.floor((diff % msInYear) / msInMonth);

    return `${years > 0 ? `${years} year${years > 1 ? 's' : ''}` : ''}${
      years > 0 && months > 0 ? ', ' : ''
    }${months > 0 ? `${months} month${months > 1 ? 's' : ''}` : ''}`;
  };

  const getAchievementPercent = (current, target) => {
    if (target === 0) return '0%';
    const percent = Math.min((current / target) * 100, 100);
    return `${percent.toFixed(1)}%`;
  };

  const handleDelete = (goalId) => {
    if (!window.confirm('Are you sure you want to delete this goal?')) return;

    fetch(`/goals/${goalId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) throw new Error('Failed to delete');
        setGoals((prev) => prev.filter((goal) => goal.id !== goalId));
      })
      .catch((error) => {
        console.error('Delete error:', error);
        alert('Failed to delete goal.');
      });
  };

  const handleEdit = (goal) => {
    setEditingGoal(goal.id);
    setEditForm({
      name: goal.name,
      target_amount: goal.target_amount,
      current_amount: goal.current_amount,
      deadline: goal.deadline.split('T')[0],
    });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();

    fetch(`/goals/${editingGoal}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editForm),
    })
      .then((res) => {
        console.log(editForm);
        if (!res.ok) throw new Error('Failed to update');
        return res.json();
      })
      .then((updatedGoal) => {
        setGoals((prev) =>
          prev.map((goal) => (goal.id === updatedGoal.id ? updatedGoal : goal))
        );
        setEditingGoal(null);
      })
      .catch((err) => {
        console.error('Update failed:', err);
        alert('Failed to update goal.');
      });
  };

  const handleCreateSubmit = (e) => {
    e.preventDefault();
  
    fetch('/goals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(createForm),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to create');
        return res.json();
      })
      .then((newGoal) => {
        setGoals((prev) => [...prev, newGoal]);
        setCreateForm({
          name: '',
          target_amount: '',
          current_amount: '',
          deadline: '',
        });
        setShowCreateForm(false);
      })
      .catch((err) => {
        console.error('Create failed:', err);
        alert('Failed to create goal.');
      });
  };

  if (loading) return <div className="text-center text-xl text-teal-600">Loading...</div>;
  if (error) return <div className="text-center text-xl text-red-600">{error}</div>;

  return (
    <>
      <Navbar />
      <div className="bg-gradient-to-r from-teal-100 to-blue-100 min-h-screen p-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-teal-800 text-center mb-8">Investment Goals</h2>
          {goals.length > 0 ? (
            <div className="bg-white p-4 rounded-lg shadow-md overflow-x-auto">
              <table className="w-full table-auto text-sm">
                <thead className="bg-teal-500 text-white">
                  <tr>
                    <th className="px-4 py-2 text-left">Name</th>
                    <th className="px-4 py-2 text-left">Target Amount</th>
                    <th className="px-4 py-2 text-left">Current Amount</th>
                    <th className="px-4 py-2 text-left">Deadline</th>
                    <th className="px-4 py-2 text-left">Available Time</th>
                    <th className="px-4 py-2 text-left">Achievement</th>
                    <th className="px-4 py-2 text-left">Created At</th>
                    <th className="px-4 py-2 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {goals.map((goal) => {
                    const percent = getAchievementPercent(goal.current_amount, goal.target_amount);
                    return (
                      <tr key={goal.id} className="border-b hover:bg-teal-50">
                        <td className="px-4 py-2">{goal.name}</td>
                        <td className="px-4 py-2">${goal.target_amount.toLocaleString()}</td>
                        <td className="px-4 py-2">${goal.current_amount.toLocaleString()}</td>
                        <td className="px-4 py-2">{new Date(goal.deadline).toLocaleDateString()}</td>
                        <td className="px-4 py-2 text-teal-700">{getTimeToDeadline(goal.deadline)}</td>
                        <td className="px-4 py-2">
                          <div className="w-full bg-gray-200 rounded-full h-4">
                            <div
                              className="bg-teal-500 h-4 rounded-full"
                              style={{ width: percent }}
                            ></div>
                          </div>
                          <p className="text-sm text-teal-700 mt-1">{percent}</p>
                        </td>
                        <td className="px-4 py-2">{new Date(goal.created_at).toLocaleString()}</td>
                        <td className="px-4 py-2 flex gap-2">
                          <button
                            onClick={() => handleEdit(goal)}
                            className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(goal.id)}
                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              
          </div>
        ) : (
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <p className="text-lg text-gray-600 mb-4">
              You have not set any goals.
            </p>
            
          </div>
        )}

        <div className="text-right mt-4">
            <button
              onClick={() => setShowCreateForm((prev) => !prev)}
              className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700"
            >
              {showCreateForm ? 'Cancel' : '+ Add Goal'}
            </button>
        </div>

          {showCreateForm && (
            <form
              onSubmit={handleCreateSubmit}
              className="mt-4 bg-white p-4 rounded-lg shadow-md flex flex-col gap-4"
            >
              <input
                type="text"
                placeholder="Goal Name"
                value={createForm.name}
                onChange={(e) => setCreateForm({ ...createForm, name: e.target.value })}
                className="border p-2 rounded"
                required
              />
              <input
                type="number"
                placeholder="Target Amount"
                value={createForm.target_amount}
                onChange={(e) =>
                  setCreateForm({ ...createForm, target_amount: parseFloat(e.target.value) })
                }
                className="border p-2 rounded"
                required
              />
              <input
                type="number"
                placeholder="Current Amount"
                value={createForm.current_amount}
                onChange={(e) =>
                  setCreateForm({ ...createForm, current_amount: parseFloat(e.target.value) })
                }
                className="border p-2 rounded"
              />
              <input
                type="date"
                placeholder="Deadline"
                value={createForm.deadline}
                onChange={(e) => setCreateForm({ ...createForm, deadline: e.target.value })}
                className="border p-2 rounded"
                required
              />
              <button
                type="submit"
                className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700"
              >
                Submit Goal
              </button>
            </form>
          )}

          {editingGoal && (
            <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-teal-700">Edit Goal</h3>
              <form onSubmit={handleEditSubmit} className="flex flex-col gap-4">
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="border p-2 rounded"
                  placeholder="Goal Name"
                />
                <input
                  type="number"
                  value={editForm.target_amount}
                  onChange={(e) =>
                    setEditForm({ ...editForm, target_amount: parseFloat(e.target.value) })
                  }
                  className="border p-2 rounded"
                  placeholder="Target Amount"
                />
                <input
                  type="number"
                  value={editForm.current_amount}
                  onChange={(e) =>
                    setEditForm({ ...editForm, current_amount: parseFloat(e.target.value) })
                  }
                  className="border p-2 rounded"
                  placeholder="Current Amount"
                />
                <input
                  type="date"
                  value={editForm.deadline}
                  onChange={(e) => setEditForm({ ...editForm, deadline: e.target.value })}
                  className="border p-2 rounded"
                />
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingGoal(null)}
                    className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default GoalsTable;