import React, { useState, useEffect } from 'react';

const NewsSearch = ({ onSearch }) => {
    const [query, setQuery] = useState('');
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [category, setCategory] = useState([]);

    useEffect(() => {
        // Initialize multi-select tag only once
        if (window.MultiSelectTag) {
            new MultiSelectTag('category-select', {
                placeholder: 'Select Category',
                shadow: true,
                rounded: true,
                onChange: function (values) {
                    setCategory(values);
                    handleSearch();
                }
            });
        }
    }, []);

    const handleSearch = () => {
        onSearch(query, from, to, category.join(','));
    };

    return (
        <div>
            <h2>Search News</h2>
            <input
                type="text"
                value={query}
                onChange={(e) => {
                    setQuery(e.target.value);
                    handleSearch();
                }}
                placeholder="Search news"
                className="w-full p-2 border rounded"
            />
            <input
                type="date"
                value={from}
                onChange={(e) => {
                    setFrom(e.target.value);
                    handleSearch();
                }}
                placeholder="From date"
                className="w-full p-2 border rounded mt-2"
            />
            <input
                type="date"
                value={to}
                onChange={(e) => {
                    setTo(e.target.value);
                    handleSearch();
                }}
                placeholder="To date"
                className="w-full p-2 border rounded mt-2"
            />
            <select
                id="category-select"
                multiple
                value={category}
                onChange={(e) => {
                    setCategory(Array.from(e.target.selectedOptions, option => option.value));
                    handleSearch();
                }}
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
        </div>
    );
};

export default NewsSearch;
