import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import NewsSearch from '@/Components/NewsSearch';
import NewsFilter from '@/Components/NewsFilter';
import NewsList from '@/Components/NewsList';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Dashboard() {
    const [articles, setArticles] = useState([]);
    const [totalResults, setTotalResults] = useState(0);
    const [page, setPage] = useState(1);

    useEffect(() => {
        const fetchInitialNews = async () => {
            try {
                const response = await axios.get('/api/news/everything', {
                    params: {
                        page: page,
                    },
                });
                setArticles(response.data.articles);
                setTotalResults(response.data.totalResults);
            } catch (error) {
                console.error('Error fetching initial news:', error);
            }
        };

        fetchInitialNews();
    }, [page]);

    const handleSearch = (results, total) => {
        setArticles(results);
        setTotalResults(total);
    };

    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
        setPage(prevPage => prevPage + 1);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

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
                                <NewsSearch onSearch={handleSearch} totalResults={totalResults} />
                                <NewsFilter type="author" onFilter={handleSearch} />
                                <NewsFilter type="source" onFilter={handleSearch} />
                            </div>
                            <NewsList articles={articles} totalResults={totalResults} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
