import { Suspense } from 'react';
import Link from 'next/link';
import classes from './page.module.css';
import MealsGrid from '../../components/meals/meals-grid';
import { getMeals } from '../../lib/meals';
import { metadata } from './../layout';

export const metadata = {
  title: 'All Meals',
  description: 'Browse the delicious food recipes',
};

async function Meals(){ //component to fetch a data from server
  const meals = await getMeals();
  return <MealsGrid meals={meals}/>
}

export default async function MealsPage() {
  return (
    <>
      <header className={classes.header}>
        <h1>
            Delicious meals, created{' '}
            <span className={classes.highlight}>by you</span>
        </h1>
        <p>
            Discover and share your favorite recipes with the world.
        </p>
        <p className={classes.cta}>
            <Link href="/meals/share">Share your recipe</Link>
        </p>
      </header>
      <main className={classes.main}>
        <Suspense fallback={<p className={classes.loading}>Loading...</p>}>
          <Meals/>
        </Suspense>
      </main>
    </>
  );
}