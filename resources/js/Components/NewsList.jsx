import React from "react";

const NewsList = ({ articles }) => {
    return (
        <div className="mt-6">
            {articles.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {articles.map((article, index) => (
                        <div key={index} className="border p-4 rounded shadow">
                            {article.image && (
                                <img
                                    src={article.image}
                                    alt={article.title}
                                    className="w-full h-48 object-cover rounded"
                                />
                            )}
                            <h3 className="text-xl font-bold mt-2">{article.title}</h3>
                            <p className="mt-2">{article.description}</p>
                            <a
                                href={article.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 mt-4 inline-block"
                            >
                                Read more
                            </a>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center">
                    <p className="text-lg">No articles available at this moment.</p>
                </div>
            )}
        </div>
    );
};

export default NewsList;
