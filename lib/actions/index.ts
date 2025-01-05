"use server"

import { scrapAmazonProduct } from "../scraper";

export async function scrapAndStoreProduct(productUrl: string){
    if(!productUrl) return;
    try {
        const scarpedProduct = await scrapAmazonProduct(productUrl);
    } catch (error : any) {
        throw new Error(`Failed to Scrap the Product : ${error.message}`);
    }
}