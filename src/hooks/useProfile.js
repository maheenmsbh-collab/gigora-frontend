import { useEffect, useState } from "react";
import { requestPasswordReset, updateProfileName } from "../lib/profile";

export default function useProfile(user) {
  const [fullName, setFullName] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setFullName(user?.user_metadata?.full_name || "");
  }, [user]);

  const saveName = async () => {
    setIsSaving(true);
    try {
      return await updateProfileName(fullName);
    } finally {
      setIsSaving(false);
    }
  };

  const sendPasswordReset = () => requestPasswordReset(user.email);

  return { fullName, setFullName, isSaving, saveName, sendPasswordReset };
}
