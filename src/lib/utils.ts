import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import {Artist, BasicNode, Genre, LastFMArtistJSON, LastFMSearchArtistData} from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

export const formatNumber = (value: number) =>
  new Intl.NumberFormat('en-US').format(value);

export const envBoolean = (value: string) => {
  return value && (value.toLowerCase() === 'true' || parseInt(value) === 1);
}

export const generateArtistLinks = (artist: Artist, similarCount: number) => {
  const links = [];
  for (let i = 0; i < similarCount; i++) {
    links.push({ source: artist.id, target: i.toString() });
  }
  return links;
}

export const isGenre = (item: BasicNode) => {
  return "artistCount" in item;
}