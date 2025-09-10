<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\PageController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Admin\NewsController;
use App\Http\Controllers\Admin\BannerController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\CaseStudyController;
use App\Http\Controllers\Admin\ContactUsController;
use App\Http\Controllers\Admin\NewsletterController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


Route::get('/', [PageController::class, 'homepage'])->name('homepage');
Route::get('/about_us', [PageController::class, 'about_us'])->name('about_us');
Route::get('/contact_us', [PageController::class, 'contact_us'])->name('contact_us');
Route::get('/cases', [PageController::class, 'cases'])->name('cases');
Route::get('/cases_details/{id}', [PageController::class, 'cases_details'])->name('cases_details');
Route::get('/blogs', [PageController::class, 'blogs'])->name('blogs');
Route::get('/blogs_details/{id}', [PageController::class, 'blogs_details'])->name('blogs_details');
Route::get('/platform', [PageController::class, 'platform'])->name('platform');
Route::get('/dashboards', [PageController::class, 'dashboards'])->name('platform');


Route::get('/contacts/data', [ContactUsController::class, 'getContacts'])->name('contacts.data');
Route::get('/banners/data', [BannerController::class, 'getBanners'])->name('banners.data');
Route::get('/category/data', [CategoryController::class, 'getCategory'])->name('category.data');
Route::get('/case_study/data', [CaseStudyController::class, 'getCaseStudy'])->name('case_study.data');
Route::get('/newsletter/data', [NewsletterController::class, 'getNewsletter'])->name('newsletter.data');
Route::get('/news/data', [NewsController::class, 'getNews'])->name('news.data');
Route::post('/contact/store', [ContactUsController::class, 'storeContact'])->name('store.contacts');
Route::post('/newsletter/store', [NewsletterController::class, 'storeNewsletter'])->name('store.newsletter');



Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->prefix('admin')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::resource('/contacts', ContactUsController::class)->except('store');
    Route::resource('/newsletter', NewsletterController::class)->except('store');
    Route::resource('/banner', BannerController::class);
    Route::resource('/category', CategoryController::class);
    Route::resource('/case_study', CaseStudyController::class);
    Route::resource('/news', NewsController::class);
});

require __DIR__ . '/auth.php';
