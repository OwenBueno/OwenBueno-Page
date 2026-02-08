import React from 'react';
import { getSortedPostsData } from '@/lib/posts';
import { getAllProjects } from '@/lib/projects';
import HomePageClient from './HomePageClient';

export default function HomePage() {
  const allPosts = getSortedPostsData().slice(0, 2);
  const latestProjects = getAllProjects().slice(0, 3);

  return (
    <HomePageClient 
      allPosts={allPosts} 
      featuredProjects={latestProjects} 
    />
  );
}
