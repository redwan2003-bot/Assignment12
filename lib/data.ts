export interface Service {
    id: string;
    title: string;
    description: string;
    image: string;
    ratePerDay: number; // in BDT approx equivalent or USD
    features: string[];
    fullDescription: string;
}

export const SERVICES: Service[] = [
    {
        id: 'baby-care',
        title: 'Baby Sitting',
        description: 'Expert care for your little ones while you are away.',
        image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&q=80&w=800', // Valid unsplash ID
        ratePerDay: 1500,
        features: ['Certified Babysitters', 'Safe Environment', 'Educational Activities', 'Emergency Trained'],
        fullDescription: 'Our Baby Sitting service provides professional caretakers who ensure your child is safe, happy, and engaged. We offer flexible hours and reliable professionals.'
    },
    {
        id: 'elderly-care',
        title: 'Elderly Care',
        description: ' compassionate companionship and assistance for seniors.',
        image: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=800',
        ratePerDay: 2000,
        features: ['Medication Management', 'Mobility Assistance', 'Companionship', 'Health Monitoring'],
        fullDescription: 'Our Elderly Care service is designed to support seniors with daily activities, ensuring they maintain dignity and comfort in their own homes.'
    },
    {
        id: 'special-care',
        title: 'Special Care',
        description: 'Specialized support for family members with specific needs.',
        image: 'https://images.unsplash.com/photo-1584515933487-9dca71d2b1de?auto=format&fit=crop&q=80&w=800',
        ratePerDay: 2500,
        features: ['Specialized Training', '24/7 Support', 'Custom Care Plans', 'Medical Coordination'],
        fullDescription: 'For family members requiring special attention due to illness or disability, our Special Care service offers trained professionals to provide the best support possible.'
    }
];

export const TESTIMONIALS = [
    {
        id: 1,
        name: "Rahim Ahmed",
        role: "Parent",
        text: "Care.xyz has been a lifesaver for our family. The babysitter was professional and our kids loved her!",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
        id: 2,
        name: "Fatima Begum",
        role: "Daughter",
        text: "Finding reliable elderly care for my mother was difficult until I found this platform. Highly recommended.",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
        id: 3,
        name: "John Doe",
        role: "User",
        text: "Excellent service and seamless booking process. The caretaker was on time and very polite.",
        avatar: "https://randomuser.me/api/portraits/men/11.jpg"
    }
];
