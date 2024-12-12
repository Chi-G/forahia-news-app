<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class PreferencesController extends Controller
{
    public function edit()
    {
        return Inertia::render('Preferences');
    }

    public function update(Request $request)
    {
        // Save preferences logic here
        return redirect()->route('dashboard')->with('success', 'Preferences updated successfully.');
    }
}
