import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toastr from 'toastr';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

const Preferences = () => {
    const [authors, setAuthors] = useState([]);
    const [sources, setSources] = useState([]);
    const [selectedAuthors, setSelectedAuthors] = useState([]);
    const [selectedSources, setSelectedSources] = useState([]);

    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const authorsResponse = await axios.get('/api/news/authors');
                const sourcesResponse = await axios.get('/api/news/sources');
                setAuthors(authorsResponse.data.authors);
                setSources(sourcesResponse.data.sources);
            } catch (error) {
                console.error('Error fetching options:', error);
            }
        };
        fetchOptions();
    }, []);

    const handleSavePreferences = async () => {
        try {
            const response = await axios.post('/preferences', {
                authors: selectedAuthors,
                sources: selectedSources,
            });

            if (response.status === 200) {
                toastr.success('Preferences saved successfully!');
            } else {
                toastr.error('Failed to save preferences.');
            }
        } catch (error) {
            toastr.error('An error occurred while saving preferences.');
            console.error('Error saving preferences:', error);
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Preferences
                </h2>
            }
        >
            <Head title="Preferences" />

            <div className="p-6">
                <h3 className="text-2xl font-bold text-center">Preferences</h3>
                <p className="text-center">Adjust settings to personalize your experience on this platform.</p>
                <hr className="my-4" />
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className='text-center'>
                        <h4 className="text-xl font-bold">Authors</h4>
                        <p>Read news only from these authors listed below</p>
                        <div>
                            {authors.map((author) => (
                                <div key={author}>
                                    <input
                                        type="checkbox"
                                        value={author}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            setSelectedAuthors((prev) =>
                                                prev.includes(value)
                                                    ? prev.filter((id) => id !== value)
                                                    : [...prev, value]
                                            );
                                        }}
                                    />
                                    <label className="ml-2">{author}</label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h4 className="text-xl font-bold">Sources</h4>
                        <p>Show me news from these sources below</p>
                        <div>
                            {sources.map((source) => (
                                <div key={source.id}>
                                    <input
                                        type="checkbox"
                                        value={source.id}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            setSelectedSources((prev) =>
                                                prev.includes(value)
                                                    ? prev.filter((id) => id !== value)
                                                    : [...prev, value]
                                            );
                                        }}
                                    />
                                    <label className="ml-2">{source.name}</label>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <button onClick={handleSavePreferences} className="mt-4 p-2 bg-blue-500 text-white rounded block mx-auto">
                    Save Preferences
                </button>
            </div>
        </AuthenticatedLayout>
    );
};

export default Preferences;
