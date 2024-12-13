<?php
namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;
use App\Models\News;

class FetchNews extends Command
{
    protected $signature = 'fetch:news';
    protected $description = 'Fetch news from The Guardian and The New York Times and store them in the database';

    public function handle()
    {
        $this->info('Fetching news from APIs...');
        $this->fetchFromGuardian();
        $this->fetchFromNYTimes();
        $this->info('News fetching completed.');
    }

    private function fetchFromGuardian()
    {
        $this->info('Fetching news from The Guardian...');
        $response = Http::get('https://content.guardianapis.com/search', [
            'api-key' => env('GUARDIAN_API_KEY'),
            'page-size' => 50,
            'show-fields' => 'all',
        ]);

        if ($response->successful()) {
            $articles = $response->json()['response']['results'];
            foreach ($articles as $article) {
                News::updateOrCreate(
                    ['url' => $article['webUrl']],
                    [
                        'title' => $article['webTitle'],
                        'description' => $article['fields']['trailText'] ?? null,
                        'url' => $article['webUrl'],
                        'source' => 'The Guardian',
                        'author' => $article['fields']['byline'] ?? null,
                        'category' => $article['sectionName'],
                        'image' => $article['fields']['thumbnail'] ?? null, // Store image URL
                        'published_at' => $article['webPublicationDate'],
                    ]
                );
            }
            $this->info('The Guardian: Fetched ' . count($articles) . ' articles.');
        } else {
            $this->error('The Guardian: Failed to fetch news.');
            $this->error('Response: ' . $response->body());
        }
    }

    private function fetchFromNYTimes()
    {
        $this->info('Fetching news from The New York Times...');
        $response = Http::get('https://api.nytimes.com/svc/topstories/v2/home.json', [
            'api-key' => env('NYTIMES_API_KEY'),
        ]);

        if ($response->successful()) {
            $articles = $response->json()['results'];
            foreach ($articles as $article) {
                News::updateOrCreate(
                    ['url' => $article['url']],
                    [
                        'title' => $article['title'],
                        'description' => $article['abstract'],
                        'url' => $article['url'],
                        'source' => 'The New York Times',
                        'author' => $article['byline'],
                        'category' => $article['section'],
                        'image' => $article['multimedia'][0]['url'] ?? null, // Store image URL
                        'published_at' => $article['published_date'],
                    ]
                );
            }
            $this->info('The New York Times: Fetched ' . count($articles) . ' articles.');
        } else {
            $this->error('The New York Times: Failed to fetch news.');
            $this->error('Response: ' . $response->body());
        }
    }
}
