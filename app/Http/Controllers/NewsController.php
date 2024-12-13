<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

class NewsController extends Controller
{
    protected $apiKey;

    public function __construct()
    {
        $this->apiKey = env('NEWSAPI_KEY');
    }

    public function getSources()
    {
        try {
            $cacheKey = 'news_sources';
            $sources = Cache::remember($cacheKey, 60 * 60, function () {
                $response = Http::get('https://newsapi.org/v2/sources', [
                    'apiKey' => $this->apiKey,
                ]);

                if ($response->failed()) {
                    Log::error('Error fetching sources: ' . $response->body());
                    throw new \Exception($response->json('message'));
                }

                return $response->json();
            });

            return response()->json($sources);
        } catch (\Exception $e) {
            Log::error('Error fetching sources: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to fetch sources. Please try again later.'], 500);
        }
    }

    public function getAuthors()
    {
        try {
            $cacheKey = 'news_authors';
            $authors = Cache::remember($cacheKey, 60 * 60, function () {
                $response = Http::get('https://newsapi.org/v2/everything', [
                    'q' => 'news',
                    'apiKey' => $this->apiKey,
                ]);

                if ($response->failed()) {
                    Log::error('Error fetching authors: ' . $response->body());
                    throw new \Exception($response->json('message'));
                }

                $articles = $response->json()['articles'];
                $authors = [];

                foreach ($articles as $article) {
                    if (!empty($article['author']) && !in_array($article['author'], $authors)) {
                        $authors[] = $article['author'];
                    }
                }

                return $authors;
            });

            return response()->json(['authors' => $authors]);
        } catch (\Exception $e) {
            Log::error('Error fetching authors: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to fetch authors. Please try again later.'], 500);
        }
    }

    public function getEverything(Request $request)
    {
        try {
            $query = $request->input('q', 'news');
            $sources = $request->input('sources');
            $from = $request->input('from', now()->subDays(30)->format('Y-m-d'));
            $to = $request->input('to', now()->format('Y-m-d'));
            $category = $request->input('category');
            $pageSize = $request->input('pageSize', 500); // Reduce the number of articles to 20

            $cacheKey = md5("news_{$query}_{$sources}_{$from}_{$to}_{$category}_{$pageSize}");
            $articles = Cache::remember($cacheKey, 60 * 60, function () use ($query, $sources, $from, $to, $category, $pageSize) {
                $params = [
                    'q' => $query,
                    'sources' => $sources,
                    'from' => $from,
                    'to' => $to,
                    'pageSize' => $pageSize,
                    'apiKey' => $this->apiKey,
                ];

                if ($category) {
                    $params['category'] = $category;
                    $response = Http::get('https://newsapi.org/v2/top-headlines', $params);
                } else {
                    $response = Http::get('https://newsapi.org/v2/everything', $params);
                }

                if ($response->failed()) {
                    Log::error('Error fetching news: ' . $response->body());
                    throw new \Exception($response->json('message'));
                }

                return $response->json()['articles'];
            });

            if (empty($articles)) {
                return response()->json(['message' => 'No article available at this moment.'], 200);
            }

            return response()->json(['articles' => $articles, 'totalResults' => count($articles)]);
        } catch (\Exception $e) {
            Log::error('Error fetching news: ' . $e->getMessage());
            if (strpos($e->getMessage(), 'Could not resolve host') !== false) {
                return response()->json(['error' => 'Could not resolve host: newsapi.org. Please check your network connection.'], 500);
            }
            return response()->json(['error' => 'Failed to fetch news. Please try again later.'], 500);
        }
    }
}
