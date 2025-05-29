import React from 'react';
import { useLocation, Link, useParams } from 'react-router-dom';
import { FileText, Award, AlertTriangle, ChevronRight, Download, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Radar, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { profiles } from '../data/preachingProfiles';

// Register ChartJS components
ChartJS.register(
  RadialLinearScale, 
  PointElement, 
  LineElement, 
  Filler, 
  Tooltip, 
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

interface FeedbackItem {
  type: 'strength' | 'improvement';
  title: string;
  description: string;
}

const Results: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const sermonData = location.state?.sermonData || {};
  const profileId = location.state?.profileId || profiles[0].id;
  const selectedProfile = profiles.find(p => p.id === profileId) || profiles[0];
  
  // Mock evaluation scores - in a real app, these would come from the analysis
  const evaluationScores = {
    structure: 78,
    biblicalAccuracy: 85,
    clarity: 82,
    relevance: 70,
    delivery: 68,
    engagement: 75,
  };
  
  const comparisonData = {
    // Radar chart data showing the comparison between the user's sermon and the selected profile
    radar: {
      labels: ['Structure', 'Biblical Accuracy', 'Clarity', 'Relevance', 'Delivery', 'Engagement'],
      datasets: [
        {
          label: 'Your Sermon',
          data: Object.values(evaluationScores),
          backgroundColor: 'rgba(99, 102, 241, 0.2)',
          borderColor: 'rgba(99, 102, 241, 1)',
          borderWidth: 2,
          pointBackgroundColor: 'rgba(99, 102, 241, 1)',
        },
        {
          label: selectedProfile.name,
          data: [92, 95, 90, 88, 93, 94], // Mock ideal scores for the selected profile
          backgroundColor: 'rgba(234, 179, 8, 0.2)',
          borderColor: 'rgba(234, 179, 8, 1)',
          borderWidth: 2,
          pointBackgroundColor: 'rgba(234, 179, 8, 1)',
        },
      ],
    },
    // Bar chart data showing sermon metrics
    bar: {
      labels: ['Avg Sentence Length', 'Illustration Usage', 'Scripture References', 'Theological Depth', 'Application Points'],
      datasets: [
        {
          label: 'Your Sermon',
          data: [25, 6, 12, 65, 4],
          backgroundColor: 'rgba(99, 102, 241, 0.7)',
        },
        {
          label: selectedProfile.name,
          data: [20, 8, 15, 80, 6],
          backgroundColor: 'rgba(234, 179, 8, 0.7)',
        },
      ],
    },
  };
  
  // Mock feedback - in a real app, this would be generated based on the analysis
  const feedback: FeedbackItem[] = [
    {
      type: 'strength',
      title: 'Excellent Biblical Foundation',
      description: 'Your sermon demonstrates a strong foundation in scripture, with clear references and thoughtful exegesis similar to how ' + selectedProfile.name + ' grounds his messages.'
    },
    {
      type: 'strength',
      title: 'Clear Main Points',
      description: 'The sermon has well-articulated main points that flow logically, making it easy for listeners to follow along.'
    },
    {
      type: 'improvement',
      title: 'Consider More Illustrations',
      description: selectedProfile.name + ' typically uses 7-9 illustrations per sermon to make abstract concepts concrete. Your sermon used 6, consider adding more relatable examples.'
    },
    {
      type: 'improvement',
      title: 'Enhance Transitional Phrases',
      description: 'The transitions between your main points could be strengthened to help listeners follow your sermon\'s progression more easily.'
    },
    {
      type: 'improvement',
      title: 'Increase Application Focus',
      description: 'While your theological exposition is strong, ' + selectedProfile.name + ' typically dedicates 25-30% of sermon time to practical application, compared to your 15%.'
    }
  ];
  
  // Calculate overall score - weighted average of all evaluation scores
  const overallScore = Math.round(
    Object.values(evaluationScores).reduce((sum, score) => sum + score, 0) / 
    Object.values(evaluationScores).length
  );
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-serif font-bold text-gray-900">Sermon Evaluation Results</h1>
            <p className="mt-2 text-gray-600 flex items-center">
              <FileText size={16} className="mr-1" />
              Sermon: {sermonData.title || "Untitled Sermon"}
            </p>
            <p className="mt-1 text-gray-600 flex items-center">
              <Award size={16} className="mr-1" />
              Compared to: {selectedProfile.name}
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex gap-2">
            <button className="btn-outline">
              <Download size={16} />
              Export PDF
            </button>
            <button className="btn-outline">
              <Share2 size={16} />
              Share
            </button>
          </div>
        </div>
      </motion.div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column - Overall score and radar chart */}
        <div className="lg:col-span-1 space-y-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-md p-6"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-4">Overall Score</h2>
            <div className="flex items-center justify-center">
              <div className="relative w-40 h-40">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-4xl font-bold text-indigo-700">{overallScore}</span>
                </div>
                <svg viewBox="0 0 36 36" className="w-full h-full">
                  <path
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#E2E8F0"
                    strokeWidth="3"
                  />
                  <path
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#4338CA"
                    strokeWidth="3"
                    strokeDasharray={`${overallScore}, 100`}
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>
            
            <div className="mt-6">
              <h3 className="font-medium text-gray-900">Performance Rating</h3>
              <p className="text-gray-600">
                {overallScore >= 90 ? 'Exceptional' : 
                overallScore >= 80 ? 'Excellent' : 
                overallScore >= 70 ? 'Very Good' : 
                overallScore >= 60 ? 'Good' : 
                'Needs Improvement'}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Your sermon was evaluated against {selectedProfile.name}'s preaching style and standards.
              </p>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white rounded-xl shadow-md p-6"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-4">Style Comparison</h2>
            <div className="h-64">
              <Radar 
                data={comparisonData.radar} 
                options={{
                  scales: {
                    r: {
                      min: 0,
                      max: 100,
                      ticks: {
                        stepSize: 20,
                        showLabelBackdrop: false,
                      }
                    }
                  },
                  plugins: {
                    legend: {
                      position: 'bottom',
                    }
                  }
                }}
              />
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-xl shadow-md p-6"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-4">Sermon Metrics</h2>
            <div className="h-80">
              <Bar 
                data={comparisonData.bar}
                options={{
                  responsive: true,
                  scales: {
                    y: {
                      beginAtZero: true
                    }
                  },
                  plugins: {
                    legend: {
                      position: 'bottom',
                    }
                  }
                }}
              />
            </div>
          </motion.div>
        </div>
        
        {/* Right column - Detailed feedback */}
        <div className="lg:col-span-2 space-y-8">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-md p-6"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-4">Detailed Feedback</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-medium text-green-700 flex items-center">
                  <Award className="h-5 w-5 mr-2" />
                  Strengths
                </h3>
                <div className="mt-3 space-y-4">
                  {feedback.filter(item => item.type === 'strength').map((item, index) => (
                    <div key={index} className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
                      <h4 className="font-medium text-green-800">{item.title}</h4>
                      <p className="mt-1 text-green-700">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-medium text-amber-700 flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2" />
                  Areas for Improvement
                </h3>
                <div className="mt-3 space-y-4">
                  {feedback.filter(item => item.type === 'improvement').map((item, index) => (
                    <div key={index} className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg">
                      <h4 className="font-medium text-amber-800">{item.title}</h4>
                      <p className="mt-1 text-amber-700">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white rounded-xl shadow-md p-6"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-4">Category Breakdown</h2>
            
            <div className="space-y-4">
              {Object.entries(evaluationScores).map(([key, score], index) => {
                const formattedKey = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
                const scoreColor = 
                  score >= 90 ? 'bg-green-500' :
                  score >= 80 ? 'bg-green-400' :
                  score >= 70 ? 'bg-yellow-400' :
                  score >= 60 ? 'bg-yellow-500' :
                  'bg-red-500';
                  
                return (
                  <div key={key}>
                    <div className="flex justify-between mb-1">
                      <span className="font-medium text-gray-700">{formattedKey}</span>
                      <span className="font-medium text-gray-900">{score}/100</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className={`${scoreColor} h-2.5 rounded-full`} 
                        style={{ width: `${score}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-xl shadow-md p-6"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-4">Recommended Resources</h2>
            
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <h3 className="font-medium text-indigo-700">Structure Improvement</h3>
                <p className="text-gray-600 mt-1">Review "{selectedProfile.name}'s Approach to Sermon Structure" to improve your sermon flow.</p>
                <a href="#" className="mt-2 text-indigo-600 font-medium flex items-center hover:underline">
                  Access Resource <ChevronRight size={16} />
                </a>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <h3 className="font-medium text-indigo-700">Illustration Masterclass</h3>
                <p className="text-gray-600 mt-1">Learn how to craft compelling illustrations that resonate with your congregation.</p>
                <a href="#" className="mt-2 text-indigo-600 font-medium flex items-center hover:underline">
                  Access Resource <ChevronRight size={16} />
                </a>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <h3 className="font-medium text-indigo-700">Application Techniques</h3>
                <p className="text-gray-600 mt-1">Practical strategies for increasing the application component in your sermons.</p>
                <a href="#" className="mt-2 text-indigo-600 font-medium flex items-center hover:underline">
                  Access Resource <ChevronRight size={16} />
                </a>
              </div>
            </div>
          </motion.div>
          
          <div className="flex justify-between">
            <Link to="/profiles" className="btn-outline">
              Change Profile
            </Link>
            <Link to="/submit" className="btn-primary">
              Submit Another Sermon
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;