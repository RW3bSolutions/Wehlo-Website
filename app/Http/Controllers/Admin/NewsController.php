<?php

namespace App\Http\Controllers\Admin;

use App\Models\News;
use Inertia\Inertia;
use App\Models\Category;
use App\Models\NewsCategory;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class NewsController extends Controller
{
    public function index()
    {

        return Inertia::render('Admin/News/Index');
    }

    public function getNews()
    {
        $news = News::orderBy('created_at', 'desc')->get();

        return response()->json([
            'data' => $news
        ]);
    }

    public function create()
    {
        $categories = Category::all();

        return Inertia::render('Admin/News/Create', ['categories' => $categories]);
    }


    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string',
            'location' => 'required|string',
            'date_implemented' => 'required|date',
            'description' => 'required|string',
            'image' => 'nullable|image',
            'categories' => 'array|required',
            'categories.*' => 'exists:category,id',
        ]);

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageName = time() . '_' . $image->getClientOriginalName();
            $image->move(public_path('/images/uploads'), $imageName);
            $validated['image'] = '/images/uploads/' . $imageName;
        }

        $news = News::create($validated);

        // Save categories
        foreach ($validated['categories'] as $catId) {
            NewsCategory::create([
                'news_id' => $news->id,
                'category_id' => $catId,
            ]);
        }

        return redirect()->route('news.index')->with('success', 'News created successfully');
    }

    public function edit(News $news)
    {
        $categories = Category::all();
        $selectedCategories = $news->categories->pluck('id')->toArray(); // Changed from 'category' to 'categories'

        return Inertia::render('Admin/News/Edit', [
            'news' => [
                ...$news->toArray(),
                'selected_categories' => $selectedCategories,
            ],
            'categories' => $categories,
        ]);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'title' => 'required|string',
            'location' => 'required|string',
            'date_implemented' => 'required|date',
            'description' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'categories' => 'array|required',
            'categories.*' => 'exists:category,id',
        ]);

        $news = News::findOrFail($id);

        if ($request->hasFile('image')) {
            if (!empty($news->image) && file_exists(public_path($news->image))) {
                unlink(public_path($news->image));
            }

            $image = $request->file('image');
            $imageName = time() . '_' . $image->getClientOriginalName();
            $image->move(public_path('/images/uploads'), $imageName);
            $validated['image'] = '/images/uploads/' . $imageName;
        } else {
            unset($validated['image']);
        }

        $news->update($validated);

        // Delete old categories
        NewsCategory::where('news_id', $news->id)->delete();

        // Save new categories
        foreach ($validated['categories'] as $catId) {
            NewsCategory::create([
                'news_id' => $news->id,
                'category_id' => $catId,
            ]);
        }

        return redirect()->route('news.index')->with('success', 'News updated successfully.');
    }

    public function destroy($id)
    {
        $news = News::findOrFail($id);
        $news->delete();

        return response()->json(['message' => 'News deleted successfully']);
    }
}
