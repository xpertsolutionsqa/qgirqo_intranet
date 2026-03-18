<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;

class AzureAuthController extends Controller
{
    /**
     * Redirect the user to the Azure authentication page.
     *
     * @return \Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function redirect()
    {
        return Socialite::driver('azure')->redirect();
    }

    /**
     * Obtain the user information from Azure.
     *
     * @return \Illuminate\Http\RedirectResponse
     */
    public function callback()
    {
        try {
            $azureUser = Socialite::driver('azure')->user();
        } catch (\Exception $e) {
            Log::error('Azure SSO Error: ' . $e->getMessage());
            return redirect('/login')->with('error', 'Azure authentication failed.');
        }

        $user = User::where('email', $azureUser->email)->first();

        if (!$user) {
            return redirect('/login')->with('error', 'Your account was not found. Please contact an administrator.');
        }

        Auth::login($user);

        return redirect()->intended('/dashboard');
    }
}
