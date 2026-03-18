<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckDashboardAccess
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        // If the user does not exist, return an unauthorized response.
        if (!$user) {
            return redirect()->route('login');
        }

        // Admin and HR roles should always have access, regardless of their profile record.
        if ($user->hasRole(['super-admin', 'admin', 'hr'])) {
            return $next($request);
        }

        // If the user has a linked EmployeeProfile (but no admin/hr role), they are a normal employee, so deny access.
        if ($user->profile) {
            return redirect()->route('welcome')->with('error', 'You are not authorized to access the dashboard.');
        }

        return $next($request);
    }
}
