import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, BarChart2, Clock, ChevronRight, FileText, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard: React.FC = () => {
  // Mock data for the progress chart
  const progressData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Overall Score',
        data: [65, 68, 72, 75, 79, 82],
        borderColor: 'rgb(99, 102, 241)',
        backgroundColor: 'rgba(99, 102, 241, 0.5)',
        tension: 0.3,
      },
    ],
  };
  
  // Mock recent sermon submissions
  const recentSermons = [
    { id: 'sermon-123', title: 'The Good Shepherd', date: '2 days ago', score: 82, profileName: 'John Piper' },
    { id: 'sermon-122', title: 'Faith Over Fear', date: '1 week ago', score: 79, profileName: 'Billy Graham' },
    { id: 'sermon-121', title: 'Grace Abounding', date: '3 weeks ago', score: 75, profileName: 'Charles Spurgeon' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
          <div>
            <h1 className="text-3xl font-serif font-bold text-gray-900">Your Preaching Dashboard</h1>
            <p className="mt-2 text-gray-600">
              Track your progress and continue refining your preaching craft
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Link to="/submit" className="btn-primary">
              Evaluate New Sermon
              <ChevronRight size={20} />
            </Link>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[
            { 
              icon: <FileText className="h-8 w-8 text-indigo-500" />, 
              title: "5 Sermons Analyzed", 
              description: "Total sermons evaluated" 
            },
            { 
              icon: <Award className="h-8 w-8 text-amber-500" />, 
              title: "82/100", 
              description: "Your highest score" 
            },
            { 
              icon: <TrendingUp className="h-8 w-8 text-green-500" />, 
              title: "+17 points", 
              description: "Improvement in 6 months" 
            }
          ].map((stat, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-md p-6"
            >
              <div className="flex items-start">
                <div className="bg-gray-50 p-3 rounded-lg">{stat.icon}</div>
                <div className="ml-4">
                  <p className="text-2xl font-bold text-gray-900">{stat.title}</p>
                  <p className="text-sm text-gray-500">{stat.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Progress Chart */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-xl shadow-md p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Your Preaching Progress</h2>
                <div className="flex items-center text-sm text-indigo-700">
                  <span>Last 6 months</span>
                </div>
              </div>
              <div className="h-64">
                <Line 
                  data={progressData} 
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                      y: {
                        min: 50,
                        max: 100,
                        ticks: {
                          stepSize: 10,
                        }
                      }
                    }
                  }}
                />
              </div>
              <div className="mt-4 flex items-center justify-center text-sm text-gray-500">
                <TrendingUp size={16} className="text-green-500 mr-1" />
                <span>Your scores have improved by 17 points since you started</span>
              </div>
            </motion.div>
          </div>
          
          {/* Recent Activity */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-xl shadow-md p-6 h-full"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Evaluations</h2>
              <div className="space-y-4">
                {recentSermons.map((sermon) => (
                  <Link 
                    key={sermon.id} 
                    to={`/results/${sermon.id}`}
                    className="block border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-gray-900">{sermon.title}</h3>
                        <p className="text-sm text-gray-500">Compared to: {sermon.profileName}</p>
                        <p className="text-xs text-gray-400 mt-1 flex items-center">
                          <Clock size={12} className="mr-1" />
                          {sermon.date}
                        </p>
                      </div>
                      <div className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full text-sm font-medium">
                        {sermon.score}/100
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="mt-6 text-center">
                <Link to="/history" className="text-indigo-700 font-medium hover:underline flex items-center justify-center">
                  View All Evaluations
                  <ChevronRight size={16} className="ml-1" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          {/* Improvement Areas */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white rounded-xl shadow-md p-6"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-6">Focus Areas for Improvement</h2>
            <div className="space-y-4">
              {[
                { area: 'Sermon Application', score: 68, tip: 'Increase practical application examples by 30%' },
                { area: 'Delivery Pace', score: 72, tip: 'Reduce speaking speed by 10-15% in key sections' },
                { area: 'Illustrative Content', score: 75, tip: 'Add 2-3 more illustrations per sermon' }
              ].map((item, index) => (
                <div key={index} className="border-l-4 border-amber-500 pl-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium text-gray-900">{item.area}</h3>
                    <span className="text-amber-600 font-medium">{item.score}/100</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{item.tip}</p>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <Link to="/improvement-plan" className="btn-outline w-full justify-center">
                View Detailed Improvement Plan
              </Link>
            </div>
          </motion.div>
          
          {/* Resources */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white rounded-xl shadow-md p-6"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-6">Recommended Resources</h2>
            <div className="space-y-4">
              {[
                {
                  title: "The Art of Sermon Application",
                  type: "Video Course",
                  duration: "1h 45m"
                },
                {
                  title: "Mastering Sermon Delivery",
                  type: "Workshop",
                  duration: "2h 30m"
                },
                {
                  title: "Crafting Powerful Illustrations",
                  type: "E-Book",
                  pages: "124 pages"
                }
              ].map((resource, index) => (
                <a 
                  key={index} 
                  href="#" 
                  className="block bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors"
                >
                  <h3 className="font-medium text-indigo-700">{resource.title}</h3>
                  <div className="flex justify-between items-center mt-1 text-sm">
                    <span className="text-gray-600">{resource.type}</span>
                    <span className="text-gray-500">
                      {resource.duration || `${resource.pages}`}
                    </span>
                  </div>
                </a>
              ))}
            </div>
            <div className="mt-6">
              <Link to="/resources" className="btn-outline w-full justify-center">
                Browse All Resources
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;