<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;

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
                    throw new \Exception($response->json('message'));
                }

                return $response->json();
            });

            return response()->json($sources);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
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
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function getEverything(Request $request)
    {
        try {
            $query = $request->input('q', 'news');
            $sources = $request->input('sources');
            $from = $request->input('from', now()->subDays(rand(1, 30))->format('Y-m-d'));
            $to = $request->input('to', now()->format('Y-m-d'));
            $category = $request->input('category');
            $pageSize = $request->input('pageSize', 500);

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
                return response()->json(['error' => $response->json('message')], $response->status());
            }

            $articles = $response->json()['articles'];
            if (empty($articles)) {
                return response()->json(['message' => 'No article available at this moment.'], 200);
            }

            return response()->json($response->json());
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
