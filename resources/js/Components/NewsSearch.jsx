import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toastr from 'toastr';

const NewsSearch = ({ onSearch, totalResults }) => {
    const [query, setQuery] = useState('');
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [category, setCategory] = useState('');

    useEffect(() => {
        const handleSearch = async () => {
            try {
                const response = await axios.get('/api/news/everything', {
                    params: {
                        q: query,
                        from: from,
                        to: to,
                        category: category,
                        pageSize: 500,
                    },
                });
                if (response.data.message) {
                    toastr.warning(response.data.message);
                } else {
                    onSearch(response.data.articles, response.data.totalResults);
                }
            } catch (error) {
                if (error.response && error.response.status === 429) {
                    toastr.error('You have exceeded the rate limit. Please try again later.');
                } else {
                    console.error('Error fetching news:', error);
                }
            }
        };

        handleSearch();
    }, [query, from, to, category, onSearch]);

    useEffect(() => {
        // Initialize multi-select tag
        if (window.MultiSelectTag) {
            new MultiSelectTag('category-select', {
                placeholder: 'Select Category',
                shadow: true,
                rounded: true,
                onChange: function (values) {
                    setCategory(values.join(','));
                }
            });
        }
    }, []);

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
                id="category-select"
                multiple
                className="w-full p-2 border rounded mt-2"
            >
                <option value="business">Business</option>
                <option value="entertainment">Entertainment</option>
                <option value="general">General</option>
                <option value="health">Health</option>
                <option value="science">Science</option>
                <option value="sports">Sports</option>
                <option value="technology">Technology</option>
            </select>
            <p>Total news found: {totalResults}</p>
            {totalResults > 500 && <p>News count is more than 500</p>}
        </div>
    );
};

export default NewsSearch;
