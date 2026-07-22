import { supabase } from "./supabaseClient";

export async function saveProposal(userId, { jobTitle, proposal }) {
  const { error } = await supabase.from("saved_proposals").insert({
    user_id: userId,
    job_title: jobTitle,
    proposal,
  });
  if (error) throw error;
}
export async function saveGigSEO(
  userId,
  { gigTitle, seoScore, optimizedTitle, keywords, suggestions }
) {
  const { error } = await supabase.from("gig_seo_history").insert({
    user_id: userId,
    gig_title: gigTitle,
    seo_score: seoScore,
    optimized_title: optimizedTitle,
    keywords,
    suggestions,
  });

  if (error) throw error;
}

export async function saveProfileAnalysis(userId, { profileUrl, overallScore, analysis }) {
  const { error } = await supabase.from("profile_analyses").insert({
    user_id: userId,
    profile_url: profileUrl,
    overall_score: overallScore,
    analysis,
  });
  if (error) throw error;
}

export async function saveChatHistory(userId, { prompt, response }) {
  const { error } = await supabase.from("chat_history").insert({
    user_id: userId,
    prompt,
    response,
  });
  if (error) throw error;
}

const normalizeProposal = (item) => ({
  ...item,
  type: "proposal",
  title: item.job_title,
  preview: item.proposal,
});
const normalizeGigSEO = (item) => ({
  ...item,
  type: "gigseo",
  title: item.gig_title,
  preview: `SEO Score: ${item.seo_score}%`,
});
const normalizeAnalysis = (item) => ({
  ...item,
  type: "analysis",
  title: "Profile Analysis",
  preview: item.profile_url,
});

const normalizeChat = (item) => ({
  ...item,
  type: "chat",
  title: "AI Chat",
  preview: item.prompt,
});

export async function getHistory(userId) {
const [proposals, analyses, chats, gigSeo] = await Promise.all([
  supabase.from("saved_proposals").select("*").eq("user_id", userId),
  supabase.from("profile_analyses").select("*").eq("user_id", userId),
  supabase.from("chat_history").select("*").eq("user_id", userId),
  supabase.from("gig_seo_history").select("*").eq("user_id", userId),
]);

 const error =
  proposals.error ||
  analyses.error ||
  chats.error ||
  gigSeo.error;
  if (error) throw error;

  return [
  ...proposals.data.map(normalizeProposal),
  ...analyses.data.map(normalizeAnalysis),
  ...chats.data.map(normalizeChat),
  ...gigSeo.data.map(normalizeGigSEO),
];
}

export async function deleteHistoryItem(type, id) {
  const tableByType = {
  proposal: "saved_proposals",
  analysis: "profile_analyses",
  chat: "chat_history",
  gigseo: "gig_seo_history",
};
  const { error } = await supabase.from(tableByType[type]).delete().eq("id", id);
  if (error) throw error;
}
