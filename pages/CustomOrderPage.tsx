
import React, { useState } from 'react';
import { Button } from '../components/ui/Button';

const CustomOrderPage: React.FC = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [fileName, setFileName] = useState('');

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFileName(e.target.files[0].name);
        } else {
            setFileName('');
        }
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Mock submission
        console.log('Custom order form submitted');
        setIsSubmitted(true);
    };

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-serif font-bold">Create Your Custom Piece</h1>
                    <p className="mt-4 text-gray-600">Have a special idea? Let's bring it to life together. Fill out the form below with your requirements.</p>
                </div>
                
                <div className="bg-white p-8 rounded-lg shadow-md">
                    {isSubmitted ? (
                        <div className="text-center py-10">
                             <i className="fas fa-check-circle text-5xl text-green-500 mb-4"></i>
                            <h2 className="text-2xl font-semibold">Request Received!</h2>
                            <p className="text-gray-600 mt-2">Thank you for your custom order request. I will review it and get back to you via email within 48 hours.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Your Name</label>
                                    <input type="text" name="name" id="name" required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary" />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Your Email</label>
                                    <input type="email" name="email" id="email" required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary" />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Describe your idea</label>
                                <textarea name="description" id="description" rows={6} required placeholder="Tell me about the colors, style, size, and any other details." className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary"></textarea>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="deliveryDate" className="block text-sm font-medium text-gray-700">Preferred Delivery Date</label>
                                    <input type="date" name="deliveryDate" id="deliveryDate" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary" />
                                </div>
                                <div>
                                    <label htmlFor="budget" className="block text-sm font-medium text-gray-700">Budget (Optional)</label>
                                    <input type="text" name="budget" id="budget" placeholder="e.g., $100 - $150" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary" />
                                </div>
                            </div>
                            
                            <div>
                               <label htmlFor="file-upload" className="block text-sm font-medium text-gray-700">Reference Images</label>
                                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                    <div className="space-y-1 text-center">
                                        <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        <div className="flex text-sm text-gray-600">
                                            <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-brand-primary hover:text-brand-primary/80 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-brand-primary">
                                                <span>Upload a file</span>
                                                <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} />
                                            </label>
                                            <p className="pl-1">or drag and drop</p>
                                        </div>
                                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                                        {fileName && <p className="text-sm text-green-600 mt-2">{fileName}</p>}
                                    </div>
                                </div>
                            </div>

                            <div>
                                <Button type="submit" size="lg" className="w-full">Submit Request</Button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CustomOrderPage;
