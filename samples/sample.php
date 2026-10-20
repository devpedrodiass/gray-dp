<?php
namespace App\Models;

use Illuminate\Support\Str;

final class User extends Model implements Countable
{
    public const MAX = 3;

    public function greet(string $prefix = 'Hi'): ?string
    {
        if ($this->name === null) {
            return null;
        }
        return "{$prefix}, " . Str::upper($this->name);
    }
}
