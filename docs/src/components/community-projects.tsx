import Link from '@docusaurus/Link';
import React from 'react';

interface CommunityProjectProps {
  title: string;
  description: string;
  url: string;
}

const projects: CommunityProjectProps[] = [
  {
    title: 'ram-go',
    description: `An alternative to the ram-CLI command that doesn't depend on nodejs installation. It tries its best for importing google photos takeout archives.`,
    url: 'https://github.com/simulot/ram-go',
  },
  {
    title: 'ramFrame',
    description: 'Run an ram slideshow in a photo frame.',
    url: 'https://github.com/3rob3/ramFrame',
  },
  {
    title: 'API Album Sync',
    description: 'A Python script to sync folders as albums.',
    url: 'https://git.orenit.solutions/open/ramalbumpull',
  },
  {
    title: 'Remove offline files',
    description: 'A simple way to remove orphaned offline assets from the ram database',
    url: 'https://github.com/Thoroslives/ram_remove_offline_files',
  },
  {
    title: 'Create albums from folders',
    description: 'A Python script to create albums based on the folder structure of an external library.',
    url: 'https://github.com/Salvoxia/ram-folder-album-creator',
  },
  {
    title: 'ram-Tools',
    description: 'Provides scripts for handling problems on the repair page.',
    url: 'https://github.com/clumsyCoder00/ram-Tools',
  },
  {
    title: 'Lightroom Publisher: mi.ram.Publisher',
    description: 'Lightroom plugin to publish photos from Lightroom collections to ram albums.',
    url: 'https://github.com/midzelis/mi.ram.Publisher',
  },
  {
    title: 'ram Duplicate Finder',
    description: 'Webapp that uses machine learning to identify near-duplicate images.',
    url: 'https://github.com/vale46n1/ram_duplicate_finder',
  },
  {
    title: 'ram-Tiktok-Remover',
    description: 'Script to search for and remove TikTok videos from your ram library.',
    url: 'https://github.com/mxc2/ram-tiktok-remover',
  },
  {
    title: 'ram Android TV',
    description: 'Unofficial ram Android TV app.',
    url: 'https://github.com/giejay/ram-Android-TV',
  },
  {
    title: 'Powershell Module PSram',
    description: 'Powershell Module for the ram API',
    url: 'https://github.com/hanpq/PSram',
  },
];

function CommunityProject({ title, description, url }: CommunityProjectProps): JSX.Element {
  return (
    <section className="flex flex-col gap-4 justify-between dark:bg-ram-dark-gray bg-ram-gray dark:border-0 border-gray-200 border border-solid rounded-2xl p-4">
      <div className="flex flex-col gap-2">
        <p className="m-0 items-start flex gap-2">
          <span>{title}</span>
        </p>

        <p className="m-0 text-sm text-gray-600 dark:text-gray-300">{description}</p>
        <p className="m-0 text-sm text-gray-600 dark:text-gray-300">
          <a href={url}>{url}</a>
        </p>
      </div>
      <div className="flex">
        <Link
          className="px-4 py-2 bg-ram-primary/10 dark:bg-gray-300  rounded-full hover:no-underline text-ram-primary dark:text-ram-dark-bg font-bold uppercase"
          to={url}
        >
          View Project
        </Link>
      </div>
    </section>
  );
}

export default function CommunityProjects(): JSX.Element {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
      {projects.map((project) => (
        <CommunityProject {...project} />
      ))}
    </div>
  );
}
