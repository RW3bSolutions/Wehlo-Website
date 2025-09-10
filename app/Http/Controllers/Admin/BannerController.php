<?php

namespace App\Http\Controllers\Admin;

use Inertia\Inertia;
use App\Models\Banner;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class BannerController extends Controller
{
    public function index()
    {

        return Inertia::render('Admin/Banner/Index');
    }

    public function getBanners()
    {
        $banners = Banner::orderBy('created_at', 'desc')->get();

        return response()->json([
            'data' => $banners
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Banner/Create');
    }


    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string',
            'description' => 'nullable|string',
            'image' => 'required|image|max:2048'
        ]);

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageName = time() . '_' . $image->getClientOriginalName();
            $image->move(public_path('/images/uploads'), $imageName);
            $validated['image'] = '/images/uploads/' . $imageName;
        }

        Banner::create($validated);

        return redirect()->route('banner.index')->with('success', 'Banner created successfully');
    }

    public function edit(Banner $banner)
    {

        return Inertia::render('Admin/Banner/Edit', compact('banner'));
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'title' => 'required|string',
            'description' => 'required|string',
            'image' => 'nullable|image|max:2048'
        ]);

        // Retrieve the banner
        $banner = Banner::findOrFail($id);

        if ($request->hasFile('image')) {
            // Delete old image if it exists
            if (!empty($banner->image) && file_exists(public_path($banner->image))) {
                unlink(public_path($banner->image));
            }

            // Store new image
            $image = $request->file('image');
            $imageName = time() . '_' . $image->getClientOriginalName();
            $image->move(public_path('/images/uploads'), $imageName);
            $validated['image'] = '/images/uploads/' . $imageName;
        } else {
            // Remove image from validated data so it won't update the database
            unset($validated['image']);
        }

        $banner->update($validated);

        return redirect()->route('banner.index')->with('success', 'Banner updated successfully.');
    }

    public function destroy($id)
    {
        $banner = Banner::findOrFail($id);
        $banner->delete();

        return response()->json(['message' => 'Banner deleted successfully']);
    }
}
