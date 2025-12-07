export const formatDuration = (seconds: string | number): string => {
  const num = typeof seconds === "string" ? parseInt(seconds) : seconds;

  if (isNaN(num) || num === 0) return "N/A";

  const mins = Math.floor(num / 60);
  const secs = num % 60;

  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

export const formatNumber = (num: string | number): string => {
  const value = typeof num === "string" ? parseInt(num) : num;

  if (isNaN(value)) return "0";
  return value.toLocaleString();
};

export const getImageUrl = (
  images: Array<{ "#text": string; size: string }> | undefined,
  preferredSize: string = "extralarge"
): string => {
  if (!images || images.length === 0)
    return "https://placehold.co/600x400/000000/FFFFFF/png";

  const preferredImage = images.find((img) => img.size === preferredSize);
  if (preferredImage?.["#text"]) {
    return preferredImage["#text"];
  }

  const largeImage = images.find((img) => img.size === "large");
  if (largeImage?.["#text"]) {
    return largeImage["#text"];
  }
  return (
    images[0]?.["#text"] || "https://placehold.co/600x400/000000/FFFFFF/png"
  );
};
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
};

export const formatDate = (timestamp: number): string => {
  return new Date(timestamp).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};
