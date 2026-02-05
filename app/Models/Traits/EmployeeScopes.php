<?php

namespace App\Models\Traits;

use Carbon\Carbon;

trait EmployeeScopes
{
    /**
     * Scope: Today's Birthdays
     */
    public function scopeBirthdayToday($query)
    {
        return $query->whereMonth('dob', Carbon::today()->month)
            ->whereDay('dob', Carbon::today()->day);
    }

    /**
     * Scope: Today's Work Anniversaries
     */
    public function scopeAnniversaryToday($query)
    {
        return $query->whereMonth('joining_date', Carbon::today()->month)
            ->whereDay('joining_date', Carbon::today()->day);
    }

    /**
     * Scope: Upcoming Birthdays in next X days
     */
    public function scopeUpcomingBirthdays($query, $days = 7)
    {
        $today = Carbon::today();
        $end = Carbon::today()->addDays($days);

        return $query->whereRaw("DATE_FORMAT(dob, '%m-%d') BETWEEN ? AND ?", [
            $today->format('m-d'),
            $end->format('m-d')
        ]);
    }

    /**
     * Scope: Upcoming Anniversaries in next X days
     */
    public function scopeUpcomingAnniversaries($query, $days = 7)
    {
        $today = Carbon::today();
        $end = Carbon::today()->addDays($days);

        return $query->whereRaw("DATE_FORMAT(joining_date, '%m-%d') BETWEEN ? AND ?", [
            $today->format('m-d'),
            $end->format('m-d')
        ]);
    }
}
