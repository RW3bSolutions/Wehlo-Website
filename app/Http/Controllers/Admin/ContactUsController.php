<?php

namespace App\Http\Controllers\Admin;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\ContactUs;

class ContactUsController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/ContactUs/Index');
    }

    public function getContacts()
    {

        $contacts = ContactUs::orderBy('created_at', 'desc')->get();

        return response()->json([
            'data' => $contacts
        ]);
    }

    public function storeContact(Request $request)
    {
        $validatedData = $request->validate([
            'full_name'     => 'required|string|max:255',
            'email_address'        => 'required|email|max:255',
            'organization' => 'nullable|string',
            'subject'      => 'required|string|max:255',
            'message'      => 'required|string',
        ]);

        ContactUs::create($validatedData);

        return redirect()->back()->with('success', 'Message sent successfully');
    }


    public function destroy($id)
    {
        $contact = ContactUs::findOrFail($id);
        $contact->delete();

        return response()->json(['message' => 'Contact deleted successfully']);
    }
}
