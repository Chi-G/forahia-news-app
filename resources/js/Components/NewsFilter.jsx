import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NewsFilter = ({ type, onFilter }) => {
    const [options, setOptions] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState([]);

    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const response = await axios.get(`/api/news/${type === 'author' ? 'authors' : 'sources'}`);
                const options = type === 'author'
                    ? response.data.authors.map(author => author.author)
                    : response.data.sources.map(source => source.source);
                setOptions(options);
            } catch (error) {
                console.error('Error fetching options:', error);
            }
        };
        fetchOptions();
    }, [type]);

    useEffect(() => {
        onFilter(type, selectedOptions);
    }, [selectedOptions, type, onFilter]);

    const handleChange = (e) => {
        const values = Array.from(e.target.selectedOptions, option => option.value);
        setSelectedOptions(values);
    };

    return (
        <div>
            <h2>Filter by {type.charAt(0).toUpperCase() + type.slice(1)}</h2>
            <select
                multiple
                value={selectedOptions}
                onChange={handleChange}
                className="w-full p-2 border rounded"
            >
                {options.map((option, index) => (
                    <option key={index} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default NewsFilter;
