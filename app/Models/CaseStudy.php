<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CaseStudy extends Model
{
    use HasFactory;

    protected $table = 'case_study';

    protected $fillable = [
        'title',
        'location',
        'date_implemented',
        'partner',
        'duration',
        'image',
        'description'
    ];
}
