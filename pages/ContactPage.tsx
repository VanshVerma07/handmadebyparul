
import React, { useState } from 'react';
import { Button } from '../components/ui/Button';

const ContactPage: React.FC = () => {
    const [formState, setFormState] = useState({ name: '', email: '', message: '' });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormState({ ...formState, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Mock submission
        console.log('Form submitted:', formState);
        setIsSubmitted(true);
    };

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-serif font-bold">Get In Touch</h1>
                <p className="mt-4 text-gray-600">Have a question or a custom request? I'd love to hear from you!</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Contact Form */}
                <div className="bg-white p-8 rounded-lg shadow-md">
                    {isSubmitted ? (
                        <div className="text-center py-10">
                            <i className="fas fa-check-circle text-5xl text-green-500 mb-4"></i>
                            <h2 className="text-2xl font-semibold">Thank you!</h2>
                            <p className="text-gray-600 mt-2">Your message has been sent. I'll get back to you soon.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                                <input type="text" name="name" id="name" required value={formState.name} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary" />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                <input type="email" name="email" id="email" required value={formState.email} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary" />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                                <textarea name="message" id="message" rows={5} required value={formState.message} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary"></textarea>
                            </div>
                            <div>
                                <Button type="submit" size="lg" className="w-full">Send Message</Button>
                            </div>
                        </form>
                    )}
                </div>

                {/* Contact Info */}
                <div className="space-y-8">
                     <div>
                        <h3 className="text-xl font-semibold flex items-center gap-3"><i className="fas fa-envelope text-brand-primary"></i>Email</h3>
                        <a href="mailto:hello@handmadebyparul.com" className="text-gray-600 hover:text-brand-primary">hello@handmadebyparul.com</a>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold flex items-center gap-3"><i className="fas fa-map-marker-alt text-brand-primary"></i>Location</h3>
                        <p className="text-gray-600">My Studio, Beautiful City, India</p>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold">Connect with me</h3>
                        <div className="mt-2 flex space-x-6">
                            <a href="https://instagram.com/handmadebyparul" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-brand-highlight text-3xl">
                                <i className="fab fa-instagram"></i>
                            </a>
                            <a href="https://wa.me/1234567890?text=Hello%20Parul!" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-green-500 text-3xl">
                                <i className="fab fa-whatsapp"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
