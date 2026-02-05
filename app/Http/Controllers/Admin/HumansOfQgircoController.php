<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\HumansOfQgirco;
use App\Models\User;
use App\Services\HumansOfQgircoService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HumansOfQgircoController extends Controller
{
    protected $service;

    public function __construct(HumansOfQgircoService $service)
    {
        $this->service = $service;
    }

    public function index()
    {
        $humans = HumansOfQgirco::with('user.profile')
            ->latest()
            ->get();

        $employees = User::with('profile')->get()->map(function ($user) {
            return [
                'id' => $user->id,
                'name' => $user->name,
            ];
        });

        return Inertia::render('Humans/Index', [
            'humans' => $humans,
            'employees' => $employees,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'quote' => 'required|string',
            'story' => 'required|string',
            'image' => 'nullable|image|max:2048',
            'is_active' => 'boolean',
        ]);

        $this->service->create($validated, $request->file('image'));

        return redirect()->back()->with('success', 'Added to Wall successfully');
    }

    public function update(Request $request, HumansOfQgirco $humansOfQgirco)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'quote' => 'required|string',
            'story' => 'required|string',
            'image' => 'nullable|image|max:2048',
            'is_active' => 'boolean',
        ]);

        $this->service->update($humansOfQgirco, $validated, $request->file('image'));

        return redirect()->back()->with('success', 'Wall updated successfully');
    }

    public function destroy(HumansOfQgirco $humansOfQgirco)
    {
        $this->service->delete($humansOfQgirco);
        return redirect()->back()->with('success', 'Removed from Wall successfully');
    }
}
