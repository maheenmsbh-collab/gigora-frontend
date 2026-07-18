// const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// export async function analyzeProfile({ profileUrl, skills, experience, platform }) {
//   // TODO: Replace this mock with a real request to /api/profile when backend integration is available.
//   await delay(2000);

//   return {
//     overallScore: 88,
//     completion: 92,
//     strengths: [
//       'Strong headline and service overview',
//       'Relevant skills are clearly stated',
//       'Excellent focus on client outcomes',
//     ],
//     weaknesses: [
//       'Add more measurable results to past work',
//       'Expand keyword coverage for your niche',
//       'Include testimonials or social proof',
//     ],
//     suggestions: [
//       'Use 3-4 targeted keywords in your gig title and summary.',
//       'Add one additional project example with metrics.',
//       'Highlight response time and delivery reliability.',
//     ],
//     profileUrl,
//     skills,
//     experience,
//     platform,
//   };
// }

// export async function generateProposal({ jobTitle, jobDescription, skills }) {
//   // TODO: Replace this mock with a real request to /api/proposal once the backend is ready.
//   await delay(2000);

//   return {
//     title: `Proposal for ${jobTitle}`,
//     proposal: `Hello,

// I reviewed your brief for ${jobTitle}. With experience in ${skills}, I can deliver a tailored solution that meets your goals and exceeds expectations.

// Your project summary:
// ${jobDescription}

// My approach includes a detailed review, prompt updates, and a polished final deliverable. I will keep communication clear and deliver on time.

// Let’s get started with a quick kickoff conversation so I can fully align with your priorities.

// Best regards,
// Maheen`,
//   };
// }

// export async function suggestGigSEO({ gigTitle, gigDescription, keywords }) {
//   // TODO: Replace this mock with a real request to /api/gig-seo when backend integration is available.
//   await delay(2000);

//   return {
//     headline: `Optimized Gig: ${gigTitle}`,
//     suggestions: [
//       `Add the keyword "${keywords.split(',')[0]?.trim() || 'freelance'}" to your gig title for better visibility.`,
//       'Clarify the main deliverable in the first sentence of the description.',
//       'Use bullet points to showcase the top 3 benefits of your service.',
//       'Include a short guarantee statement to improve buyer confidence.',
//     ],
//   };
// }
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function analyzeProfile({
  profileUrl,
  skills,
  experience,
  platform,
}) {
  await delay(2000);

  return {
    overallScore: 91,
    completion: 94,

    strengths: [
      "Strong professional headline",
      "Relevant skills listed",
      "Clear service description",
      "Profile looks trustworthy",
    ],

    weaknesses: [
      "Portfolio lacks measurable results",
      "Few keywords in overview",
      "No testimonials mentioned",
    ],

    suggestions: [
      "Include client success metrics.",
      "Add more niche-specific keywords.",
      "Showcase your best projects.",
      "Highlight fast response time.",
    ],

    profileUrl,
    skills,
    experience,
    platform,
  };
}

export async function generateProposal({
  jobTitle,
  jobDescription,
  skills,
}) {
  await delay(2000);

  return {
    title: `Proposal for ${jobTitle}`,

    proposal: `Hello,

I reviewed your project carefully and would love to help.

With experience in ${skills}, I can build exactly what you're looking for while maintaining high quality, clear communication, and timely delivery.

Project Understanding:
${jobDescription}

Why choose me?

• Clean and maintainable code
• Fast communication
• On-time delivery
• Client satisfaction first

Looking forward to working with you.

Best Regards,
Maheen`,
  };
}

export async function suggestGigSEO({
  gigTitle,
  gigDescription,
  keywords,
  category,
}) {
  await delay(2200);

  const keywordList = keywords
    .split(",")
    .map((k) => k.trim())
    .filter(Boolean);

  const score = Math.min(
    100,
    55 +
      Math.floor(gigTitle.length / 3) +
      Math.floor(gigDescription.length / 45) +
      keywordList.length * 4
  );

  return {
    seoScore: score,

    optimizedTitle:
      gigTitle ||
      "I Will Build a Professional Responsive Website",

    category,

    headline: `Optimized Gig: ${gigTitle}`,

    keywords: [
      ...keywordList,
      "SEO Optimized",
      "Professional",
      "High Quality",
      "Fast Delivery",
    ],

    suggestions: [
      "Use numbers in your title (e.g. Top Rated, 24 Hours).",
      "Mention delivery time in the first paragraph.",
      "Include your primary keyword naturally.",
      "Add bullet points for readability.",
      "Highlight your unique selling point.",
      "Use client-focused language.",
    ],

    strengths: [
      "Good keyword placement",
      "Strong service description",
      "Relevant niche targeting",
    ],

    weaknesses: [
      "Needs stronger call-to-action.",
      "Add more niche keywords.",
      "Use more measurable benefits.",
    ],
  };
}
