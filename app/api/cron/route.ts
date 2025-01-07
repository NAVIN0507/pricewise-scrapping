import Product from "@/lib/models/product.model";
import { connectToDB } from "@/lib/mongoose"
import { generateEmailBody, sendEmail } from "@/lib/nodemailer";
import { scrapAmazonProduct } from "@/lib/scraper";
import { getAveragePrice, getEmailNotifType, getHighestPrice, getLowestPrice } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function GET(){
    try {
        connectToDB();
        const products = await Product.find({

        })
        if(!products) throw new Error(`No products found`);
         // scrap 
         const updatedProduct = await Promise.all(
            products.map(async(currentProduct)=>{
                const scrapProduct = await scrapAmazonProduct(currentProduct.url);
                if(!scrapProduct) throw new Error("No product found");
                        const updatedPriceHistory  = [
                ...currentProduct.priceHistory,
                {price : scrapProduct.currentPrice}
            ]
          const  product = {
                ...scrapProduct,
                priceHistory:updatedPriceHistory,
                lowestPrice:getLowestPrice(updatedPriceHistory),
                highestPrice:getHighestPrice(updatedPriceHistory),
                averagePrice:getAveragePrice(updatedPriceHistory)

            }
        
        const upatedProduct = await Product.findOneAndUpdate({
            url:scrapProduct.url},
            product,
            {upsert:true , new: true}
        ) 

        const emailNotifType = getEmailNotifType(scrapProduct , currentProduct );
        if(emailNotifType && upatedProduct.users.length > 0){
            const productInfo = {
                title:upatedProduct.title,
                url:upatedProduct.url
            }
            const emailContent = await generateEmailBody(productInfo , emailNotifType);
            const userEmails = upatedProduct.users.map((user:any)=> user.email);
            await sendEmail(emailContent , userEmails)
        }
        return upatedProduct;
            })
         )
         return NextResponse.json({
            message:'ok' , data:updatedProduct
         })
    } catch (error) {
        throw new Error(`Product not found`)
    }
}