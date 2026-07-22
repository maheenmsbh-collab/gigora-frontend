import { getCurrentUser } from "./getCurrentUser";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const getCurrentUserName = getCurrentUser;

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
  tone,
  skillCategory,
  platform,
}) {
  await delay(2000);
  const userName = await getCurrentUserName();

  return {
    title: `Proposal for ${jobTitle}`,

    keyPoints: [tone, skillCategory, platform, ...skills.split(",").map((skill) => skill.trim()).filter(Boolean).slice(0, 3)],

    proposal: `Hello,

I reviewed your project carefully and would love to help.

With experience in ${skills}, I can build exactly what you're looking for while maintaining high quality, clear communication, and timely delivery. My approach will be ${tone.toLowerCase()} and tailored for ${platform}.

Project Understanding:
${jobDescription}

Why choose me?

• Clean and maintainable code
• Fast communication
• On-time delivery
• Client satisfaction first

Looking forward to working with you.

Best Regards,
${userName}`,
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
    .map((keyword) => keyword.trim())
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
      gigTitle || "I Will Build a Professional Responsive Website",
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
