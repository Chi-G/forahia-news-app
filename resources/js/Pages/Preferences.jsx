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
                setAuthors(authorsResponse.data.authors.map(author => author.author)); // Extract author names
                setSources(sourcesResponse.data.sources.map(source => source.source)); // Extract source names
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
            toastr.error('Failed to save preferences.');
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title="Preferences" />
            <div className="p-6">
                <h2 className="text-2xl font-bold mb-4">Preferences</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <h4 className="text-xl font-bold">Authors</h4>
                        <p>Select your preferred authors</p>
                        <div>
                            {authors.map((author, index) => (
                                <div key={index}>
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
                            {sources.map((source, index) => (
                                <div key={index}>
                                    <input
                                        type="checkbox"
                                        value={source}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            setSelectedSources((prev) =>
                                                prev.includes(value)
                                                    ? prev.filter((id) => id !== value)
                                                    : [...prev, value]
                                            );
                                        }}
                                    />
                                    <label className="ml-2">{source}</label>
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
