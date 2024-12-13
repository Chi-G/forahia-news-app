<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Models\News;

class NewsController extends Controller
{
    public function getSources()
    {
        try {
            $sources = News::select('source')->distinct()->get();
            return response()->json(['sources' => $sources]);
        } catch (\Exception $e) {
            Log::error('Error fetching sources: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to fetch sources. Please try again later.'], 500);
        }
    }

    public function getAuthors()
    {
        try {
            $authors = News::select('author')->distinct()->get();
            return response()->json(['authors' => $authors]);
        } catch (\Exception $e) {
            Log::error('Error fetching authors: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to fetch authors. Please try again later.'], 500);
        }
    }

    public function getEverything(Request $request)
    {
        try {
            $articles = News::orderByRaw("CASE WHEN source = 'The Guardian' THEN 1 WHEN source = 'The New York Times' THEN 2 ELSE 3 END, published_at DESC")->limit(150)->get();
            return response()->json(['articles' => $articles, 'totalResults' => $articles->count()]);
        } catch (\Exception $e) {
            Log::error('Error fetching news: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to fetch news. Please try again later.'], 500);
        }
    }

    public function search(Request $request)
    {
        $query = News::query();

        if ($request->filled('q')) {
            $query->where('title', 'like', '%' . $request->input('q') . '%')
                ->orWhere('description', 'like', '%' . $request->input('q') . '%');
        }

        if ($request->filled('from')) {
            $query->whereDate('published_at', '>=', $request->input('from'));
        }

        if ($request->filled('to')) {
            $query->whereDate('published_at', '<=', $request->input('to'));
        }

        if ($request->filled('category')) {
            $query->where('category', $request->input('category'));
        }

        if ($request->filled('sources')) {
            $query->whereIn('source', explode(',', $request->input('sources')));
        }

        $articles = $query->orderByRaw("CASE WHEN source = 'The Guardian' THEN 1 WHEN source = 'The New York Times' THEN 2 ELSE 3 END, published_at DESC")->get();

        return response()->json(['articles' => $articles]);
    }
}
