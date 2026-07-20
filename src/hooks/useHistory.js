import { useCallback, useEffect, useState } from "react";
import { deleteHistoryItem, getHistory } from "../lib/history";

export default function useHistory(userId) {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(Boolean(userId));
  const [error, setError] = useState(null);

  const refresh = useCallback(async () => {
    if (!userId) {
      setItems([]);
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      setItems(await getHistory(userId));
    } catch (requestError) {
      setError(requestError);
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  useEffect(() => { refresh(); }, [refresh]);

  const removeItem = async (item) => {
    const previousItems = items;
    setItems((currentItems) => currentItems.filter((currentItem) => currentItem.id !== item.id || currentItem.type !== item.type));
    try {
      await deleteHistoryItem(item.type, item.id);
    } catch (requestError) {
      setItems(previousItems);
      throw requestError;
    }
  };

  return { items, isLoading, error, refresh, removeItem };
}
