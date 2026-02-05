<?php

namespace App\Services;

use App\Models\HumansOfQgirco;
use Illuminate\Support\Facades\Storage;

class HumansOfQgircoService
{
    public function create(array $data, $image = null)
    {
        if ($image) {
            $data['image_path'] = $image->store('humans', 'public');
        }

        // Optional: Deactivate others if this is active
        if (isset($data['is_active']) && $data['is_active']) {
            HumansOfQgirco::where('is_active', true)->update(['is_active' => false]);
        }

        return HumansOfQgirco::create($data);
    }

    public function update(HumansOfQgirco $human, array $data, $image = null)
    {
        if ($image) {
            if ($human->image_path) {
                Storage::disk('public')->delete($human->image_path);
            }
            $data['image_path'] = $image->store('humans', 'public');
        }

        if (isset($data['is_active']) && $data['is_active']) {
            HumansOfQgirco::where('id', '!=', $human->id)->where('is_active', true)->update(['is_active' => false]);
        }

        $human->update($data);
        return $human;
    }

    public function delete(HumansOfQgirco $human)
    {
        if ($human->image_path) {
            Storage::disk('public')->delete($human->image_path);
        }
        return $human->delete();
    }
}
