import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Award, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { profiles } from '../data/preachingProfiles';

const ProfileSelection: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const navigate = useNavigate();
  
  const categories = [
    { id: 'all', name: 'All Profiles' },
    { id: 'expository', name: 'Expository' },
    { id: 'narrative', name: 'Narrative' },
    { id: 'topical', name: 'Topical' },
    { id: 'evangelistic', name: 'Evangelistic' }
  ];
  
  const filteredProfiles = profiles.filter(profile => {
    const matchesSearch = profile.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          profile.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || profile.categories.includes(selectedCategory);
    
    return matchesSearch && matchesCategory;
  });
  
  const handleProfileSelect = (profileId: string) => {
    // In a real app, we'd store the selected profile in state/context
    // and then redirect to the sermon submission page
    navigate('/submit', { state: { selectedProfileId: profileId } });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900">
          Select Your Preaching <span className="text-indigo-700">Benchmark</span>
        </h1>
        <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
          Choose a renowned preacher whose style and approach resonates with you or aligns with your goals.
        </p>
      </motion.div>
      
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/4 space-y-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search profiles..."
              className="form-input pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-4">
            <h3 className="font-medium text-gray-900 mb-3">Filter by Style</h3>
            <div className="space-y-2">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                    selectedCategory === category.id 
                      ? 'bg-indigo-100 text-indigo-900' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
          
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
            <h3 className="font-medium text-amber-800 flex items-center">
              <Award className="h-5 w-5 mr-2" /> Pro Tip
            </h3>
            <p className="mt-2 text-sm text-amber-700">
              Select a preacher whose style complements your natural strengths while helping you grow in areas where you'd like to improve.
            </p>
          </div>
        </div>
        
        <div className="w-full md:w-3/4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProfiles.map((profile, index) => (
              <motion.div
                key={profile.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="card hover:border-indigo-300 hover:border-2 cursor-pointer"
                onClick={() => handleProfileSelect(profile.id)}
              >
                <div className="flex flex-col h-full">
                  <div className="flex-1">
                    <img 
                      src={profile.imageUrl} 
                      alt={profile.name} 
                      className="w-full h-48 object-cover rounded-lg mb-4" 
                    />
                    <h3 className="text-xl font-bold text-gray-900">{profile.name}</h3>
                    <div className="flex flex-wrap gap-2 my-2">
                      {profile.categories.map(category => (
                        <span 
                          key={category} 
                          className="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs rounded-full"
                        >
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </span>
                      ))}
                    </div>
                    <p className="text-gray-600 line-clamp-3">{profile.description}</p>
                  </div>
                  <button className="mt-4 text-indigo-700 font-medium flex items-center gap-1 hover:underline">
                    Select profile <ChevronRight size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
          
          {filteredProfiles.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No profiles match your search criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileSelection;