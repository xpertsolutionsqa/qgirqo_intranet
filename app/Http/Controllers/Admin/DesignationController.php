<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Designation;
use Illuminate\Http\Request;

class DesignationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $designations = Designation::latest()->paginate(10);
        return \Inertia\Inertia::render('Admin/Designations/Index', [
            'designations' => $designations
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255|unique:designations',
        ]);

        Designation::create([
            'title' => $request->title,
            'slug' => \Illuminate\Support\Str::slug($request->title),
        ]);

        return redirect()->back()->with('success', 'Designation created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Designation $designation)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Designation $designation)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Designation $designation)
    {
        $request->validate([
            'title' => 'required|string|max:255|unique:designations,title,' . $designation->id,
        ]);

        $designation->update([
            'title' => $request->title,
            'slug' => \Illuminate\Support\Str::slug($request->title),
        ]);

        return redirect()->back()->with('success', 'Designation updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Designation $designation)
    {
        $designation->delete();
        return redirect()->back()->with('success', 'Designation deleted successfully.');
    }
}
