import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import { useColorMode } from '@docusaurus/theme-common';
function HomepageHeader() {
  const { isDarkTheme } = useColorMode();

  return (
    <header>
      <section className="text-center m-6 p-12 border border-red-400 rounded-[50px] bg-slate-200 dark:bg-ram-dark-gray">
        <img
          src={isDarkTheme ? 'img/ram-logo-stacked-dark.svg' : 'img/ram-logo-stacked-light.svg'}
          className="md:h-60 h-44 mb-2 antialiased"
          alt="ram logo"
        />
        <div className="sm:text-2xl text-lg md:text-4xl mb-12 sm:leading-tight">
          <p className="mb-1 font-medium text-ram-primary dark:text-ram-dark-primary">
            Self-hosted photo and <span className="block"></span>
            video management solution<span className="block"></span>
          </p>
        </div>
        <div className="flex flex-col sm:flex-row place-items-center place-content-center mt-9 mb-16 gap-4 ">
          <Link
            className="flex place-items-center place-content-center py-3 px-8 border bg-ram-primary dark:bg-ram-dark-primary rounded-full no-underline hover:no-underline text-white hover:text-gray-50 dark:text-ram-dark-bg font-bold uppercase"
            to="docs/overview/introduction"
          >
            Get started
          </Link>

          <Link
            className="flex place-items-center place-content-center py-3 px-8 border bg-ram-primary/10 dark:bg-gray-300  rounded-full hover:no-underline text-ram-primary dark:text-ram-dark-bg font-bold uppercase"
            to="https://demo.ram.app/"
          >
            Demo portal
          </Link>

          <Link
            className="flex place-items-center place-content-center py-3 px-8 border bg-ram-dark-primary dark:bg-ram-primary  rounded-full hover:no-underline text-ram-primary dark:text-ram-dark-bg font-bold uppercase"
            to="https://discord.gg/D8JsnBEuKb"
          >
            Discord
          </Link>
        </div>
        <img src="/img/ram-screenshots.png" alt="screenshots" width={'70%'} />
        <div className="flex flex-col sm:flex-row place-items-center place-content-center mt-4 gap-1">
          <div className="h-24">
            <a href="https://play.google.com/store/apps/details?id=app.alextran.ram">
              <img className="h-24" alt="Get it on Google Play" src="/img/google-play-badge.png" />
            </a>
          </div>
          <div className="h-24">
            <a href="https://apps.apple.com/sg/app/ram/id1613945652">
              <img className="h-24 sm:p-3.5 p-3" alt="Download on the App Store" src="/img/ios-app-store-badge.svg" />
            </a>
          </div>
        </div>
      </section>
    </header>
  );
}

export default function Home(): JSX.Element {
  return (
    <Layout
      title="Home"
      description="ram Self-hosted photo and video backup solution directly from your mobile phone "
      noFooter={true}
    >
      <HomepageHeader />
      <div className="flex flex-col place-items-center place-content-center">
        <p>This project is available under GNU AGPL v3 license.</p>
        <p className="text-xs">Privacy should not be a luxury</p>
      </div>
    </Layout>
  );
}
