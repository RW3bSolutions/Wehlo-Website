<?php

namespace App\Http\Controllers\Admin;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Newsletter;

class NewsletterController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Newsletter/Index');
    }

    public function getNewsletter()
    {

        $newsletter = Newsletter::orderBy('created_at', 'desc')->get();

        return response()->json([
            'data' => $newsletter
        ]);
    }

    public function storeNewsletter(Request $request)
    {
        $validatedData = $request->validate([
            'email_address'        => 'required|email|max:255',
        ]);

        Newsletter::create($validatedData);

        return redirect()->back()->with('success', 'Newsletter sent successfully');
    }


    public function destroy($id)
    {
        $contact = Newsletter::findOrFail($id);
        $contact->delete();

        return response()->json(['message' => 'Contact deleted successfully']);
    }
}
