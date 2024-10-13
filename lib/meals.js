import fs from 'node:fs'

import sql from 'better-sqlite3';
import slugify from 'slugify';
import xss from 'xss';

const db = sql('meals.db');

export async function getMeals() {
    await new Promise((resolve) => setTimeout(resolve, 4000));
    return db.prepare('SELECT * FROM meals').all();
}

export  function getMeal(slug){
    // await new Promise((resolve) => setTimeout(resolve, 4000));
    return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug);
}

export async function saveMeal(meal){
    meal.slug = slugify(meal.title, {lower: true, strict: true});
    meal.instructions =  xss(meal.instructions);

    const extention = meal.image.name.split('.').pop();
    const fileName = `${meal.slug}.${extention}`;

    const stream = fs.createWriteStream(`public/images/${fileName}`);
    const bufferImage = await meal.image.arrayBuffer();

    stream.write(Buffer.from(bufferImage), (error) => {
        if(error) throw new Error('Saving Image failed!');
    });

    meal.image = `/images/${fileName}`;

    db.prepare(`
        INSERT INTO meals 
            ( title, summary, instructions, creator, creator_email , image,  slug) 
        VALUES (
            @title, 
            @summary, 
            @instructions, 
            @creator, 
            @creator_email , 
            @image,  
            @slug
        )`
    ).run(meal);
}