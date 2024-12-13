import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NewsSearch = ({ onSearch }) => {
    const [query, setQuery] = useState('');
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [category, setCategory] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('/api/news/search', {
                params: {
                    q: query,
                    from: from,
                    to: to,
                    category: category,
                },
            });
            onSearch(response.data.articles);
        };

        fetchData();
    }, [query, from, to, category, onSearch]);

    return (
        <div>
            <h2>Search News</h2>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search news"
                className="w-full p-2 border rounded"
            />
            <input
                type="date"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                placeholder="From date"
                className="w-full p-2 border rounded mt-2"
            />
            <input
                type="date"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                placeholder="To date"
                className="w-full p-2 border rounded mt-2"
            />
            <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-2 border rounded mt-2"
            >
                <option value="">Select Category</option>
                <option value="business">Business</option>
                <option value="entertainment">Entertainment</option>
                <option value="general">General</option>
                <option value="health">Health</option>
                <option value="science">Science</option>
                <option value="sports">Sports</option>
                <option value="technology">Technology</option>
            </select>
        </div>
    );
};

export default NewsSearch;
