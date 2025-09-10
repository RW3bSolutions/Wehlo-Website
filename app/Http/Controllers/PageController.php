<?php

namespace App\Http\Controllers;

use App\Models\CaseStudy;
use App\Models\News;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Str; // Import Str for string manipulation


class PageController extends Controller
{
    public function homepage()
    {
        return Inertia::render('Welcome');
    }

    public function about_us()
    {
        return Inertia::render('AboutUs');
    }

    public function contact_us()
    {
        return Inertia::render('ContactUs');
    }

    public function cases()
    {
        return Inertia::render('Cases');
    }
    public function cases_details($id)
    {
        $cases = CaseStudy::findOrFail($id);

        return Inertia::render('CasesDetails', compact('cases'));
    }

    public function blogs()
    {
        return Inertia::render('Blogs', [
            'query' => request()->only('q'),
        ]);
    }
    public function blogs_details($id)
    {

        $news = News::with('categories')->findOrFail($id);


        return Inertia::render('BlogsDetails', compact('news'));
    }

    public function platform()
    {
        return Inertia::render('Platform');
    }

    public function dashboards()
    {
        return Inertia::render('Dashboards');
    }

    //search function
    public function search(Request $request)
    {
        // In a real application, this data would come from a database,
        // a content management system, or a dedicated search index (e.g., Laravel Scout with Algolia).
        // For demonstration, we'll use a static array based on your provided page images and sections.
        $allPages = [
            'home' => [
                'main_title' => 'Home - Local Climate Tracker',
                'url' => '/',
                'sections' => [
                    [
                        'subtitle' => 'Main Introduction',
                        'content' => 'Turning Weather Data into Lifesaving Decisions.'
                    ],
                    [
                        'subtitle' => 'Turning Weather Data into Lifesaving Decisions',
                        'content' => 'We provide real-time, hyperlocal weather and environmental data to: Empower communities and agencies with actionable insights.
Monitor climate, air quality, and water conditions via integrated stations and platforms.
Drive disaster resilience and sustainable planning.
With a focus on safety, awareness, and sustainability, we aim to support disaster preparedness, environmental protection, and smart planning for a better future.'
                    ],
                    [
                        'subtitle' => 'Get Started',
                        'content' => 'Discover How Our Monitoring Platforms Can Help You. Our monitoring platforms provide real-time weather, environmental, and hydromet data to help you make informed decisions. Whether for disaster preparedness, resource management, or environmental protection, explore the solutions that can enhance safety and efficiency. View Platform.'
                    ],
                    [
                        'subtitle' => 'Empowering Resilience',
                        'content' => 'Empowering communities with real-time weather and environmental data to support proactive decisions. View All Case Studies. Flood Monitoring for Barangay San Roque. Community Weather Watch: Enhancing Mountain Weather Preparedness in Baguio City. Coastal Weather Alert System. Rainfall Level Mapping for Agriculture.'
                    ],
                    [
                        'subtitle' => 'Investing in Sustainable Monitoring',
                        'content' => 'Preserving our environment starts with understanding it. By providing accurate, real-time weather, environmental, and hydromet data, Wehlo helps safeguard communities and natural resources. This data is vital for proactive decision-making and reducing the impact of climate change. 84 Monitoring Projects Completed. 2 Communities Empowered with Localized Data. 37 Environmental Data Partners. 44 Research Papers Published. View Platform.'
                    ],
                    [
                        'subtitle' => 'Latest News & Updates',
                        'content' => 'Latest Articles. View All News & Insights. June 19, 2025: A Closer Look at WEHLO’s Real-Time Data Dashboard. June 19, 2025: How 24/7 Monitoring Helps Prevent Agricultural Losses. June 19, 2025: Local Governments Use WEHLO Data to Improve Disaster Response. June 19, 2025: DOST and Mapúa University Launch WEHLO to Strengthen Local Weather Monitoring.'
                    ],
                    [
                        'subtitle' => 'Core Mission Statement',
                        'content' => 'Providing real-time weather, environmental, and hydromet data to support safer, smarter, and more resilient communities.'
                    ],
                ]
            ],
            'about-us' => [
                'main_title' => 'About Us - Pioneering Localized Environmental Monitoring',
                'url' => '/about_us',
                'sections' => [
                    [
                        'subtitle' => 'Pioneering Localized Environmental Monitoring for a Safer Tomorrow',
                        'content' => 'WEHLO is a smart, real-time Weather, Environment, and Hydromet Monitoring System designed to provide accurate, location-specific data that supports climate resilience, disaster preparedness, and informed decision-making. Backed by innovation and driven by public service. WEHLO empowers communities, governments, and organizations with actionable insights-anytime, anywhere.'
                    ],
                    [
                        'subtitle' => 'Our Mission',
                        'content' => 'Empowering Communities Through Environmental Intelligence. Our mission is to strengthen community resilience by providing accessible, localized, and real-time monitoring systems that track weather patterns, environmental conditions, and hydrological changes with precision.'
                    ],
                    [
                        'subtitle' => 'Our Vision',
                        'content' => 'A Climate-Smart Nation Built on Accurate and Transparent data. We envision a future where every city, municipality, and barangay is equipped with knowledge and tools to respond proactively to environmental challenges, powered by localized monitoring systems like WEHLO.'
                    ],
                    [
                        'subtitle' => 'Key Metrics',
                        'content' => '100+ Monitoring Stations Deployed. 50+ Partner LGUs. 500,000+ People Impacted. 24/7 Real-Time Monitoring.'
                    ],
                    [
                        'subtitle' => 'Precision Monitoring for Weather, Climate, and Beyond',
                        'content' => 'From early warning systems to historical environmental data, WEHLO supports a range of applications: Temperature: Monitor real-time temperature levels to track heat trends, forecast weather changes, and support climate-sensitive planning. Air Humidity: Measure atmospheric moisture to assess comfort levels, predict rainfall, and support agricultural and health-related monitoring. Rainfall Levels: Track precipitation in real-time to aid in flood prediction, water resource management, and disaster preparedness. Wind Speed & Direction: Detect wind patterns and speed variations to support early warnings for storms and improve aviation, coastal, and urban planning safety. Air Quality Index: Monitor pollutant levels to evaluate the quality of the air and protect public health through informed environmental actions. River Water Levels: Track river and stream levels to monitor flood risks, watershed conditions, and ensure timely evacuation during extreme weather events.'
                    ],
                    [
                        'subtitle' => '24/7 Real-Time Monitoring',
                        'content' => 'Access live, localized data anytime—enabling immediate responses and long-term insights for climate resilience and emergency response.'
                    ],
                    [
                        'subtitle' => 'Data Analysis & Reporting',
                        'content' => 'Transform raw environmental data into visual insights and downloadable reports for smarter, data-driven decision-making.'
                    ],
                    [
                        'subtitle' => 'Partners & Collaborators',
                        'content' => 'Information about partners and collaborators will be displayed here.'
                    ],
                    [
                        'subtitle' => 'Overall Company Goal',
                        'content' => 'Providing real-time weather, environmental, and hydromet data to support safer, smarter, and more resilient communities.'
                    ],
                ]
            ],
            'platform' => [
                'main_title' => 'Platform - A Smarter Way to Monitor the Environment',
                'url' => '/platform',
                'sections' => [
                    [
                        'subtitle' => 'Platform Introduction',
                        'content' => 'A Smarter Way to Monitor the Environment - All in One Platform. Access real-time, reliable environmental data and analytics—anytime, anywhere.'
                    ],
                    [
                        'subtitle' => 'Call to Action',
                        'content' => 'Explore the Dashboard. Request a Demo.'
                    ],
                    [
                        'subtitle' => 'Core Features - Key Capabilities at Your Fingertips',
                        'content' => 'Real-Time Monitoring: Live data from localized stations available 24/7. Interactive Dashboard: Customizable interface with visual charts and data layers. Automated Alerts & Notifications: Set thresholds and receive alerts for flood risks, air quality drops, and more. Data Export & Reporting Tools: Generated automated downloadable reports for compliance or presentation. Multi-Device Access: Works seamlessly across desktops, tablets, and mobile. Sensor Integration: Connects to multiple sensors-temperature, humidity, rainfall, AQI, river levels, wind data, etc.'
                    ],
                    [
                        'subtitle' => 'Use Cases - Designed for Real-World Impact',
                        'content' => 'Disaster Preparedness: Real-time alerts and historical data for flood-prone communities. Agriculture Support: Help farmers make informed decisions based on humidity, rainfall, temperature. Environmental Policy Making: Enable LGUs to create data-driven climate action strategies. Educational & Research Tool: For universities and researchers needing accurate weather and environment data.'
                    ],
                    [
                        'subtitle' => 'Platform Core Value',
                        'content' => 'Providing real-time weather, environmental, and hydromet data to support safer, smarter, and more resilient communities.'
                    ],
                ]
            ],
            'blogs' => [
                'main_title' => 'Blogs - News & Insights',
                'url' => '/blogs',
                'sections' => [
                    [
                        'subtitle' => 'Page Header',
                        'content' => 'News & Insights. Stay Informed. Stay Ahead. Catch the latest updates, expert opinions, and in-depth analyses on weather patterns, environmental monitoring, and innovations from the WEHLO community.'
                    ],
                    [
                        'subtitle' => 'Search Bar',
                        'content' => 'Search For Anything.'
                    ],
                    [
                        'subtitle' => 'Latest Posts Section Title',
                        'content' => 'Latest Posts.'
                    ],
                    [
                        'subtitle' => 'Article: A Closer Look at WEHLO’s Real-Time Data Dashboard',
                        'content' => 'June 19, 2025: A Closer Look at WEHLO’s Real-Time Data Dashboard. Read More.'
                    ],
                    [
                        'subtitle' => 'Article: How 24/7 Monitoring Helps Prevent Agricultural Losses',
                        'content' => 'June 19, 2025: How 24/7 Monitoring Helps Prevent Agricultural Losses. Read More.'
                    ],
                    [
                        'subtitle' => 'Article: Local Governments Use WEHLO Data to Improve Disaster Response',
                        'content' => 'June 19, 2025: Local Governments Use WEHLO Data to Improve Disaster Response. Read More.'
                    ],
                    [
                        'subtitle' => 'Article: DOST and Mapúa University Launch WEHLO to Strengthen Local Weather Monitoring',
                        'content' => 'June 19, 2025: DOST and Mapúa University Launch WEHLO to Strengthen Local Weather Monitoring. Read More.'
                    ],
                    [
                        'subtitle' => 'View All News & Insights Link',
                        'content' => 'View All News & Insights.'
                    ],
                    [
                        'subtitle' => 'Blog Page Mission',
                        'content' => 'Providing real-time weather, environmental, and hydromet data to support safer, smarter, and more resilient communities.'
                    ],
                ]
            ],
            'success-stories' => [
                'main_title' => 'Success Stories - Real Stories. Real Impact.',
                'url' => '/blogs',
                'sections' => [
                    [
                        'subtitle' => 'Page Header',
                        'content' => 'Real Stories. Real Impact. Explore how local governments, researchers, and communities, are leveraging WEHLO to transform environmental monitoring and disaster preparedness.'
                    ],
                    [
                        'subtitle' => 'Search Bar',
                        'content' => 'Search For Anything.'
                    ],
                    [
                        'subtitle' => 'Latest Stories Section Title',
                        'content' => 'Latest Stories.'
                    ],
                    [
                        'subtitle' => 'Story: Coastal Weather Alert System',
                        'content' => 'Location: Guiuan, Eastern Samar. Coastal Weather Alert System. Read More.'
                    ],
                    [
                        'subtitle' => 'Story: Rainfall Level Mapping for Agriculture',
                        'content' => 'Location: Nueva Ecija. Rainfall Level Mapping for Agriculture. Read More.'
                    ],
                    [
                        'subtitle' => 'Story: Flood Monitoring for Barangay San Roque',
                        'content' => 'Location: Barangay San Roque, Marikina City. Flood Monitoring for Barangay San Roque. Read More.'
                    ],
                    [
                        'subtitle' => 'Story: Community Weather Watch: Enhancing Mountain Weather Preparedness in Baguio City',
                        'content' => 'Location: Baguio City, Benguet. Community Weather Watch: Enhancing Mountain Weather Preparedness in Baguio City. Read More.'
                    ],
                    [
                        'subtitle' => 'Success Stories Page Mission',
                        'content' => 'Providing real-time weather, environmental, and hydromet data to support safer, smarter, and more resilient communities.'
                    ],
                ]
            ],
            'contact-us' => [
                'main_title' => 'Contact Us - Get in Touch with WEHLO',
                'url' => '/contact_us',
                'sections' => [
                    [
                        'subtitle' => 'Contact Page Introduction',
                        'content' => 'Get in Touch with WEHLO. We\'re here to answer your questions, discuss partnerships, and support your monitoring needs.'
                    ],
                    [
                        'subtitle' => 'Call Us',
                        'content' => 'Call Us: +63 912 345 6789'
                    ],
                    [
                        'subtitle' => 'Send Us an Email',
                        'content' => 'Send Us an Email: hello@wehlo.ph'
                    ],
                    [
                        'subtitle' => 'Business Hours',
                        'content' => 'Business Hours: Mon-Fri: 9AM-6PM'
                    ],
                    [
                        'subtitle' => 'Office Address',
                        'content' => 'Office Address: 123 Climate Tech Park, Greenbelt City, Philippines'
                    ],
                    [
                        'subtitle' => 'Social Media Presence',
                        'content' => 'Follow Us on Social Media.'
                    ],
                    [
                        'subtitle' => 'Message Form',
                        'content' => 'Send Us a Message: Share your inquiries or feedback using the form below. Our team will respond within 1-2 business days.'
                    ],
                    [
                        'subtitle' => 'Contact Page Purpose',
                        'content' => 'Providing real-time weather, environmental, and hydromet data to support safer, smarter, and more resilient communities.'
                    ],
                ]
            ],
            'weather-stations' => [
                'main_title' => 'Weather Stations & Sensors',
                'url' => '/platform',
                'sections' => [
                    [
                        'subtitle' => 'Advanced Data Collection',
                        'content' => 'Explore our advanced weather stations and sensors designed for accurate and real-time environmental data collection.'
                    ],
                    [
                        'subtitle' => 'Localized Climate Tracking',
                        'content' => 'Ideal for localized climate tracking and monitoring.'
                    ],
                ]
            ],
            'hydromet-platforms' => [
                'main_title' => 'Hydromet Platforms',
                'url' => '/platform',
                'sections' => [
                    [
                        'subtitle' => 'Comprehensive Hydrological Monitoring',
                        'content' => 'Discover our comprehensive hydromet platforms for monitoring water levels, rainfall, and other hydrological data.'
                    ],
                    [
                        'subtitle' => 'Flood Prediction & Water Management',
                        'content' => 'Crucial for flood prediction and water resource management.'
                    ],
                ]
            ],
            'environmental-monitoring' => [
                'main_title' => 'Environmental Monitoring Solutions',
                'url' => '/platform',
                'sections' => [
                    [
                        'subtitle' => 'Environmental Insights',
                        'content' => 'Our environmental monitoring solutions provide insights into air quality, temperature, and other environmental parameters.'
                    ],
                    [
                        'subtitle' => 'Community Health Focus',
                        'content' => 'To help communities maintain a healthy environment.'
                    ],
                ]
            ],
            'disaster-preparedness' => [
                'main_title' => 'Disaster Preparedness',
                'url' => '/platform',
                'sections' => [
                    [
                        'subtitle' => 'Enhanced Preparedness Tools',
                        'content' => 'Utilize our data and tools for enhanced disaster preparedness and response.'
                    ],
                    [
                        'subtitle' => 'Risk Mitigation',
                        'content' => 'Real-time alerts and predictive analytics help communities mitigate risks from natural calamities.'
                    ],
                ]
            ],
            'agriculture-support' => [
                'main_title' => 'Agriculture Support',
                'url' => '/platform',
                'sections' => [
                    [
                        'subtitle' => 'Optimizing Farm Practices',
                        'content' => 'Leverage climate and weather data to optimize agricultural practices.'
                    ],
                    [
                        'subtitle' => 'Sustainable Farming Benefits',
                        'content' => 'Improve crop yields, and manage resources efficiently for sustainable farming.'
                    ],
                ]
            ],
            'research-tool' => [
                'main_title' => 'Education & Research Tool',
                'url' => '/platform',
                'sections' => [
                    [
                        'subtitle' => 'Academic Resource',
                        'content' => 'Our platform serves as an invaluable tool for educational institutions and researchers.'
                    ],
                    [
                        'subtitle' => 'Data Access for Studies',
                        'content' => 'Providing access to vast datasets for climate studies and environmental research.'
                    ],
                ]
            ],
            // Add more pages and their sections here as needed
        ];

        $searchQuery = $request->input('query');
        $filteredResults = [];

        // If a search query is provided, filter the pages and their sections
        if ($searchQuery) {
            foreach ($allPages as $pageKey => $page) {
                foreach ($page['sections'] as $sectionIndex => $section) {
                    // Perform a case-insensitive search across page main_title, section subtitle, and section content
                    if (
                        Str::contains(Str::lower($page['main_title']), Str::lower($searchQuery)) ||
                        Str::contains(Str::lower($section['subtitle']), Str::lower($searchQuery)) ||
                        Str::contains(Str::lower($section['content']), Str::lower($searchQuery))
                    ) {

                        $filteredResults[] = [
                            'title' => $page['main_title'],
                            'subtitle' => $section['subtitle'],
                            'content' => $section['content'],
                            'link' => $page['url']
                        ];
                    }
                }
            }
        } else {
            //If no search query, return all sections from all pages
            // foreach ($allPages as $pageKey => $page) {
            //     foreach ($page['sections'] as $section) {
            //         $filteredResults[] = [
            //             'title' => $page['main_title'],
            //             'subtitle' => $section['subtitle'],
            //             'content' => $section['content'],
            //             'link' => $page['url']
            //         ];
            //     }
            // }
            $filteredResults = [];
        }

        // Return the data in the desired JSON format
        return response()->json([
            'pages' => $filteredResults
        ]);
    }
}
