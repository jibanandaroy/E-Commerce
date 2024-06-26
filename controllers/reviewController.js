const Review = require('../models/review')

const addReview = async (req, res) => {
    const { userId, productId, review } = req.body
    try{
        const obj = {
            userId,
            productId,
            review
        }
         await Review.create(obj)
        res.json({ success: true, message: "Review Submitted" })
    }catch(error)
    {
        console.log(error);
        res.json({
            success:false,
            message: "Review is not added"
       })
    }

}

const getReview = async (req, res) => {
    try {

        const reviews = await Review.find();
        const Data = [];
        reviews.map((data, ind) => {

            let obj = {
                userId: data.userId,
                productId: data.productId,
                review:data.review
            }
            Data.push(obj);

        })

        res.json({
            success:true,
            data:Data
        });

    } catch (error) {
        res.json({
            success:false,
            message: 'review not found'
        })
    }
}

module.exports = { addReview,getReview }