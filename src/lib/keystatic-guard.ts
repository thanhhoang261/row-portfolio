// Local mode writes straight to disk with no login, so never expose it in production.
export const adminDisabled =
  process.env.NODE_ENV === "production" &&
  process.env.NEXT_PUBLIC_KEYSTATIC_STORAGE !== "github";
