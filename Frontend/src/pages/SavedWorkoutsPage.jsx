import { Play, Trash2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const SavedWorkoutsPage = () => {
  const [savedWorkouts, setSavedWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSavedWorkouts();
  }, []);

  const fetchSavedWorkouts = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/saved-workouts', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      if (data.success) {
        setSavedWorkouts(data.data);
      }
    } catch (error) {
      console.error('Error fetching saved workouts:', error);
      toast.error('Failed to fetch saved workouts');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveWorkout = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/api/saved-workouts/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (response.ok) {
        toast.success('Workout removed from saved list');
        setSavedWorkouts(prev => prev.filter(workout => workout._id !== id));
      } else {
        const data = await response.json();
        toast.error(data.message || 'Failed to remove workout');
      }
    } catch (error) {
      console.error('Error removing workout:', error);
      toast.error('Failed to remove workout');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 px-4">
        <div className="container mx-auto">
          <div className="text-center">Loading saved workouts...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 px-4">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-8">Saved Workouts</h1>

        {savedWorkouts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No saved workouts yet.</p>
            <p className="text-gray-500 mt-2">Save workouts from the workout page to see them here.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedWorkouts.map((workout) => (
              <div key={workout._id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <img
                  src={workout.image}
                  alt={workout.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-green-500 font-medium">{workout.category}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500">{workout.duration}</span>
                      <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-600">
                        {workout.level}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{workout.title}</h3>
                  <p className="text-gray-600 mb-4">{workout.description}</p>
                  
                  <div className="flex space-x-4">
                    <button 
                      className="flex-1 flex items-center justify-center bg-red-100 text-red-700 py-2 rounded-lg hover:bg-red-200 transition-colors"
                      onClick={() => handleRemoveWorkout(workout._id)}
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Remove
                    </button>
                    <button 
                      className="flex-1 flex items-center justify-center bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors"
                      onClick={() => {/* Handle starting workout */}}
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Start
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedWorkoutsPage; 