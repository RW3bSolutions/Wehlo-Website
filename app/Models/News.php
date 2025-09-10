<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class News extends Model
{
    use HasFactory;

    protected $table = 'news';

    protected $fillable = [
        'title',
        'location',
        'date_implemented',
        'image',
        'description'
    ];

    public function news_category()
    {
        return $this->hasMany(NewsCategory::class);
    }

    public function category()
    {
        return $this->belongsToMany(Category::class, 'news_category', 'news_id', 'category_id');
    }
    public function categories()  // Changed from 'category' to 'categories'
    {
        return $this->belongsToMany(Category::class, 'news_category', 'news_id', 'category_id');
    }
}
