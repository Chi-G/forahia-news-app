import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toastr from 'toastr';

const NewsFilter = ({ type, onFilter }) => {
    const [options, setOptions] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState([]);

    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const response = await axios.get(`/api/news/${type === 'author' ? 'authors' : 'sources'}`);
                setOptions(type === 'author' ? response.data.authors : response.data.sources);
            } catch (error) {
                console.error('Error fetching options:', error);
            }
        };
        fetchOptions();
    }, [type]);

    useEffect(() => {
        // Initialize multi-select tag
        if (window.MultiSelectTag) {
            new MultiSelectTag(`${type}-select`, {
                placeholder: `Select ${type}`,
                shadow: true,
                rounded: true,
                onChange: function (values) {
                    setSelectedOptions(values);
                }
            });
        }
    }, [options, type]);

    useEffect(() => {
        const handleFilter = async () => {
            try {
                const response = await axios.get('/api/news/everything', {
                    params: {
                        [type]: selectedOptions.join(','),
                        pageSize: 500,
                    },
                });
                onFilter(response.data.articles, response.data.totalResults);
            } catch (error) {
                if (error.response && error.response.status === 429) {
                    toastr.error('You have exceeded the rate limit. Please try again later.');
                } else {
                    console.error('Error fetching filtered news:', error);
                }
            }
        };

        handleFilter();
    }, [selectedOptions, type, onFilter]);

    return (
        <div>
            <h2>Filter by {type.charAt(0).toUpperCase() + type.slice(1)}</h2>
            <select
                id={`${type}-select`}
                multiple
                className="w-full p-2 border rounded"
            >
                {options.map((option, index) => (
                    <option key={index} value={option.id}>
                        {option.name || option}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default NewsFilter;
