export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function getApiBaseUrl() {
  return process.env.NEXT_PUBLIC_API_URL ?? "";
}

export function formatSyncTime(iso: string): string {
  return new Intl.DateTimeFormat("en-TZ", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(iso));
}
