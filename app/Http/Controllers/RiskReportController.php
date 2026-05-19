<?php

namespace App\Http\Controllers;

use App\Models\RiskReport;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class RiskReportController extends Controller
{
    public function index()
    {
        $reports = RiskReport::with('user')->latest()->get();
        return Inertia::render('RiskManagement/Index', [
            'reports' => $reports
        ]);
    }

    public function publicIndex()
    {
        $reports = RiskReport::latest()->get();
        return Inertia::render('RiskManagement/PublicIndex', [
            'reports' => $reports
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'url' => 'required|url',
        ]);

        RiskReport::create([
            'title' => $request->title,
            'description' => $request->description,
            'url' => $request->url,
            'user_id' => auth()->id(),
        ]);

        return redirect()->back()->with('success', 'Risk report link saved successfully.');
    }

    public function destroy($id)
    {
        $report = RiskReport::findOrFail($id);
        
        // Only owner or admin can delete
        if ($report->user_id !== auth()->id() && !auth()->user()->hasRole('admin')) {
            abort(403);
        }

        $report->delete();

        return redirect()->back()->with('success', 'Risk report deleted successfully.');
    }
}
