<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EmployeeProfileResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'user_id' => $this->user_id,
            'department_id' => $this->department_id,
            'designation_id' => $this->designation_id,
            'employee_id' => $this->employee_id,
            'dob' => $this->dob,
            'avatar' => $this->avatar,
            'joining_date' => $this->joining_date,
            'phone' => $this->phone,
            'emergency_contact' => $this->emergency_contact,
        ];
    }
}
