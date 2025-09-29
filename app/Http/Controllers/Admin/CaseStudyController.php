<?php

namespace App\Http\Controllers\Admin;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\CaseStudy;

class CaseStudyController extends Controller
{
    public function index()
    {

        return Inertia::render('Admin/CaseStudy/Index');
    }

    public function getCaseStudy()
    {
        $case_study = CaseStudy::orderBy('created_at', 'desc')->get();

        return response()->json([
            'data' => $case_study
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/CaseStudy/Create');
    }


    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string',
            'location' => 'required|string',
            'date_implemented' => 'required|date',
            'partner' => 'required|string',
            'duration' => 'required|string',
            'description' => 'required|string',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageName = time() . '_' . $image->getClientOriginalName();
            $image->move(public_path('/images/uploads'), $imageName);
            $validated['image'] = '/images/uploads/' . $imageName;
        }

        CaseStudy::create($validated);

        return redirect()->route('case_study.index')->with('success', 'Case Study created successfully');
    }

    public function edit(CaseStudy $case_study)
    {

        return Inertia::render('Admin/CaseStudy/Edit', compact('case_study'));
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'title' => 'required|string',
            'location' => 'required|string',
            'date_implemented' => 'required|date',
            'partner' => 'required|string',
            'duration' => 'required|string',
            'description' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        // Retrieve the banner
        $case_study = CaseStudy::findOrFail($id);

        if ($request->hasFile('image')) {
            // Delete old image if it exists
            if (!empty($case_study->image) && file_exists(public_path($case_study->image))) {
                unlink(public_path($case_study->image));
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

        $case_study->update($validated);

        return redirect()->route('case_study.index')->with('success', 'Case Study updated successfully.');
    }

    public function destroy($id)
    {
        $case_study = CaseStudy::findOrFail($id);
        $case_study->delete();

        return response()->json(['message' => 'Case Study deleted successfully']);
    }
}
