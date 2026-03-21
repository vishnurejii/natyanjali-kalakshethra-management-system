import React, { useState, useEffect } from 'react';
import api from '../../api';
import { BookOpen, Plus, Edit2, Trash2 } from 'lucide-react';

const CourseManagement = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data } = await api.get('/courses');
        setCourses(data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  if (loading) return <div className="p-4">Loading Courses...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Course Management</h2>
        <button className="flex items-center gap-2 bg-cyan-600 text-white px-4 py-2 rounded-lg hover:bg-cyan-700 transition-colors">
          <Plus size={18} />
          Add Course
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map(course => (
          <div key={course._id} className="bg-white rounded-xl shadow-sm border overflow-hidden hover:shadow-md transition-shadow">
            <div className="h-40 bg-slate-200 relative">
              {course.image ? (
                <img src={course.image} alt={course.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <BookOpen size={48} />
                </div>
              )}
              <div className="absolute top-2 right-2 flex gap-2">
                <button className="p-2 bg-white/90 rounded-full text-indigo-600 shadow-sm hover:bg-white"><Edit2 size={16} /></button>
                <button className="p-2 bg-white/90 rounded-full text-rose-600 shadow-sm hover:bg-white"><Trash2 size={16} /></button>
              </div>
            </div>
            <div className="p-5">
              <h3 className="font-bold text-gray-900 mb-1">{course.name}</h3>
              <p className="text-sm text-gray-500 mb-4 line-clamp-2">{course.description}</p>
              <div className="flex justify-between items-center pt-4 border-t">
                <span className="text-xs font-bold text-gray-400 uppercase">{course.duration}</span>
                <span className="text-lg font-bold text-indigo-600">₹ {course.fee || 0}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseManagement;
