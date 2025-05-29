import React, { useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Upload, File, Clock, AlertCircle, Youtube, Mic } from 'lucide-react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import ReactPlayer from 'react-player';
import WaveSurfer from 'wavesurfer.js';
import { profiles } from '../data/preachingProfiles';

interface FormData {
  title: string;
  scripture: string;
  content: string;
  notes?: string;
  mediaUrl?: string;
}

const SermonSubmission: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadType, setUploadType] = useState<'text' | 'file' | 'audio' | 'video'>('text');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [mediaUrl, setMediaUrl] = useState('');
  const waveformRef = useRef<HTMLDivElement>(null);
  const wavesurferRef = useRef<WaveSurfer | null>(null);
  
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  
  const selectedProfileId = location.state?.selectedProfileId || profiles[0].id;
  const selectedProfile = profiles.find(p => p.id === selectedProfileId) || profiles[0];

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      navigate('/results/sermon-123', { 
        state: { 
          sermonData: data,
          profileId: selectedProfileId
        } 
      });
    } catch (error) {
      console.error('Error submitting sermon:', error);
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setSelectedFile(file);
      
      if (uploadType === 'audio' && waveformRef.current) {
        // Initialize WaveSurfer for audio visualization
        wavesurferRef.current?.destroy();
        wavesurferRef.current = WaveSurfer.create({
          container: waveformRef.current,
          waveColor: '#4F46E5',
          progressColor: '#818CF8',
          cursorColor: '#C7D2FE',
          barWidth: 2,
          barRadius: 3,
          cursorWidth: 1,
          height: 80,
          barGap: 3,
        });
        
        wavesurferRef.current.loadBlob(file);
      }
    }
  };

  const handleMediaUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMediaUrl(e.target.value);
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
            Submit Your Sermon
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Your sermon will be analyzed based on the style and approach of:
          </p>
          <div className="mt-2 inline-flex items-center bg-indigo-50 px-4 py-2 rounded-full">
            <img 
              src={selectedProfile.imageUrl} 
              alt={selectedProfile.name} 
              className="w-8 h-8 rounded-full object-cover mr-2"
            />
            <span className="font-medium text-indigo-900">{selectedProfile.name}</span>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-xl p-6 md:p-8">
          <div className="flex border-b border-gray-200 mb-6 overflow-x-auto">
            <button
              className={`pb-4 px-4 whitespace-nowrap ${uploadType === 'text' 
                ? 'text-indigo-700 border-b-2 border-indigo-700 font-medium' 
                : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setUploadType('text')}
            >
              Enter Text
            </button>
            <button
              className={`pb-4 px-4 whitespace-nowrap ${uploadType === 'file' 
                ? 'text-indigo-700 border-b-2 border-indigo-700 font-medium' 
                : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setUploadType('file')}
            >
              Upload Document
            </button>
            <button
              className={`pb-4 px-4 whitespace-nowrap ${uploadType === 'audio' 
                ? 'text-indigo-700 border-b-2 border-indigo-700 font-medium' 
                : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setUploadType('audio')}
            >
              Audio Recording
            </button>
            <button
              className={`pb-4 px-4 whitespace-nowrap ${uploadType === 'video' 
                ? 'text-indigo-700 border-b-2 border-indigo-700 font-medium' 
                : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setUploadType('video')}
            >
              Video Recording
            </button>
          </div>

          {uploadType === 'text' && (
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-6">
                <label htmlFor="title" className="form-label">Sermon Title</label>
                <input
                  id="title"
                  type="text"
                  className={`form-input ${errors.title ? 'border-red-500' : ''}`}
                  placeholder="Enter the title of your sermon"
                  {...register("title", { required: true })}
                />
                {errors.title && <p className="text-red-500 text-sm mt-1">Title is required</p>}
              </div>
              
              <div className="mb-6">
                <label htmlFor="scripture" className="form-label">Scripture Reference</label>
                <input
                  id="scripture"
                  type="text"
                  className={`form-input ${errors.scripture ? 'border-red-500' : ''}`}
                  placeholder="e.g., John 3:16-21"
                  {...register("scripture", { required: true })}
                />
                {errors.scripture && <p className="text-red-500 text-sm mt-1">Scripture reference is required</p>}
              </div>
              
              <div className="mb-6">
                <label htmlFor="content" className="form-label">Sermon Content</label>
                <textarea
                  id="content"
                  rows={10}
                  className={`form-input ${errors.content ? 'border-red-500' : ''}`}
                  placeholder="Paste or type your sermon text here..."
                  {...register("content", { required: true, minLength: 100 })}
                ></textarea>
                {errors.content && errors.content.type === "required" && (
                  <p className="text-red-500 text-sm mt-1">Sermon content is required</p>
                )}
                {errors.content && errors.content.type === "minLength" && (
                  <p className="text-red-500 text-sm mt-1">Sermon content should be at least 100 characters</p>
                )}
              </div>
              
              <div className="mb-6">
                <label htmlFor="notes" className="form-label">Additional Notes (Optional)</label>
                <textarea
                  id="notes"
                  rows={3}
                  className="form-input"
                  placeholder="Any context or specific areas you'd like feedback on"
                  {...register("notes")}
                ></textarea>
              </div>
              
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary"
                >
                  {isSubmitting ? 'Analyzing...' : 'Analyze Sermon'}
                </button>
              </div>
            </form>
          )}

          {uploadType === 'file' && (
            <div>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                {selectedFile ? (
                  <div className="flex flex-col items-center">
                    <File size={48} className="text-indigo-700 mb-2" />
                    <p className="text-lg font-medium text-gray-900">{selectedFile.name}</p>
                    <p className="text-sm text-gray-500">
                      {(selectedFile.size / 1024).toFixed(1)} KB
                    </p>
                    <button
                      className="mt-4 text-indigo-700 underline"
                      onClick={() => setSelectedFile(null)}
                    >
                      Choose a different file
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <Upload size={48} className="text-gray-400 mb-2" />
                    <p className="text-lg font-medium text-gray-900">
                      Drag and drop your file here
                    </p>
                    <p className="text-sm text-gray-500 mb-4">
                      Supports .docx, .pdf, .txt (max 10MB)
                    </p>
                    <input
                      type="file"
                      id="sermon-file"
                      accept=".docx, .pdf, .txt"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                    <label
                      htmlFor="sermon-file"
                      className="btn-secondary cursor-pointer"
                    >
                      Select File
                    </label>
                  </div>
                )}
              </div>
            </div>
          )}

          {uploadType === 'audio' && (
            <div>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                {selectedFile ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Mic size={24} className="text-indigo-700 mr-2" />
                        <div>
                          <p className="font-medium text-gray-900">{selectedFile.name}</p>
                          <p className="text-sm text-gray-500">
                            {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <button
                        className="text-indigo-700 underline"
                        onClick={() => setSelectedFile(null)}
                      >
                        Change
                      </button>
                    </div>
                    <div ref={waveformRef} className="w-full bg-gray-50 rounded-lg p-4" />
                  </div>
                ) : (
                  <div className="text-center">
                    <Mic size={48} className="mx-auto text-gray-400 mb-4" />
                    <p className="text-lg font-medium text-gray-900 mb-2">
                      Upload Audio Recording
                    </p>
                    <p className="text-sm text-gray-500 mb-4">
                      Supports MP3, WAV (max 100MB)
                    </p>
                    <input
                      type="file"
                      id="audio-file"
                      accept="audio/*"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                    <label
                      htmlFor="audio-file"
                      className="btn-secondary cursor-pointer"
                    >
                      Select Audio File
                    </label>
                  </div>
                )}
              </div>
            </div>
          )}

          {uploadType === 'video' && (
            <div className="space-y-6">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                <div className="text-center">
                  <Youtube size={48} className="mx-auto text-gray-400 mb-4" />
                  <p className="text-lg font-medium text-gray-900 mb-2">
                    Upload Video or Add YouTube Link
                  </p>
                  <p className="text-sm text-gray-500 mb-4">
                    Supports MP4, YouTube URLs
                  </p>
                  
                  <div className="max-w-md mx-auto mb-4">
                    <input
                      type="text"
                      placeholder="Paste YouTube URL here"
                      className="form-input"
                      value={mediaUrl}
                      onChange={handleMediaUrlChange}
                    />
                  </div>
                  
                  <p className="text-sm text-gray-500 mb-4">- OR -</p>
                  
                  <input
                    type="file"
                    id="video-file"
                    accept="video/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  <label
                    htmlFor="video-file"
                    className="btn-secondary cursor-pointer"
                  >
                    Select Video File
                  </label>
                </div>
              </div>

              {(mediaUrl || selectedFile) && (
                <div className="bg-gray-50 rounded-lg p-4">
                  {mediaUrl && <ReactPlayer url={mediaUrl} controls width="100%" />}
                  {selectedFile && (
                    <video controls className="w-full">
                      <source src={URL.createObjectURL(selectedFile)} type={selectedFile.type} />
                      Your browser does not support the video tag.
                    </video>
                  )}
                </div>
              )}
            </div>
          )}
          
          {(uploadType === 'audio' || uploadType === 'video' || uploadType === 'file') && (
            <div className="mt-6 flex justify-end">
              <button
                onClick={handleSubmit(onSubmit)}
                disabled={isSubmitting || (!selectedFile && !mediaUrl)}
                className={`btn-primary ${(!selectedFile && !mediaUrl) || isSubmitting ? 'opacity-60 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? 'Analyzing...' : 'Analyze Sermon'}
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default SermonSubmission;