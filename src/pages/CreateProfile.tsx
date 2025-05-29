import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Upload, AlertCircle, Plus, X, File, Mic, Youtube } from 'lucide-react';
import { motion } from 'framer-motion';
import ReactPlayer from 'react-player';
import WaveSurfer from 'wavesurfer.js';

interface SermonSubmission {
  id: string;
  title: string;
  scripture: string;
  content?: string;
  file?: File;
  mediaUrl?: string;
  type: 'text' | 'document' | 'audio' | 'video';
}

interface ProfileFormData {
  name: string;
  description: string;
  categories: string[];
  strengths: string[];
  era: string;
  imageUrl: string;
}

const CreateProfile: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<ProfileFormData>();
  const navigate = useNavigate();
  const [sermons, setSermons] = useState<SermonSubmission[]>([]);
  const [currentSermon, setCurrentSermon] = useState<SermonSubmission | null>(null);
  const [showSermonForm, setShowSermonForm] = useState(false);
  const [uploadType, setUploadType] = useState<'text' | 'document' | 'audio' | 'video'>('text');

  const onSubmit = async (data: ProfileFormData) => {
    // In a real app, this would send the data and sermons to an API
    console.log('Profile data:', data);
    console.log('Example sermons:', sermons);
    navigate('/profiles');
  };

  const preachingCategories = [
    'expository',
    'topical',
    'narrative',
    'evangelistic',
    'theological',
    'practical',
    'apologetic',
    'cultural'
  ];

  const handleAddSermon = () => {
    setShowSermonForm(true);
    setCurrentSermon({
      id: Date.now().toString(),
      title: '',
      scripture: '',
      type: uploadType
    });
  };

  const handleSermonSubmit = (sermon: SermonSubmission) => {
    setSermons([...sermons, sermon]);
    setShowSermonForm(false);
    setCurrentSermon(null);
  };

  const handleRemoveSermon = (id: string) => {
    setSermons(sermons.filter(sermon => sermon.id !== id));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0] && currentSermon) {
      const file = e.target.files[0];
      setCurrentSermon({
        ...currentSermon,
        file,
        type: uploadType
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900">
            Create Preaching Profile
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Add a new preaching profile with example sermons to use as a benchmark
          </p>
        </div>

        <div className="bg-white shadow-md rounded-xl p-6 md:p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label htmlFor="name" className="form-label">Preacher Name</label>
              <input
                type="text"
                id="name"
                className={`form-input ${errors.name ? 'border-red-500' : ''}`}
                {...register("name", { required: true })}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">Name is required</p>
              )}
            </div>

            <div>
              <label htmlFor="description" className="form-label">Description</label>
              <textarea
                id="description"
                rows={4}
                className={`form-input ${errors.description ? 'border-red-500' : ''}`}
                {...register("description", { required: true, minLength: 100 })}
              ></textarea>
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">
                  Please provide a detailed description (minimum 100 characters)
                </p>
              )}
            </div>

            <div>
              <label className="form-label">Preaching Categories</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {preachingCategories.map((category) => (
                  <label key={category} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      value={category}
                      {...register("categories", { required: true })}
                      className="form-checkbox text-indigo-600"
                    />
                    <span className="text-gray-700 capitalize">{category}</span>
                  </label>
                ))}
              </div>
              {errors.categories && (
                <p className="text-red-500 text-sm mt-1">
                  Select at least one category
                </p>
              )}
            </div>

            <div>
              <label htmlFor="strengths" className="form-label">Key Strengths</label>
              <input
                type="text"
                id="strengths"
                className="form-input"
                placeholder="Enter strengths separated by commas"
                {...register("strengths", { required: true })}
              />
              {errors.strengths && (
                <p className="text-red-500 text-sm mt-1">
                  Please list key strengths
                </p>
              )}
            </div>

            <div>
              <label htmlFor="era" className="form-label">Era</label>
              <select
                id="era"
                className="form-input"
                {...register("era", { required: true })}
              >
                <option value="">Select an era</option>
                <option value="Contemporary">Contemporary</option>
                <option value="20th Century">20th Century</option>
                <option value="19th Century">19th Century</option>
                <option value="Historical">Historical</option>
              </select>
              {errors.era && (
                <p className="text-red-500 text-sm mt-1">Please select an era</p>
              )}
            </div>

            <div>
              <label htmlFor="imageUrl" className="form-label">Profile Image URL</label>
              <input
                type="url"
                id="imageUrl"
                className="form-input"
                placeholder="https://example.com/image.jpg"
                {...register("imageUrl", { required: true })}
              />
              {errors.imageUrl && (
                <p className="text-red-500 text-sm mt-1">
                  Please provide an image URL
                </p>
              )}
            </div>

            <div className="border-t border-gray-200 pt-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900">Example Sermons</h2>
                <button
                  type="button"
                  onClick={handleAddSermon}
                  className="btn-secondary"
                >
                  <Plus size={20} className="mr-2" />
                  Add Sermon
                </button>
              </div>

              {sermons.length > 0 && (
                <div className="space-y-4 mb-6">
                  {sermons.map((sermon) => (
                    <div
                      key={sermon.id}
                      className="flex items-center justify-between bg-gray-50 p-4 rounded-lg"
                    >
                      <div className="flex items-center">
                        {sermon.type === 'document' && <File className="text-indigo-600 mr-3" />}
                        {sermon.type === 'audio' && <Mic className="text-indigo-600 mr-3" />}
                        {sermon.type === 'video' && <Youtube className="text-indigo-600 mr-3" />}
                        <div>
                          <h3 className="font-medium text-gray-900">{sermon.title}</h3>
                          <p className="text-sm text-gray-500">{sermon.scripture}</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveSermon(sermon.id)}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <X size={20} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {showSermonForm && (
                <div className="bg-gray-50 p-6 rounded-lg mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium text-gray-900">Add Example Sermon</h3>
                    <button
                      type="button"
                      onClick={() => setShowSermonForm(false)}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <X size={20} />
                    </button>
                  </div>

                  <div className="flex border-b border-gray-200 mb-6">
                    <button
                      className={`pb-4 px-4 ${uploadType === 'text' 
                        ? 'text-indigo-700 border-b-2 border-indigo-700 font-medium' 
                        : 'text-gray-500 hover:text-gray-700'}`}
                      onClick={() => setUploadType('text')}
                    >
                      Text
                    </button>
                    <button
                      className={`pb-4 px-4 ${uploadType === 'document' 
                        ? 'text-indigo-700 border-b-2 border-indigo-700 font-medium' 
                        : 'text-gray-500 hover:text-gray-700'}`}
                      onClick={() => setUploadType('document')}
                    >
                      Document
                    </button>
                    <button
                      className={`pb-4 px-4 ${uploadType === 'audio' 
                        ? 'text-indigo-700 border-b-2 border-indigo-700 font-medium' 
                        : 'text-gray-500 hover:text-gray-700'}`}
                      onClick={() => setUploadType('audio')}
                    >
                      Audio
                    </button>
                    <button
                      className={`pb-4 px-4 ${uploadType === 'video' 
                        ? 'text-indigo-700 border-b-2 border-indigo-700 font-medium' 
                        : 'text-gray-500 hover:text-gray-700'}`}
                      onClick={() => setUploadType('video')}
                    >
                      Video
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="form-label">Sermon Title</label>
                      <input
                        type="text"
                        className="form-input"
                        value={currentSermon?.title || ''}
                        onChange={(e) => currentSermon && setCurrentSermon({
                          ...currentSermon,
                          title: e.target.value
                        })}
                      />
                    </div>

                    <div>
                      <label className="form-label">Scripture Reference</label>
                      <input
                        type="text"
                        className="form-input"
                        value={currentSermon?.scripture || ''}
                        onChange={(e) => currentSermon && setCurrentSermon({
                          ...currentSermon,
                          scripture: e.target.value
                        })}
                      />
                    </div>

                    {uploadType === 'text' && (
                      <div>
                        <label className="form-label">Sermon Content</label>
                        <textarea
                          rows={6}
                          className="form-input"
                          value={currentSermon?.content || ''}
                          onChange={(e) => currentSermon && setCurrentSermon({
                            ...currentSermon,
                            content: e.target.value
                          })}
                        ></textarea>
                      </div>
                    )}

                    {(uploadType === 'document' || uploadType === 'audio' || uploadType === 'video') && (
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <input
                          type="file"
                          id="sermon-file"
                          className="hidden"
                          accept={
                            uploadType === 'document' ? '.docx,.pdf,.txt' :
                            uploadType === 'audio' ? 'audio/*' :
                            'video/*'
                          }
                          onChange={handleFileChange}
                        />
                        <label
                          htmlFor="sermon-file"
                          className="btn-secondary cursor-pointer"
                        >
                          Select File
                        </label>
                        {currentSermon?.file && (
                          <p className="mt-2 text-sm text-gray-500">
                            Selected: {currentSermon.file.name}
                          </p>
                        )}
                      </div>
                    )}

                    <div className="flex justify-end">
                      <button
                        type="button"
                        className="btn-primary"
                        onClick={() => currentSermon && handleSermonSubmit(currentSermon)}
                      >
                        Add Sermon
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center mt-4 text-amber-700 bg-amber-50 p-3 rounded-lg">
              <AlertCircle size={20} className="mr-2 flex-shrink-0" />
              <p className="text-sm">
                Profile images should be professional headshots or portraits with good lighting and clear focus.
              </p>
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => navigate('/profiles')}
                className="btn-outline"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="btn-primary"
                disabled={sermons.length === 0}
              >
                Create Profile
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default CreateProfile;