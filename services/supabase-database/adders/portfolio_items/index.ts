import { supabaseClient } from "@/services/supabase";
import Bugsnag from "@bugsnag/js";

/**
 * Updates the total likes of a portfolio item depending on the action.
 */
export async function updatePortfolioItemTotalLikes(
  action: "increment" | "decrement",
  id: number,
) {
  if (action === "decrement") {
    const { error } = await supabaseClient
      // @ts-expect-error `rpc` type is not correctly inferred
      .rpc("decrement_portfolio_item_likes", {
        id_of_portfolio_item: id,
      });

    // If there was an error
    if (error) {
      Bugsnag.notify(
        `updatePortfolioItemTotalLikes() error 1: ${JSON.stringify(error)}`,
      );
      return false;
    }

    return true;
  }

  const { error } = await supabaseClient
    // @ts-expect-error `rpc` type is not correctly inferred
    .rpc("increment_portfolio_item_likes", {
      id_of_portfolio_item: id,
    });

  // If there was an error
  if (error) {
    Bugsnag.notify(
      `updatePortfolioItemTotalLikes() error 2: ${JSON.stringify(error)}`,
    );
    return false;
  }

  return true;
}
