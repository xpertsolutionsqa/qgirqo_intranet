<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Facades\Log;
use App\Models\Department;
use App\Models\Designation;
use App\Models\EmployeeProfile;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        try {
            $request->validate([
                'email' => 'required|email',
                'password' => 'required',
            ]);
            $user = User::where('email', $request->email)->first();
            if (!$user || !Hash::check($request->password, $user->password)) {
                return response()->json([
                    'error' => 'Invalid credentials',
                ], 401);
            }
            $token = $user->createToken('token')->plainTextToken;
            return response()->json([
                'access_token' => $token,
                'user' => new UserResource($user->load('profile')),
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'error' => $th->getMessage(),
            ], 500);
        }
    }

    /**
     * Redirect the user to the Azure authentication page.
     *
     * @return \Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function azureRedirect()
    {
        return Socialite::driver('azure')->redirect();
    }

    /**
     * Obtain the user information from Azure.
     *
     * @return \Illuminate\Http\RedirectResponse
     */
    public function azureCallback()
    {
        try {
            $azureUser = Socialite::driver('azure')->user();
        } catch (\Exception $e) {
            Log::error('Azure SSO Error: ' . $e->getMessage());
            return redirect('/login')->with('error', 'Azure authentication failed.');
        }

        $user = User::where('email', $azureUser->email)->first();

        if (!$user) {
            $passwordPrefix = explode('@', $azureUser->email)[0];

            $user = User::create([
                'name' => $azureUser->name ?? $passwordPrefix,
                'email' => $azureUser->email,
                'password' => Hash::make($passwordPrefix),
            ]);

            $user->assignRole('employee');

            // Create profile with first available dept/desig
            EmployeeProfile::create([
                'user_id' => $user->id,
                'employee_id' => 'EMP-' . rand(100000, 999999),
                'department_id' => Department::first()?->id,
                'designation_id' => Designation::first()?->id,
                'joining_date' => now(),
            ]);
        }

        Auth::login($user);

        return redirect()->intended('/');
    }
}
