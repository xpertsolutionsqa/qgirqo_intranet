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

    public function scopeUpcomingBirthdays($query, $days = 7)
    {
        $today = Carbon::today();
        $end = Carbon::today()->addDays($days);

        $m1 = $today->format('m-d');
        $m2 = $end->format('m-d');

        if ($m1 <= $m2) {
            return $query->whereRaw("DATE_FORMAT(dob, '%m-%d') BETWEEN ? AND ?", [$m1, $m2]);
        }

        return $query->where(function ($q) use ($m1, $m2) {
            $q->whereRaw("DATE_FORMAT(dob, '%m-%d') >= ?", [$m1])
                ->orWhereRaw("DATE_FORMAT(dob, '%m-%d') <= ?", [$m2]);
        });
    }

    /**
     * Scope: Upcoming Anniversaries in next X days
     */
    public function scopeUpcomingAnniversaries($query, $days = 7)
    {
        $today = Carbon::today();
        $end = Carbon::today()->addDays($days);

        $m1 = $today->format('m-d');
        $m2 = $end->format('m-d');

        if ($m1 <= $m2) {
            return $query->whereRaw("DATE_FORMAT(joining_date, '%m-%d') BETWEEN ? AND ?", [$m1, $m2]);
        }

        return $query->where(function ($q) use ($m1, $m2) {
            $q->whereRaw("DATE_FORMAT(joining_date, '%m-%d') >= ?", [$m1])
                ->orWhereRaw("DATE_FORMAT(joining_date, '%m-%d') <= ?", [$m2]);
        });
    }
}
