"use server"
import { revalidatePath } from "next/cache";
import Product from "../models/product.model";
import { connectToDB } from "../mongoose";
import { scrapAmazonProduct } from "../scraper";
import { getAveragePrice, getHighestPrice, getLowestPrice } from "../utils";
import { User } from "@/types";
import { generateEmailBody, sendEmail } from "../nodemailer";

export async function scrapAndStoreProduct(productUrl: string){
    if(!productUrl) return;
    try {
        connectToDB();
        const scarpedProduct = await scrapAmazonProduct(productUrl);
        if(!scarpedProduct) return;
        let product = scarpedProduct;
        const existignProduct = await Product.findOne({url : scarpedProduct.url});
        if(existignProduct){
            const updatedPriceHistory:any = [
                ...existignProduct.priceHistory,
                {price : scarpedProduct.currentPrice}
            ]
            product = {
                ...scarpedProduct,
                priceHistory:updatedPriceHistory,
                lowestPrice:getLowestPrice(updatedPriceHistory),
                highestPrice:getHighestPrice(updatedPriceHistory),
                averagePrice:getAveragePrice(updatedPriceHistory)

            }
        }
        const newProduct = await Product.findOneAndUpdate({
            url:scarpedProduct.url},
            product,
            {upsert:true , new: true}
        )
        revalidatePath(`/products/${newProduct._id}`)
        
    } catch (error : any) {
        throw new Error(`Failed to Scrap the Product : ${error.message}`);
    }
}
export async function getProductById(productId : string){
    try {
        connectToDB();
        const product = await Product.findOne({_id:productId});
        if(!product) return null;
        return product; 
    } catch (error) {
        console.log(error)
    }
}
export async function getAllProduct(){
    try {
        connectToDB();
        const product = await Product.find();
        if(!product) return null;
        return product;
    } catch (error) {
        console.log(error)
    }
}
export async function getSimilarProduct(productId : string){
try {
    connectToDB();
    const currentProduct = await Product.findById(productId);
    if(!currentProduct) return null;
    const similarProducts = await Product.find({
        _id:{$ne : productId}
    }).limit(3);
    return similarProducts
} catch (error) {
    
}

}
export async function addUserEmailProduct(productId : string,  userEmail : string){
try {
    const product = await Product.findById(productId);
    if(!product) return;
    const userExists = product.users.some((user : User)=> user.email === userEmail);
    if(!userExists){
        product.users.push({email : userEmail});
        await product.save();
    const emailContent = await generateEmailBody(product , "WELCOME");

    await sendEmail(emailContent , [userEmail])
    }
} catch (error) {
    console.log(error)
}
}