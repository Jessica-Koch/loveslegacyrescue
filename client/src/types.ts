export interface Dog {
  id: string;
  shelterluvId: string;
  name: string;
  breed: string | null;
  age: string | null;
  sex: string | null;
  color: string | null;
  description: string | null;
  photoUrls: string[];
  status: string | null;
  inFoster: boolean;
  featured: boolean;
  featuredAt: string | null;
  slackChannelId: string | null;
  internalNotes: string | null;
  createdAt: string;
  updatedAt: string;
}
