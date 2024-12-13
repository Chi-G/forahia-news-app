import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import NewsSearch from '@/Components/NewsSearch';
import NewsFilter from '@/Components/NewsFilter';
import NewsList from '@/Components/NewsList';

const Dashboard = () => {
    const [articles, setArticles] = useState([]);
    const [filteredArticles, setFilteredArticles] = useState([]);
    const [totalResults, setTotalResults] = useState(0);

    useEffect(() => {
        const fetchInitialNews = async () => {
            try {
                const response = await axios.get('/api/news/everything', {
                    params: {
                        pageSize: 50, // Limit to 50 articles from each API
                    },
                });
                setArticles(response.data.articles);
                setFilteredArticles(response.data.articles);
                setTotalResults(response.data.totalResults);
            } catch (error) {
                console.error('Error fetching initial news:', error);
            }
        };

        fetchInitialNews();
    }, []);

    const handleSearch = (articles) => {
        setFilteredArticles(articles);
    };

    const handleFilter = (type, selectedOptions) => {
        let filtered = articles;

        if (type === 'author' && selectedOptions.length > 0) {
            filtered = filtered.filter(article => selectedOptions.includes(article.author));
        }

        if (type === 'source' && selectedOptions.length > 0) {
            filtered = filtered.filter(article => selectedOptions.includes(article.source));
        }

        setFilteredArticles(filtered);
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Forahia News Aggregator
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h1 className='text-2xl font-bold text-center'>NEWS</h1>
                            <p className='text-center'>READ the news</p>
                            <br />
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                                <NewsSearch onSearch={handleSearch} />
                                <NewsFilter type="author" onFilter={handleFilter} />
                                <NewsFilter type="source" onFilter={handleFilter} />
                            </div>
                            <NewsList articles={filteredArticles} />
                            {filteredArticles.length === 0 && (
                                <p className="text-center mt-4">Sorry, no news matches this search at this time.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Dashboard;
